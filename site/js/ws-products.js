/**
 * Wood Solutions — product catalog (single place to change prices & Creem checkout URLs).
 * Loaded before ws-pricing.js on pages that show purchase pricing.
 */
(function (global) {
  'use strict';

  /** @type {Record<string, {
   *   name: string,
   *   priceUsd: number,
   *   compareAtUsd?: number,
   *   creemUrl?: string,
   *   metaDescription?: string,
   *   documentTitle?: string
   * }>} */
  var products = {
    'doorcut-pro': {
      name: 'DoorCut 3.0 Pro',
      priceUsd: 249,
      compareAtUsd: 299,
      creemUrl: 'https://www.creem.io/payment/prod_4SJtaXxRA8KdBO8bY94mNb',
      metaDescription:
        'DoorCut 3.0 Pro — cabinet door layout, joinery, cut lists, and shop production for Windows. {price} one-time license (reduced from {compareAt}), 14-day trial. Checkout through Creem.io.',
      documentTitle: 'DoorCut 3.0 Pro — cabinet door cut lists | Wood Solutions',
    },
    'doorcut-lite': {
      name: 'DoorCut Lite',
      priceUsd: 65,
      creemUrl: 'https://www.creem.io/payment/prod_2gqTOm8EqFUkYJiwF157O3',
      metaDescription:
        'DoorCut Lite — {price} one-time license for five-piece cope-and-stick cabinet doors only. Same DoorCut 3.0 installer. 14-day trial.',
      documentTitle: 'DoorCut Lite — {price} cabinet door cut lists | Wood Solutions',
    },
    'sheet-logic': {
      name: 'Sheet Logic',
      priceUsd: 99,
      creemUrl: 'https://www.creem.io/payment/prod_4S0IkIfPSXkTFjqG9l3J0B',
      metaDescription:
        'Sheet Logic — sheet-goods and solid-wood optimization for cabinet shops. {price} one-time license. Unlimited parts. 14-day trial. Windows.',
      documentTitle: 'Sheet Logic — Wood Solutions',
    },
    'sheet-logic-builder': {
      name: 'Sheet Logic Builder',
      priceUsd: 55,
      creemUrl: 'https://www.creem.io/payment/prod_1BFjkKin1Y448JKULrRPSp',
      metaDescription:
        'Sheet Logic Builder — sheathing sheet counts from wall and plan dimensions. One-page print/PDF per tab. One-time license. 14-day trial.',
      documentTitle: 'Sheet Logic Builder — Wood Solutions',
    },
    'offcut-logic': {
      name: 'Offcut Logic',
      priceUsd: 35,
      creemUrl: 'https://www.creem.io/payment/prod_1nYOP2ANSxqE1UuPIgITPC',
      metaDescription:
        'Offcut Logic — track sheet and solid offcuts on your rack, list job parts, import from Sheet Logic Builder. {price} one-time license. 14-day trial.',
      documentTitle: 'Offcut Logic — Wood Solutions',
    },
    'fraction-calc': {
      name: 'Quick Fraction Calculator',
      priceUsd: 20,
      creemUrl: 'https://www.creem.io/payment/prod_6e5iY9nAgnzNlLlLa0gXYn',
      metaDescription:
        'Quick Fraction Calculator — fractions on the shop floor. Windows and Android. {price} one-time license, 14-day trial.',
      documentTitle: 'Quick Fraction Calculator | Wood Solutions',
    },
    'timber-tally': {
      name: 'TimberTally',
      priceUsd: 10,
      // Paste Creem Share URL after product is created (see BARRY-CREEM-CHEATSHEET.txt)
      creemUrl: '',
      metaDescription:
        'TimberTally — board-foot calculator and lumber costing for Windows. {price} one-time license. Calculates board feet for solid lumber.',
      documentTitle: 'TimberTally — {price} board-foot calculator | Wood Solutions',
    },
  };

  global.WS_PRODUCTS = products;
})(typeof window !== 'undefined' ? window : globalThis);
