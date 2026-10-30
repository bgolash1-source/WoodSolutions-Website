---
name: creem-api
description: >-
  Use Creem.io as Merchant of Record for WoodSolutions products, checkouts,
  licenses, and store inspection. Apply when creating products, checkout links,
  license keys, subscriptions, discounts, or debugging Creem payments.
---

# Creem for WoodSolutions

Creem is the payment provider for this site (Merchant of Record). The Cursor MCP server named **Creem** calls the live Creem API. Official reference is in `official-SKILL.md` in this folder.

## Environment

- `.cursor/mcp.json` uses a **test** key (`creem_test_…`) and `--server test`. Sandbox only — not live charges.
- Do not switch to the live key unless the user explicitly asks.
- MCP config lives in `.cursor/mcp.json` (gitignored). Copy from `.cursor/mcp.json.example`.
- The public site must never embed the API key. Desktop apps use `site/api/license/` as a proxy.

## What this repo already does

- Checkout links are hardcoded in product pages (search `creem.io/checkout`).
- License activate/validate: `site/api/license/` with `config.php` on the server only.

## Desktop apps still on Lemon Squeezy

**Sheet Logic** activation still refers to Lemon Squeezy (confirmed in the installed app, 2026-09-02). That copy is in the desktop product, not this website. DoorCut / calculator are the Creem path. Do not tell customers to buy Sheet Logic on Creem until the app is switched over. When that work happens, change the in-app activation text and any store links together.

## MCP usage

Prefer Creem MCP tools over guessing REST URLs.

Safe first call: `products-search`.

Do **not** call refund, cancel, archive, delete, debit, pause, or license activate/deactivate unless the user explicitly asks. Those tools are not mounted in the default project config.

Prices in the API are in **cents** (1000 = $10.00).

## After creating a product

1. Copy the Creem checkout URL into the matching HTML (`doorcut.html`, calculator buy buttons, etc.).
2. Confirm `docs/deploy.md` product-ID notes if they exist.
3. Keep test and live checkout URLs distinct.

## If MCP is missing or returns 401

1. Node.js v22+ must be on PATH (`npx.cmd`).
2. Test keys require `--server test`.
3. Ask the user for a test API key from Creem → Developers. Never commit it.
