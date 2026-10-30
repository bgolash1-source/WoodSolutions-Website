<?php
declare(strict_types=1);

/**
 * Copy this file to config.php on the server and paste your Creem API key.
 * config.php is gitignored — upload it separately to public_html/api/license/
 *
 * You are LIVE — use the settings below (not test-api / creem_test_).
 */
return [
    // Creem → Developers → API keys (Test mode OFF). Key starts with creem_ (not creem_test_).
    'creem_api_key' => 'creem_REPLACE_ME',

    // Live store:
    'creem_api_base' => 'https://api.creem.io/v1',

    // Soft rate limit per visitor IP (activate + validate combined).
    'max_requests_per_hour' => 60,

    // Creem product ids (DoorCut Pro vs Lite) — used to set edition in activate/validate JSON.
    'creem_product_id_pro' => 'prod_4SJtaXxRA8KdBO8bY94mNb',
    'creem_product_id_lite' => 'prod_2gqTOm8EqFUkYJiwF157O3',
];
