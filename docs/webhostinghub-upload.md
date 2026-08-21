# WebHostingHub — upload checklist for www.woodsolutions.com

Use this when publishing the new site from:

`C:\Users\bgola\source\repos\WoodSolutions-Website\site\`

WebHostingHub hosts on **cPanel**. Your live website files belong in **`public_html`** (document root for `woodsolutions.com` / `www.woodsolutions.com`).

**From Xara “Publish to the Web” (woodsolutions.com):**

| Setting | Value |
|---------|--------|
| FTP server | **`ehub68.webhostinghub.com`** |
| Remote folder | **`public_html`** |
| Live site | https://www.woodsolutions.com/ |

Username and password are in Xara → **Change FTP settings…** (same as cPanel / FTP login). Use those in WinSCP.

## 1. Log in

1. Sign in at [WebHostingHub](https://www.webhostinghub.com/) → **My Account** / customer portal.
2. Open **cPanel** for the hosting account that serves **woodsolutions.com**.
3. Use the same credentials for **File Manager** or **FTP**.

**FTP (optional, better for folders):**

| Setting | Value |
|---------|--------|
| Host | **`ehub68.webhostinghub.com`** (from Xara; also try `ftp.woodsolutions.com`) |
| Port | **21** (FTP) or **22** (SFTP if enabled) |
| Username | From Xara → **Change FTP settings…** or cPanel |
| Password | Same as cPanel / Xara FTP password |
| Remote folder | **`public_html`** |

Create extra FTP accounts under cPanel → **FTP Accounts** if you want access limited to `public_html` only.

---

## 2. Back up what is live now

Before overwriting anything:

1. cPanel → **File Manager** → open **`public_html`**.
2. Select all → **Compress** → download `public_html-backup-YYYY-MM-DD.zip`.
3. Or download at least **`index.html`**, **`contact.html`**, and any page you are replacing.

Keep existing **Xara project pages** on the server unless you intentionally retire them. The new homepage links to:

- `diy cnc router.html`
- `diy sander planer.html`
- `violin project.html`
- `gallery.html`
- `sheet logic.html` (legacy)
- `fractional calculator.html` (legacy Xara; new HTML version is `calculator/index.html`)

---

## 3. What to upload (new site tree)

Upload **contents** of the local `site\` folder into **`public_html`** — not the `site` folder itself.

```
public_html/
  .htaccess                    ← Apache default page + hide directory listings
  web.config                   ← harmless on Apache; keep for portability
  index.html                   ← NEW homepage
  contact.html                 ← NEW contact (map + sales@woodsolutions.com)
  doorcut.html                 ← NEW DoorCut product page
  products.html
  sheet-logic.html
  drawer-cut.html
  cabinet-logic.html
  projects.html
  timbertally.html
  privacy.html
  terms.html
  api/
    license/
      activate.php
      validate.php
      bootstrap.php
      config.php               ← create on server from config.example.php (not in git)
  css/
    site.css
  doorcut/
    help/
      index.html               ← Help topic index
      *.html                   ← All help topics
      help.css
      web-help.css
      images/                  ← Help screenshots (if any)
  images/
    wood-solutions-logo.png
    doorcut-screenshot.webp
    (other logo variants)
  downloads/
    DoorCut-Setup.exe          ← build locally; upload separately (large)
  calculator/
    index.html
    downloads/                 ← QFC .exe / .apk when ready
    images/
