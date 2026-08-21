<?php
declare(strict_types=1);

const LICENSE_PROXY_VERSION = '1.0';

function license_load_config(): array
{
    $path = __DIR__ . '/config.php';
    if (!is_file($path)) {
        license_json_response(503, [
            'ok' => false,
            'message' => 'License service is not configured on the server yet.',
        ]);
    }

    /** @var array<string, mixed> $config */
    $config = require $path;

    $apiKey = trim((string)($config['creem_api_key'] ?? ''));
    if ($apiKey === '' || str_contains($apiKey, 'REPLACE_ME')) {
        license_json_response(503, [
            'ok' => false,
            'message' => 'License service is not configured on the server yet.',
        ]);
    }

    $base = rtrim(trim((string)($config['creem_api_base'] ?? 'https://api.creem.io/v1')), '/');
    if ($base === '') {
        $base = 'https://api.creem.io/v1';
    }

    $config['creem_api_key'] = $apiKey;
    $config['creem_api_base'] = $base;
    $config['max_requests_per_hour'] = max(10, (int)($config['max_requests_per_hour'] ?? 60));

    return $config;
}

function license_require_post(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        license_json_response(405, [
            'ok' => false,
            'message' => 'Use POST with a JSON body.',
        ]);
    }
}

function license_read_json_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        license_json_response(400, [
            'ok' => false,
            'message' => 'Missing JSON body.',
        ]);
    }

    /** @var mixed $decoded */
    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        license_json_response(400, [
            'ok' => false,
            'message' => 'Invalid JSON body.',
        ]);
    }

    return $decoded;
}

function license_rate_limit(array $config): void
{
    $ip = license_client_ip();
    $bucket = (int)(time() / 3600);
    $dir = __DIR__ . '/data';
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }

    $file = $dir . '/rate_' . hash('sha256', $ip) . '.txt';
    $count = 0;
    if (is_file($file)) {
        $parts = explode('|', (string)file_get_contents($file), 2);
        if (count($parts) === 2 && (int)$parts[0] === $bucket) {
            $count = (int)$parts[1];
        }
    }

    if ($count >= (int)$config['max_requests_per_hour']) {
        license_json_response(429, [
            'ok' => false,
            'message' => 'Too many license requests. Wait a while and try again.',
        ]);
    }

    file_put_contents($file, $bucket . '|' . ($count + 1), LOCK_EX);
}

function license_client_ip(): string
{
    $forwarded = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';
    if (is_string($forwarded) && $forwarded !== '') {
        $first = trim(explode(',', $forwarded)[0]);
        if ($first !== '') {
            return $first;
        }
    }

    return (string)($_SERVER['REMOTE_ADDR'] ?? 'unknown');
}

function license_forward_to_creem(array $config, string $endpoint, array $payload): array
{
    $url = $config['creem_api_base'] . '/' . ltrim($endpoint, '/');
    $json = json_encode($payload, JSON_UNESCAPED_SLASHES);
    if ($json === false) {
        return [
            'http_code' => 500,
            'body' => null,
            'curl_error' => 'Could not encode request.',
        ];
    }

    $ch = curl_init($url);
    if ($ch === false) {
        return [
            'http_code' => 502,
            'body' => null,
            'curl_error' => 'Could not start request.',
        ];
    }

    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $json,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 12,
        CURLOPT_TIMEOUT => 25,
        CURLOPT_HTTPHEADER => [
            'Accept: application/json',
            'Content-Type: application/json',
            'x-api-key: ' . $config['creem_api_key'],
            'User-Agent: WoodSolutions-LicenseProxy/' . LICENSE_PROXY_VERSION,
        ],
    ]);

    $body = curl_exec($ch);
    $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    $decoded = null;
    if (is_string($body) && $body !== '') {
        /** @var mixed $parsed */
        $parsed = json_decode($body, true);
        if (is_array($parsed)) {
            $decoded = $parsed;
        }
    }

    return [
        'http_code' => $httpCode,
        'body' => $decoded,
        'raw_body' => is_string($body) ? $body : '',
        'curl_error' => $curlError,
    ];
}

function license_is_list(array $arr): bool
{
    if ($arr === []) {
        return true;
    }

    return array_keys($arr) === range(0, count($arr) - 1);
}

