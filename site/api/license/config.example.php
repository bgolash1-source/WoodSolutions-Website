<?php
declare(strict_types=1);

/**
 * Copy this file to config.php and paste your Creem API key.
 * config.php is gitignored — upload it separately to public_html/api/license/
 */
return [
    // Creem → Developers → API keys (use creem_test_… while in test mode).
    'creem_api_key' => 'creem_test_REPLACE_ME',

    // Test: https://test-api.creem.io/v1  |  Live: https://api.creem.io/v1
    'creem_api_base' => 'https://test-api.creem.io/v1',

    // Soft rate limit per visitor IP (activate + validate combined).
    'max_requests_per_hour' => 60,
];
