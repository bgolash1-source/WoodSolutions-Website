# DoorCut license proxy (Creem.io)

Desktop apps call these endpoints instead of Creem directly so your **Creem API key stays on the server**.

## Setup (once per server)

1. Copy `config.example.php` → `config.php` on the server (same folder).
2. Paste your **live** Creem API key from **Creem → Developers** (Test mode OFF).
   Key starts with `creem_` — not `creem_test_`.
3. Keep:
   - `creem_api_base` = `https://api.creem.io/v1`

**Never commit `config.php`.** Upload it via FTP/cPanel separately.

Sandbox only (rare): Test mode ON in Creem, Buy URL contains `/test/`, key `creem_test_…`, base `https://test-api.creem.io/v1`. See `BARRY-CREEM-CHEATSHEET.txt`.


## Endpoints

| URL | Body |
|-----|------|
| `POST /api/license/activate.php` | `{ "key": "…", "instance_name": "SHOP-PC" }` |
| `POST /api/license/validate.php` | `{ "key": "…", "instance_id": "…" }` |

Success (activate):

```json
{ "ok": true, "instance_id": "inst_…", "status": "active" }
```

Failure:

```json
{ "ok": false, "message": "…", "activation_limit_reached": false }
```

## Smoke test (PowerShell)

```powershell
$body = @{ key = "YOUR_TEST_KEY"; instance_name = "Test-PC" } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri "https://www.woodsolutions.com/api/license/activate.php" -Body $body -ContentType "application/json"
```

## Files

- `bootstrap.php` — shared logic (do not expose secrets)
- `data/` — rate-limit counters (not web-accessible)
- `.htaccess` — blocks `config.php` from direct download
