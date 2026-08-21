<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

license_require_post();
$config = license_load_config();
license_rate_limit($config);

$body = license_read_json_body();
$key = license_sanitize_key((string)($body['key'] ?? ''));
$instanceName = license_sanitize_instance_name((string)($body['instance_name'] ?? ''));

$result = license_forward_to_creem($config, 'licenses/activate', [
    'key' => $key,
    'instance_name' => $instanceName,
]);

license_map_creem_result($result, $instanceName, true);
