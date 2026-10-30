# Site JavaScript

## Product pricing (`ws-products.js` + `ws-pricing.js`)

**Change a price once** in `ws-products.js` (`priceUsd`, optional `compareAtUsd`, `creemUrl`).

Any page that includes both scripts and uses `data-ws-product` / `data-ws-template` updates automatically.

**Deploy:** upload this folder to `public_html/js/` on the host. `index.html` and `sheet-logic.html` also ship static price fallbacks inside each placeholder so prices still show if the scripts are missing; after load, JS replaces them from this catalog.

### Markup

```html
<span data-ws-product="sheet-logic" data-ws-part="price"></span>
<a data-ws-product="sheet-logic" data-ws-part="buyLabel" data-ws-part="creemHref" …>
```

Use **`data-ws-part`** values defined in `ws-pricing.js` (`price`, `buyLabel`, `statusAvailable`, `statusWas`, …).

Multi-sentence copy shared across pages:

```html
<p data-ws-template="products-sheet-logic-blurb"></p>
```

Product detail pages can set **`data-ws-page-product="sheet-logic"`** on `<body>` to refresh `meta[name=description]` and `document.title` from the catalog.

### Pages wired today

`index.html`, `products.html`, `doorcut.html`, `doorcut-lite.html`, `sheet-logic.html`, `sheet-logic-builder.html`, `offcut-logic.html`

After editing `ws-products.js`, deploy `site/js/` with the rest of `site/`.
