# One-button deploy — cPanel Git (WebHostingHub)

**Account:** `woodso9`  
**Live site:** `/home/woodso9/public_html/`  
**Source in this repo:** `site/` folder  

After setup, you never drag individual HTML files again. You click **Deploy** and the whole `site` folder copies to the website correctly — homepage stays homepage, calculator stays in `calculator/`.

---

## What you need once

- cPanel login (WebHostingHub)
- A **GitHub** account (free) — [github.com](https://github.com)
- **Git for Windows** on your PC — [git-scm.com/download/win](https://git-scm.com/download/win)  
  (or use GitHub Desktop if you prefer buttons)

---

## Step 1 — Put this repo on GitHub (one time)

On your PC, in PowerShell:

```powershell
cd C:\Users\bgola\source\repos\WoodSolutions-Website

git add .
git commit -m "Initial Wood Solutions website"

git branch -M main
```

Create an empty repo on GitHub named `WoodSolutions-Website` (no README — empty).

Then (replace `YOUR_GITHUB_USER`):

```powershell
git remote add origin https://github.com/YOUR_GITHUB_USER/WoodSolutions-Website.git
git push -u origin main
```

GitHub will ask you to sign in.

---

## Step 2 — Clone into cPanel (one time)

1. Log into **WebHostingHub** → **cPanel**.
2. Open **Files** → **Git Version Control**.
3. Click **Create**.
4. Fill in:
   - **Clone URL:** your GitHub repo  
     `https://github.com/YOUR_GITHUB_USER/WoodSolutions-Website.git`
   - **Repository Path:**  
     `/home/woodso9/repositories/WoodSolutions-Website`  
     (must **not** be inside `public_html`)
   - **Repository Name:** `WoodSolutions-Website`
5. Click **Create**.

cPanel clones the repo. The file `.cpanel.yml` in the repo tells cPanel how to deploy.

---

## Step 3 — First deploy (one time)

1. Still in **Git Version Control** → click **Manage** on `WoodSolutions-Website`.
2. Open the **Pull or Deploy** tab.
3. Click **Deploy HEAD Commit**.
4. Wait for green success in the log.

Check https://www.woodsolutions.com/ — should be the **Wood Solutions homepage** (not the calculator page).

---

## Step 4 — Your normal workflow (every update)

### On your PC (after Cursor or you edit files)

```powershell
cd C:\Users\bgola\source\repos\WoodSolutions-Website

git add .
git commit -m "Describe what you changed"
git push
```

### In cPanel

1. **Git Version Control** → **Manage** → **Pull or Deploy**
2. Click **Update from Remote** (pulls from GitHub)
3. Click **Deploy HEAD Commit** (copies `site/` → `public_html`)

Done. **Ctrl+F5** on the site to refresh.

---

## Step 5 — Fix the homepage now (if calculator still shows at `/`)

If you uploaded the wrong `index.html` before Git was set up:

1. Make sure your PC has the correct files in `site\` (homepage = `site\index.html`).
2. Commit and push (Step 4 commands).
3. **Update from Remote** → **Deploy HEAD Commit** in cPanel.

That overwrites `public_html\index.html` with the real homepage.

---

## What deploy copies / skips

| Copied to `public_html` | Notes |
|-------------------------|--------|
| All of `site/` | HTML, css, images, projects, calculator, doorcut, api, `.htaccess` |
| Skipped | `_legacy-scrape`, `_tmp_*` |

| **Not** in git (stays only on server) | Why |
|---------------------------------------|-----|
| `site/api/license/config.php` | Creem API key — create once on server manually |
| `site/downloads/*.exe` | Upload installers separately when ready |

Deploy **does not delete** extra files on the server — it overwrites matching paths only. Your `config.php` on the server is safe.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| **Deploy** button missing | Repo needs `.cpanel.yml` at the top level — commit and push this repo |
| Homepage still wrong | Confirm `site/index.html` title is “Wood Solutions — Software for Cabinetmakers”, then push + deploy |
| Permission errors in deploy log | WebHostingHub support — mention Git deploy to `public_html` |
| Don’t want GitHub | cPanel can **Create** a empty repo and you push to it — ask if you want those steps |

---

## Still stuck? Manual fallback

See **`UPLOAD-THIS.txt`** in the repo root — zip upload or File Manager.

---

## Quick reference

```
PC:     edit site\  →  git commit  →  git push
cPanel: Update from Remote  →  Deploy HEAD Commit
Check:  https://www.woodsolutions.com/
```
