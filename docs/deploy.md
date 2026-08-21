# Deploying to www.woodsolutions.com

**WebHostingHub (cPanel):** see **[docs/webhostinghub-upload.md](webhostinghub-upload.md)** for login, `public_html`, FTP, backup, and smoke-test checklist.

Upload the **`site/`** folder contents to your web host document root.

**Default pages:** Upload `web.config` (IIS / Windows hosting) and/or `.htaccess` (Apache) so folders like `doorcut/help/` serve `index.html` instead of a file listing. Nav links also use explicit `doorcut/help/index.html` for local `file://` browsing.

## Target layout on the server

```
www.woodsolutions.com/
  index.html
  contact.html
  doorcut.html
  products.html               ← product line overview
  sheet-logic.html
  drawer-cut.html
  cabinet-logic.html
  projects.html               ← workshop projects hub
  privacy.html
  terms.html                  ← terms of service (Creem.io MoR)
  api/
    license/
      activate.php            ← DoorCut license proxy (requires config.php)
      validate.php
      config.example.php
  css/site.css                ← shared styles (new pages)
  doorcut/
    help/                       ← DoorCut user guide (sync from DoorCut/Help)
      index.html
      *.html                    ← topic pages + help.css
  downloads/
    DoorCut-Setup.exe              (your actual installer name)
  images/
  calculator/
    index.html
    downloads/
      QuickFractionCalculator-Setup-1.0.exe
      QuickFractionCalculator-Android-1.0.apk
    images/
      new-release-android-banner.png
      android-calculator-screenshot.png
```

## Legacy Xara pages (keep on server)

When you upload the new `index.html` and `contact.html`, **leave your existing Xara pages** in place.
The new homepage links to them:

| Link from homepage | Existing file on server |
|--------------------|-------------------------|
| DIY CNC router | `diy cnc router.html` |
| DIY sander / planer | `diy sander planer.html` |
| Violin build | `violin project.html` |
| Gallery | `gallery.html` |
| DoorCut product page | `doorcut.html` |
| Products overview | `products.html` |
| Sheet Logic (new) | `sheet-logic.html` (legacy: `sheet logic.html`) |

Software product order on the new homepage: **DoorCut → Sheet Logic → DrawerCut → CabinetLogic**.

## Xara vs raw HTML

- **Homepage (`index.html`)** — new design; upload as site root or rebuild sections in Xara using the same copy/colors.
- **Fraction calculator** — existing Xara page can stay; see `xara-fraction-calculator-update.txt` for copy updates. The HTML version in `site/calculator/` is an alternative if you move off Xara for that page.

## Creem.io checkout

Paid software goes through **Creem.io** (Merchant of Record — payment, tax, license email). Before publish:

1. In [Creem.io](https://www.creem.io) → **Products** → your product → **Share**, copy the checkout URL.
2. Replace placeholders:
   - **DoorCut** — `site/doorcut.html` (search for `creem.io/checkout`) — **Buy now** button and **How to buy** step.
   - **Quick Fraction Calculator** — `site/calculator/index.html` — **Buy license** button.
3. Confirm footer MoR line and legal pages match: `privacy.html`, `terms.html`.

Multi-seat / invoice sales stay on **sales@woodsolutions.com**.

## License proxy (DoorCut / desktop apps)

DoorCut activates Creem keys through **`api/license/`** on your site — the Creem API key stays server-side.

1. Upload `site/api/license/` to `public_html/api/license/`.
2. Copy `config.example.php` → `config.php` on the server (do **not** commit `config.php`).
3. Paste Creem API key from **Developers**; use `test-api.creem.io` until live.
4. Smoke-test: `POST https://www.woodsolutions.com/api/license/activate.php` with a test key.

See `site/api/license/README.md`.

## Analytics

Every page includes Extreme Tracking:

```html
<script src="https://eprocode.com/js.js" id="eX-barrygol-2" async defer></script>
```

Dashboard: [extremetracking.com](https://extremetracking.com/?home)

When syncing DoorCut help topics from `DoorCut/Help/`, re-run the tracking snippet insert or copy from any page that already has `eX-barrygol-2`.

## Before each release

1. Build installer in the app repo (DoorCut, MauiApp2, etc.).
2. Copy `.exe` / `.apk` into the matching `site/**/downloads/` folder.
3. Upload changed files only (FTP/SFTP or host file manager).
4. Smoke-test download links in a private/incognito window.

## Contact on all pages

Use **sales@woodsolutions.com** for sales and product questions unless a page needs a separate support address later.