function license_extract_instance_id(?array $creemBody, string $instanceName): ?string
{
    if ($creemBody === null) {
        return null;
    }

    $instance = $creemBody['instance'] ?? null;
    if (is_array($instance)) {
        if (license_is_list($instance)) {
            for ($i = count($instance) - 1; $i >= 0; $i--) {
                $item = $instance[$i];
                if (!is_array($item)) {
                    continue;
                }
                $id = trim((string)($item['id'] ?? ''));
                if ($id !== '') {
                    return $id;
                }
            }
        } else {
            $id = trim((string)($instance['id'] ?? ''));
            if ($id !== '') {
                return $id;
            }
        }
    }

    $name = strtolower(trim($instanceName));
    $candidates = $creemBody['instances'] ?? null;
    if (is_array($candidates) && license_is_list($candidates)) {
        foreach ($candidates as $item) {
            if (!is_array($item)) {
                continue;
            }
            $itemName = strtolower(trim((string)($item['name'] ?? '')));
            $id = trim((string)($item['id'] ?? ''));
            if ($id !== '' && ($name === '' || $itemName === $name)) {
                return $id;
            }
        }
    }

    return null;
}

function license_map_creem_result(array $result, string $instanceName, bool $isActivate): void
{
    if ($result['curl_error'] !== '') {
        license_json_response(502, [
            'ok' => false,
            'message' => 'Could not reach the license server. Check your internet connection and try again.',
        ]);
    }

    $httpCode = (int)$result['http_code'];
    /** @var ?array<string, mixed> $body */
    $body = $result['body'];

    if ($httpCode === 403) {
        license_json_response(200, [
            'ok' => false,
            'activation_limit_reached' => true,
            'message' => 'Activation limit reached for this license key. Deactivate an old device in your Creem customer portal, or contact sales@woodsolutions.com.',
        ]);
    }

    if ($httpCode === 404) {
        license_json_response(200, [
            'ok' => false,
            'message' => 'License key not found. Check for typos or use the key from your purchase email.',
        ]);
    }

    if ($httpCode === 410) {
        license_json_response(200, [
            'ok' => false,
            'message' => 'This license has expired or been revoked.',
        ]);
    }

    if ($httpCode < 200 || $httpCode >= 300 || !is_array($body)) {
        license_json_response(502, [
            'ok' => false,
            'message' => 'License server returned an unexpected response. Try again in a few minutes or contact sales@woodsolutions.com.',
        ]);
    }

    $status = strtolower(trim((string)($body['status'] ?? '')));
    if ($status !== '' && $status !== 'active') {
        license_json_response(200, [
            'ok' => false,
            'message' => 'This license is not active (' . $status . ').',
        ]);
    }

    if ($isActivate) {
        $instanceId = license_extract_instance_id($body, $instanceName);
        if ($instanceId === null || $instanceId === '') {
            license_json_response(502, [
                'ok' => false,
                'message' => 'Activation succeeded but no instance id was returned. Contact sales@woodsolutions.com.',
            ]);
        }

        license_json_response(200, [
            'ok' => true,
            'instance_id' => $instanceId,
            'status' => $status !== '' ? $status : 'active',
        ]);
    }

    license_json_response(200, [
        'ok' => true,
        'status' => $status !== '' ? $status : 'active',
    ]);
}

function license_json_response(int $statusCode, array $payload): never
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function license_sanitize_key(string $key): string
{
    $key = trim($key);
    if ($key === '' || strlen($key) > 128) {
        license_json_response(400, [
            'ok' => false,
            'message' => 'Paste the license key from your purchase email.',
        ]);
    }

    return $key;
}

function license_sanitize_instance_name(string $name): string
{
    $name = trim($name);
    if ($name === '') {
        $name = 'DoorCut-PC';
    }

    if (strlen($name) > 64) {
        $name = substr($name, 0, 64);
    }

    return $name;
}

function license_sanitize_instance_id(string $instanceId): string
{
    $instanceId = trim($instanceId);
    if ($instanceId === '' || strlen($instanceId) > 128) {
        license_json_response(400, [
            'ok' => false,
            'message' => 'Missing instance id.',
        ]);
    }

    return $instanceId;
}
