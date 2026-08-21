# DoorCut license proxy (Creem.io)

Desktop apps call these endpoints instead of Creem directly so your **Creem API key stays on the server**.

## Setup (once per server)

1. Copy `config.example.php` → `config.php` on the server (same folder).
2. Paste your Creem API key from **Creem → Developers**.
3. While Creem onboarding is in test mode, keep:
   - `creem_api_base` = `https://test-api.creem.io/v1`
   - a `creem_test_…` API key
4. When live, switch to:
   - `creem_api_base` = `https://api.creem.io/v1`
   - a live `creem_…` API key

**Never commit `config.php`.** Upload it via FTP/cPanel separately.

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
