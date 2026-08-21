<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

license_require_post();
$config = license_load_config();
license_rate_limit($config);

$body = license_read_json_body();
$key = license_sanitize_key((string)($body['key'] ?? ''));
$instanceId = license_sanitize_instance_id((string)($body['instance_id'] ?? ''));

$result = license_forward_to_creem($config, 'licenses/validate', [
    'key' => $key,
    'instance_id' => $instanceId,
]);

license_map_creem_result($result, '', false);
