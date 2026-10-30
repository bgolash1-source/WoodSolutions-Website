# WoodSolutions-Website

Your website files for [www.woodsolutions.com](https://www.woodsolutions.com).

---

## Best way to publish (after one-time setup)

**cPanel Git deploy** — edit locally, push, click **Deploy** in cPanel. No more mixing up `index.html` files.

→ **`docs/cpanel-git-deploy.md`** — 5-step setup for account `woodso9`

---

## Manual upload (fallback)

| On your computer | On the server |
|------------------|---------------|
| `WoodSolutions-Website\site\` | `public_html\` |

→ **`UPLOAD-THIS.txt`** — zip or File Manager steps

---

## After deploy, check

- https://www.woodsolutions.com/ — homepage (not calculator)
- https://www.woodsolutions.com/projects.html
- https://www.woodsolutions.com/sheet-logic.html
- https://www.woodsolutions.com/calculator/index.html

---

## What's in `site/`

| Item | What it is |
|------|------------|
| `index.html` | Homepage |
| `doorcut.html` | DoorCut product page |
| `sheet-logic.html` | **Sheet Logic** product page (pricing from `js/ws-products.js`) |
| `js/ws-products.js` | **Single catalog** for USD prices & Creem checkout URLs |
| `js/ws-pricing.js` | Fills `data-ws-product` / `data-ws-template` on wired pages |
| `projects.html` + `projects/` | CNC, sander/planer, violin, gallery |
| `calculator/` | Quick Fraction Calculator |
| `images/projects/` | Project photos |
| `api/license/` | Creem license proxy (config.php on server only) |

**Contact on site:** sales@woodsolutions.com

**Change a product price:** edit `site/js/ws-products.js` only (then deploy). See `site/js/README.md`. Creem dashboard price must match.

---

## More detail

- `docs/cpanel-git-deploy.md` — **one-button deploy**
- `docs/webhostinghub-upload.md` — manual hosting notes
- `site/api/license/README.md` — Creem setup (when live)

---

## App source code (separate repos)

DoorCut, TimberTally, CabinetLogic, etc. live in other folders on your PC — not in this website repo.