```

**Optional:** skip `README.txt` files.

---

## 4. Upload methods

### A. cPanel File Manager (good for a few files)

1. cPanel → **File Manager** → **`public_html`**.
2. **Settings** (top right) → enable **Show Hidden Files** (so `.htaccess` is visible).
3. **Upload** individual files, or **Upload** a `.zip` then **Extract** in place.
4. File Manager does **not** upload whole folder trees easily — use FTP for `doorcut/help/`.

### B. FileZilla / other FTP client

1. Connect to **`public_html`** on the server.
2. Drag from local `WoodSolutions-Website\site\` into remote `public_html\`.
3. When prompted to overwrite, choose **Overwrite** for HTML/CSS you intend to replace.
4. For **`.exe` installers**, use **binary** transfer mode (FileZilla default).

### C. WinSCP (what you have — good choice)

[WinSCP](https://winscp.net/) is well suited to uploading the whole `site\` tree including `doorcut\help\`.

**First-time session**

1. **Session** → **New Session** (or Ctrl+N).
2. **File protocol:** try **FTP** first (port **21**). If WebHostingHub gave you SFTP/SSH access, use **SFTP** (port **22**) instead.
3. **Host name:** **`ehub68.webhostinghub.com`** (matches Xara publish settings).
4. **User name / Password:** from Xara → **Change FTP settings…** (same as cPanel).
5. Click **Save** — name the session `WoodSolutions` so you can reopen it.
6. **Login**. If asked about server fingerprint or passive FTP, accept / use **Passive** (typical for shared hosting).

**Set folders before you upload**

| Pane | Path |
|------|------|
| **Local (left)** | `C:\Users\bgola\source\repos\WoodSolutions-Website\site` |
| **Remote (right)** | `/public_html` (double-click into it after login) |

Tip: **Commands** → **Open Directory / Bookmark** to save both paths.

**Upload the new site**

1. On the **right**, confirm you are inside **`public_html`** (path bar shows `/public_html`).
2. On the **left**, open the **`site`** folder — you should see `index.html`, `doorcut.html`, `images`, etc.
3. Select **all** files and folders on the left **except** do not upload a nested folder named `site` — you upload *contents*.
4. Drag selection to the right, or **F5** (Upload).
5. When WinSCP asks **Overwrite?** → **Yes** or **Yes to all** for files you are replacing; **No** for legacy Xara pages you are keeping unchanged.
6. Upload **`.htaccess`** — if you do not see it locally: **Options** → **Preferences** → **Panels** → enable **Show hidden files**.
7. Large **DoorCut-Setup.exe** — upload last; wait for the queue to finish (bottom panel).

**WinSCP habits worth learning**

| Action | How |
|--------|-----|
| Refresh remote listing | Ctrl+R |
| Compare local vs remote | **Commands** → **Synchronize** (advanced; backup first) |
| Download backup from server | Select files on right → drag to left (or F5 download) |
| Queue / failed transfers | **Queue** button on toolbar |
| Edit a file on server | Right-click → **Edit** (WinSCP uploads on save — fine for small fixes; prefer editing locally in repo) |

**Do not** use WinSCP to edit live HTML as your main workflow — edit in `WoodSolutions-Website\site\`, then upload changed files so git/local copy stays the source of truth.

---

## 5. Prepare on your PC before upload

| Item | Local path | Notes |
|------|------------|--------|
| DoorCut installer | `site\downloads\DoorCut-Setup.exe` | Build in DoorCut repo; not in git |
| Logo + screenshot | `site\images\` | `doorcut-logo.png`, `sheet-logic-logo.png`, etc. |
| Creem license proxy | `site\api\license\` + `config.php` on server | Copy from `config.example.php`; paste API key |
| Creem.io checkout URLs | edit `site\doorcut.html`, `site\calculator\index.html` | Replace placeholder checkout links before go-live |
| Extreme Tracking | already in HTML | `eX-barrygol-2` snippet on every page |

---

## 6. After upload — smoke test

Open in a **private/incognito** window:

| URL | Expect |
|-----|--------|
| https://www.woodsolutions.com/ | New homepage, logo, DoorCut hero |
| https://www.woodsolutions.com/doorcut.html | Product page, $299, trial note |
| https://www.woodsolutions.com/products.html | Product line |
| https://www.woodsolutions.com/projects.html | Projects hub |
| https://www.woodsolutions.com/timbertally.html | TimberTally freeware + download |
| https://www.woodsolutions.com/privacy.html | Privacy policy |
| https://www.woodsolutions.com/terms.html | Terms of service (Creem.io MoR) |
| https://www.woodsolutions.com/downloads/TimberTallySetup-1.0.0.zip | TimberTally installer (keep existing on server) |
| https://www.woodsolutions.com/doorcut/help/index.html | Help topic index (not a file listing) |
| https://www.woodsolutions.com/contact.html | Map, support email, Privacy/Terms links, Creem MoR footer |
| https://www.woodsolutions.com/calculator/ | Fraction calculator page |
| https://www.woodsolutions.com/downloads/DoorCut-Setup.exe | Installer downloads (after you upload .exe) |
| https://www.woodsolutions.com/diy%20cnc%20router.html | Legacy project page still works |

**Nav:** DoorCut → submenu **Help** → help index.

**Analytics:** [extremetracking.com](https://extremetracking.com/?home) — confirm a visit registers after loading the homepage.

---

## 7. Common WebHostingHub / cPanel issues

| Problem | Fix |
|---------|-----|
| `/doorcut/help/` shows a file list | Upload `.htaccess`; use `doorcut/help/index.html` (nav already does) |
| Old homepage still appears | Hard refresh (Ctrl+F5); confirm `public_html/index.html` date |
| Images broken | Confirm `public_html/images/` contains `.png` / `.webp` files |
| `.htaccess` missing | Enable “Show Hidden Files” in File Manager; re-upload `.htaccess` |
| Download of `.exe` fails | Upload binary; check file size in File Manager |
| `www` vs non-`www` | cPanel → **Domains** / **Redirects** — pick one canonical host |

---

## 8. Incremental updates later

| Change | Upload only |
|--------|-------------|
| Homepage copy | `index.html` |
| DoorCut pricing | `doorcut.html` |
| Help topic edit | `doorcut/help/ThatTopic.html` |
| New installer | `downloads/DoorCut-Setup.exe` |
| Logo change | `images/wood-solutions-logo.png` |

---

## 9. Quick reference

| | |
|--|--|
| **Local source** | `C:\Users\bgola\source\repos\WoodSolutions-Website\site\` |
| **Remote root** | `public_html` on **`ehub68.webhostinghub.com`** |
| **Domain** | www.woodsolutions.com |
| **Sales email** | sales@woodsolutions.com |
| **General deploy notes** | `docs/deploy.md` |
