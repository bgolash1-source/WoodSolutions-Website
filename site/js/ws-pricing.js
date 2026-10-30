/**
 * Binds [data-ws-product] / [data-ws-template] from ws-products.js into the page.
 */
(function () {
  'use strict';

  var catalog = window.WS_PRODUCTS;
  if (!catalog) return;

  function fmt(usd) {
    return '$' + usd;
  }

  function product(id) {
    return catalog[id] || null;
  }

  function fillPart(el, id, part) {
    var p = product(id);
    if (!p) return;

    if (part === 'creemHref' && p.creemUrl && el.tagName === 'A') {
      el.setAttribute('href', p.creemUrl);
      return;
    }

    var text = '';
    switch (part) {
      case 'price':
        text = fmt(p.priceUsd);
        break;
      case 'compareAt':
        text = p.compareAtUsd != null ? fmt(p.compareAtUsd) : '';
        break;
      case 'buyLabel':
        text = 'Buy license — ' + fmt(p.priceUsd);
        if (el.tagName === 'A' && p.creemUrl) el.setAttribute('href', p.creemUrl);
        break;
      case 'buyLabelLite':
        text = 'Buy Lite license — ' + fmt(p.priceUsd);
        if (el.tagName === 'A' && p.creemUrl) el.setAttribute('href', p.creemUrl);
        break;
      case 'ctaNamePrice':
        text = p.name + ' — ' + fmt(p.priceUsd);
        break;
      case 'ctaLite':
        text = 'DoorCut Lite — ' + fmt(p.priceUsd);
        break;
      case 'statusAvailable':
        text = 'Available — ' + fmt(p.priceUsd);
        break;
      case 'statusAvailableNow':
        text = 'Available now — ' + fmt(p.priceUsd);
        break;
      case 'statusOnetime':
        text = fmt(p.priceUsd) + ' — one-time';
        break;
      case 'statusPrice':
        text = fmt(p.priceUsd);
        break;
      case 'statusWas':
        text =
          p.compareAtUsd != null
            ? fmt(p.priceUsd) + ' — was ' + fmt(p.compareAtUsd)
            : fmt(p.priceUsd);
        break;
      case 'heroNowReduced':
        text =
          p.compareAtUsd != null
            ? 'Now ' + fmt(p.priceUsd) + ' — reduced from ' + fmt(p.compareAtUsd)
            : fmt(p.priceUsd);
        break;
      case 'releaseBannerPro':
        text =
          p.compareAtUsd != null
            ? p.name + ' — now ' + fmt(p.priceUsd) + ' (reduced from ' + fmt(p.compareAtUsd) + '), one-time.'
            : p.name + ' — ' + fmt(p.priceUsd) + ', one-time.';
        break;
      case 'priceNoteReduced':
        text =
          p.compareAtUsd != null
            ? 'Price reduced from ' + fmt(p.compareAtUsd) + ' — no subscription, no recurring fees.'
            : 'One-time license (USD) — no subscription.';
        break;
      case 'checkoutBlurbPro':
        text =
          p.compareAtUsd != null
            ? 'One-time purchase at ' + fmt(p.priceUsd) + ' (reduced from ' + fmt(p.compareAtUsd) + ').'
            : 'One-time purchase at ' + fmt(p.priceUsd) + '.';
        break;
      default:
        return;
    }

    if (part === 'compareAt' && !text) {
      el.style.display = 'none';
      return;
    }

    el.textContent = text;
  }

  function applyTemplates() {
    var pro = product('doorcut-pro');
    var lite = product('doorcut-lite');
    var sl = product('sheet-logic');

    document.querySelectorAll('[data-ws-template]').forEach(function (el) {
      var key = el.getAttribute('data-ws-template');
      var html = '';

      switch (key) {
        case 'index-hero-note-doorcut':
          if (!pro || !lite) return;
          html =
            'DoorCut Pro is <strong>' +
            fmt(pro.priceUsd) +
            '</strong> — we lowered the price from <strong>' +
            fmt(pro.compareAtUsd) +
            '</strong> so more shops can buy after the trial. 14-day free trial — full features, no credit card for the trial. New to doors? <a href="doorcut-lite.html">DoorCut Lite</a> — <strong>' +
            fmt(lite.priceUsd) +
            '</strong> one-time, same installer.';
          break;
        case 'index-hero-builder-note':
          var b = product('sheet-logic-builder');
          if (!b) return;
          html =
            '<strong>New — <a href="sheet-logic-builder.html">Sheet Logic Builder</a>:</strong> sheathing sheet counts from your dimensions (garage gable, walls, floor, roof, deck, shed). One-page print/PDF per tab. <strong>' +
            fmt(b.priceUsd) +
            '</strong> one-time · 14-day trial. Licensing questions? <a href="mailto:sales@woodsolutions.com">sales@woodsolutions.com</a>';
          break;
        case 'doorcut-pricing-para':
          if (!pro) return;
          html =
            'DoorCut Pro is <strong>' +
            fmt(pro.priceUsd) +
            '</strong> — we lowered the price from <strong>' +
            fmt(pro.compareAtUsd) +
            '</strong> after launch so more cabinet shops can buy once they’ve finished the trial. Same full Pro license; no subscription.';
          break;
        case 'doorcut-howto-buy':
          if (!pro || !lite) return;
          html =
            '<strong>Buy</strong> on Creem.io when you are satisfied — <strong>' +
            fmt(pro.priceUsd) +
            '</strong> (reduced from ' +
            fmt(pro.compareAtUsd) +
            ') (<a href="' +
            pro.creemUrl +
            '">Pro checkout</a>). New to doors? <a href="doorcut-lite.html">DoorCut Lite</a> is <strong>' +
            fmt(lite.priceUsd) +
            '</strong> — same installer, streamlined edition.';
          break;
        case 'sheet-logic-page-lead':
          if (!sl) return;
          html =
            'Download the free 14-day trial below, then buy a one-time license for <strong>' +
            fmt(sl.priceUsd) +
            '</strong>.';
          break;
        case 'sheet-logic-howto-step3':
          if (!sl) return;
          html =
            '<strong>3.</strong> Buy for <strong>' +
            fmt(sl.priceUsd) +
            '</strong> through Creem — one-time license, unlimited parts.';
          break;
        case 'products-sheet-logic-blurb':
          if (!sl) return;
          html =
            'Sheet-goods and solid-wood optimization for Windows. Unlimited parts. <strong>' +
            fmt(sl.priceUsd) +
            '</strong> one-time. 14-day trial — download and buy now.';
          break;
        case 'index-sheet-logic-blurb':
          if (!sl) return;
          html =
            'Sheet-goods and solid-wood optimization for Windows. Unlimited parts. <strong>' +
            fmt(sl.priceUsd) +
            '</strong> one-time license. 14-day free trial — download and buy now.';
          break;
        case 'products-doorcut-lite-blurb':
          if (!lite) return;
          html =
            'Five-piece cope-and-stick doors only — wood &amp; sheet opt included. Same installer, Lite license. <strong>' +
            fmt(lite.priceUsd) +
            '</strong> · 14-day trial.';
          break;
        case 'products-builder-blurb':
          var builder = product('sheet-logic-builder');
          if (!builder) return;
          html =
            '4×8 sheathing sheet counts from dimensions (plus deck decking). One-page print/PDF per view. <strong>' +
            fmt(builder.priceUsd) +
            '</strong> one-time. 14-day trial. Not a cut-list optimizer.';
          break;
        case 'index-builder-blurb':
          builder = product('sheet-logic-builder');
          if (!builder) return;
          html =
            'Sheathing sheet counts from wall and plan dimensions — garage gable, walls, floor, roof, deck, and shed. One-page print/PDF per tab. <strong>' +
            fmt(builder.priceUsd) +
            '</strong>. 14-day trial. Separate from Sheet Logic optimizer.';
          break;
        case 'products-offcut-blurb':
          var off = product('offcut-logic');
          if (!off) return;
          html =
            'Offcut rack and new job parts for sheet and solid stock. Import from Sheet Logic Builder. <strong>' +
            fmt(off.priceUsd) +
            '</strong> one-time. 14-day trial.';
          break;
        case 'index-offcut-blurb':
          off = product('offcut-logic');
          if (!off) return;
          html =
            'Track sheet and solid offcuts on the rack, job parts, and import from Sheet Logic Builder. <strong>' +
            fmt(off.priceUsd) +
            '</strong>. 14-day trial.';
          break;
        case 'products-fraction-blurb':
          var frac = product('fraction-calc');
          if (!frac) return;
          html =
            'Fractions on the shop floor — Windows and Android downloads live. <strong>' +
            fmt(frac.priceUsd) +
            '</strong> one-time, 14-day trial.';
          break;
        case 'index-fraction-blurb':
          frac = product('fraction-calc');
          if (!frac) return;
          html =
            'Fractions for the shop floor — Windows and Android downloads live. <strong>' +
            fmt(frac.priceUsd) +
            '</strong> one-time, 14-day trial.';
          break;
        default:
          return;
      }

      el.innerHTML = html;
    });
  }

  function applyProductFields() {
    document.querySelectorAll('[data-ws-product]').forEach(function (el) {
      var id = el.getAttribute('data-ws-product');
      var part = el.getAttribute('data-ws-part') || 'price';
      fillPart(el, id, part);
    });
  }

  function applyPageMeta() {
    var pageProduct = document.body && document.body.getAttribute('data-ws-page-product');
    if (!pageProduct) return;
    var p = product(pageProduct);
    if (!p) return;

    if (p.metaDescription) {
      var meta = document.querySelector('meta[name="description"]');
      if (meta) {
        var desc = p.metaDescription.replace(/\{price\}/g, fmt(p.priceUsd));
        if (p.compareAtUsd != null) {
          desc = desc.replace(/\{compareAt\}/g, fmt(p.compareAtUsd));
        }
        meta.setAttribute('content', desc);
      }
    }
    if (p.documentTitle) {
      document.title = p.documentTitle.replace(/\{price\}/g, fmt(p.priceUsd));
    }
  }

  function run() {
    applyProductFields();
    applyTemplates();
    applyPageMeta();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
