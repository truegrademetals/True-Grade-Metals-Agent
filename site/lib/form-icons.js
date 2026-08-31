/* Product form drawings.
   Line only, no fill, currentColor so the page controls the ink. Same hairline
   grammar as the tables they sit beside — drawn objects, not photographs, so
   nothing here implies a facility True Grade Metals does not own. */

'use strict';

const VB = 'viewBox="0 0 80 60" fill="none" stroke="currentColor" stroke-width="1.4"';

const SHAPES = {
  /* Seamless pipe: hollow cylinder, bore visible at the near face. */
  pipe: `
    <ellipse cx="20" cy="30" rx="8" ry="14"/>
    <ellipse cx="20" cy="30" rx="4.4" ry="7.7"/>
    <path d="M20 16H64M20 44H64"/>
    <path d="M64 16a8 14 0 0 1 0 28"/>`,

  /* 90 degree elbow, the form fittings are read by. */
  fittings: `
    <path d="M16 48a32 32 0 0 1 32-32"/>
    <path d="M16 34a18 18 0 0 1 18-18"/>
    <ellipse cx="16" cy="41" rx="3.4" ry="7"/>
    <ellipse cx="41" cy="16" rx="7" ry="3.4"/>`,

  /* Solid bar or rod. */
  bar: `
    <ellipse cx="20" cy="30" rx="7" ry="14"/>
    <path d="M20 16H62M20 44H62"/>
    <path d="M62 16a7 14 0 0 1 0 28"/>`,

  /* Plate or sheet: a slab with visible thickness. */
  plate: `
    <path d="M12 26 48 13l20 7-36 13z"/>
    <path d="M12 26v8l20 7v-8"/>
    <path d="M32 33v8l36-13v-8"/>`,

  /* Coil: wound strip, layers showing at the near face. */
  coil: `
    <ellipse cx="22" cy="30" rx="9" ry="16"/>
    <ellipse cx="22" cy="30" rx="7" ry="12.5"/>
    <ellipse cx="22" cy="30" rx="5" ry="9"/>
    <ellipse cx="22" cy="30" rx="3" ry="5.4"/>
    <path d="M22 14H56M22 46H56"/>
    <path d="M56 14a9 16 0 0 1 0 32"/>`,

  /* Wire: a drawn coil, loops running off to the side. */
  wire: `
    <ellipse cx="24" cy="30" rx="6" ry="15"/>
    <path d="M24 15H52M24 45H52"/>
    <path d="M52 15a6 15 0 0 1 0 30"/>
    <path d="M36 15a6 15 0 0 0 0 30M44 15a6 15 0 0 0 0 30"/>`,
};

/* Grades name their forms in prose ("Plate, sheet & strip"), so the drawing is
   matched on what the string says rather than on a fixed enum. */
function iconKey(form) {
  const f = String(form).toLowerCase();
  if (/wire/.test(f)) return 'wire';
  if (/fitting/.test(f)) return 'fittings';
  if (/pipe|tube/.test(f)) return 'pipe';
  if (/coil/.test(f)) return 'coil';
  if (/plate|sheet|strip/.test(f)) return 'plate';
  if (/bar|rod|forging|billet/.test(f)) return 'bar';
  return null;
}

function icon(key, cls) {
  const shape = SHAPES[key];
  if (!shape) return '';
  return `<svg class="${cls || 'formicon'}" ${VB} aria-hidden="true" focusable="false">${shape}</svg>`;
}

const LABELS = {
  pipe: 'Pipe & tube',
  fittings: 'Fittings',
  bar: 'Bar & rod',
  plate: 'Sheet & plate',
  coil: 'Coil',
  wire: 'Wire',
};

module.exports = { SHAPES, LABELS, iconKey, icon };
