#!/usr/bin/env node
/* True Grade Metals — static build.
   Generates materials/index.html and materials/<slug>.html from data/grades.json.
   Run: node _build.js
*/

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'materials');
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'grades.json'), 'utf8'));

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const familyLabel = (id) => (data.families.find((f) => f.id === id) || {}).label || id;

const forms = require('./lib/form-icons');

/* --------------------------------------------------------------- figures */

const num = (v) => { const n = parseFloat(v); return isNaN(n) ? null : n; };

/* Nominal composition.
   Only elements with a stated window (both bounds) are charted, at the midpoint
   of that window. An element specified as a maximum only has no midpoint to take,
   so it is folded into the balance rather than invented at half of its ceiling.
   Sum rows such as Al+Ti are constraints, not constituents: they are skipped when
   their components are separately specified. Nb+Ta stays, because no Nb or Ta row
   exists for it to double-count. */
function shares(g) {
  const named = new Set(g.composition.map((c) => c.el));
  const parts = [];
  let balEl = null, total = 0;

  for (const c of g.composition) {
    const mn = num(c.min), mx = num(c.max);

    if ((c.max === 'bal' || (mn !== null && mx === null)) && !balEl) { balEl = c.el; continue; }

    // A sum row whose components are themselves specified would double-count.
    if (c.el.includes('+') && c.el.split('+').some((e) => named.has(e.trim()))) continue;

    if (mn === null || mx === null) continue;   // maximum-only: no window, no midpoint
    const v = (mn + mx) / 2;
    if (v < 0.5) continue;                      // trace: below the resolution of a bar

    parts.push({ el: c.el, v });
    total += v;
  }

  if (!balEl) {
    console.log('WARNING: ' + g.slug + ' declares no balancing element; figure omitted');
    return null;
  }
  parts.unshift({ el: balEl, v: Math.max(0, 100 - total) });

  const sum = parts.reduce((a, p) => a + p.v, 0) || 1;
  return parts
    .map((p) => ({ ...p, pct: (p.v / sum) * 100 }))
    .sort((a, b) => b.v - a.v);
}

/* Ink ramp led by the form blue. Every tone clears 3:1 on the sheet, so a key
   swatch always has a readable link to its segment. */
const PAL = ['#123e8c', '#2c4a76', '#3d444a', '#55606a', '#6d757c', '#7f878d'];

function compositionFigure(g) {
  const s = shares(g);
  if (!s) return '';
  let x = 0;
  const segs = s.map((p, i) => {
    const w = p.pct;
    const r = `<rect x="${x.toFixed(3)}" y="0" width="${w.toFixed(3)}" height="12" `
      + `fill="${PAL[Math.min(i, PAL.length - 1)]}"/>`;
    x += w;
    return r;
  }).join('');

  const legend = s.map((p, i) => `
        <li><span class="key" style="background:${PAL[Math.min(i, PAL.length - 1)]}"></span>
          <b>${esc(p.el)}</b><span class="key__v">${p.v.toFixed(1)}</span></li>`).join('');

  return `
      <figure class="fig fig--comp">
        <figcaption class="fig__cap">Nominal composition</figcaption>
        <svg class="compbar" viewBox="0 0 100 12" preserveAspectRatio="none"
             role="img" aria-label="Stacked bar of nominal composition by weight for ${esc(g.name)}">
          ${segs}
        </svg>
        <ul class="keys">${legend}
        </ul>
        <p class="fig__note">Per cent by weight, at the midpoint of each specified window.
          Elements given only as a maximum have no midpoint to take, so they sit inside the
          balance rather than being estimated; trace elements below 0.5&nbsp;% are not shown.
          Indicative only; the composition table above and the governing standard are what define
          the limits.</p>
      </figure>`;
}

/* The form drawings, used on the materials index and injected into the
   hand-maintained homepage, so both come from lib/form-icons.js and cannot
   drift apart. */
function formStrip() {
  return `    <div class="formstrip">
      <p class="formstrip__label">Supplied in</p>
      <ul class="formstrip__list">${Object.keys(forms.LABELS).map((k) => `
        <li>${forms.icon(k, 'formicon formicon--lg')}<span>${esc(forms.LABELS[k])}</span></li>`).join('')}
      </ul>
    </div>`;
}

/* ------------------------------------------------------------------ chrome */

/* Root-relative throughout. A clean URL such as /materials carries no trailing
   slash, so a relative href resolves against the site root and 404s; absolute
   paths are immune to that. */
const head = (title, desc) => {
  const up = '/';
  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="icon" href="${up}favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..125,400..800&family=Azeret+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${up}css/site.css">
<link rel="stylesheet" href="${up}css/grade.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>

<header class="nav">
  <a class="nav__mark" href="${up}index.html">
    <span class="nav__mark-name">True Grade Metals</span>
    <span class="nav__mark-sub">Verified alloy sourcing · Australia</span>
  </a>
  <nav class="nav__links" aria-label="Primary">
    <a href="${up}index.html#chain">Verification</a>
    <a href="${up}materials/index.html">Materials</a>
    <a href="${up}index.html#engagement">Engagement</a>
    <a href="${up}index.html#entity">About</a>
  </nav>
  <a class="btn btn--sm" href="${up}index.html#rfq">Request material</a>
</header>

<main id="main">`;
};

const foot = () => {
  const up = '/';
  return `</main>

<footer class="foot">
  <div class="wrap foot__grid">
    <div>
      <p class="foot__name">True Grade Metals</p>
      <p class="foot__sub">Verified alloy sourcing for Australian industry.<br>
        A division of Bilt&nbsp;&amp;&nbsp;Co Pty Ltd, Rockhampton QLD.</p>
    </div>
    <dl class="foot__contact">
      <div><dt>Enquiries</dt><dd><a href="mailto:hello@truegrademetals.com">hello@truegrademetals.com</a></dd></div>
      <div><dt>Phone</dt><dd><a href="tel:+61799999999">07 9999 9999</a></dd></div>
      <div><dt>ACN</dt><dd>700 798 509</dd></div>
    </dl>
    <p class="foot__legal">
      Composition and mechanical values on this site are published standards information, reproduced
      for reference only. They are not a specification for any application, and the governing standard
      in its current revision always takes precedence.
      © <span id="yr">2026</span> Bilt &amp; Co Pty Ltd.
    </p>
  </div>
</footer>

<script src="${up}js/site.js" defer></script>
</body>
</html>
`;
};

/* ------------------------------------------------------------- grade page */

function gradePage(g) {
  const title = `${g.name} (${g.uns}) — verified supply to Australia | True Grade Metals`;
  const desc = `${g.name}, UNS ${g.uns}. Composition, mechanical properties and the test regime we `
    + `specify. We commission independent laboratory verification before the material ships.`;

  const comp = g.composition.map((c) => `
          <tr>
            <th scope="row">${esc(c.el)}</th>
            <td>${esc(c.min)}</td>
            <td>${esc(c.max)}</td>
          </tr>`).join('');

  const mech = g.mechanical.map((m) => `
          <div><dt>${esc(m.prop)}</dt><dd>${esc(m.value)}</dd></div>`).join('');

  const standards = g.standards.map((s) => `
          <tr>
            <td class="forms__cell">${forms.icon(forms.iconKey(s.form))}</td>
            <th scope="row">${esc(s.form)}</th>
            <td>${esc(s.spec)}</td>
          </tr>`).join('');

  const service = g.service.map((s) => `<li>${esc(s)}</li>`).join('\n        ');
  const regime = g.verify.regime.map((r) => `<li>${esc(r)}</li>`).join('\n          ');

  return head(title, desc) + `

<article class="grade">

  <header class="grade__head">
    <div class="wrap">
      <p class="crumb"><a href="/materials/index.html">Materials</a> <span>/</span> ${esc(familyLabel(g.family))}</p>
      <h1>${esc(g.name)}</h1>
      <dl class="desig">
        <div><dt>UNS</dt><dd>${esc(g.uns)}</dd></div>
        <div><dt>W.Nr</dt><dd>${esc(g.wnr)}</dd></div>
        <div><dt>EN</dt><dd>${esc(g.en)}</dd></div>
      </dl>
      <p class="grade__summary">${esc(g.summary)}</p>
    </div>
  </header>

  <section class="grade__specs">
    <div class="wrap">
    <div class="grade__cols">

      <div class="spec">
        <h2>Composition</h2>
        <table class="assay assay--static">
          <caption class="vh">Chemical composition limits, per cent by weight</caption>
          <thead>
            <tr><th scope="col">Element</th><th scope="col">Min</th><th scope="col">Max</th></tr>
          </thead>
          <tbody>${comp}
          </tbody>
        </table>
        <p class="spec__note">Per cent by weight, to the governing standard.</p>
${compositionFigure(g)}
      </div>

      <div class="spec">
        <h2>Mechanical</h2>
        <dl class="props">${mech}
        </dl>

        <h2 class="spec__second">Standards by form</h2>
        <table class="forms">
          <caption class="vh">Governing standard for each product form</caption>
          <tbody>${standards}
          </tbody>
        </table>
      </div>

    </div>
    </div>
  </section>

  <section class="grade__service">
    <div class="wrap">
      <h2>Where it is specified</h2>
      <ul class="service">
        ${service}
      </ul>
    </div>
  </section>

  <section class="verify" id="verify">
    <div class="wrap">
      <div class="verify__cols">
        <div class="verify__risk">
          <h2>${esc(g.tell || 'The substitution risk')}</h2>
          <p>${esc(g.verify.risk)}</p>
        </div>
        <div class="verify__regime">
          <h3>What we specify and check</h3>
          <ul class="regime">
          ${regime}
          </ul>
          <p class="verify__foot">
            We commission an accredited independent laboratory to test the heat before the material
            leaves China. You will receive that report unedited, whether it passes or not.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="grade__cta">
    <div class="wrap">
      <h2>Request ${esc(g.name)}</h2>
      <p>Tell us the form, dimensions and service conditions. We reply with availability, indicative
         landed price, lead time and the test regime we would specify for your application.</p>
      <a class="btn" href="/index.html#rfq">File an enquiry</a>
    </div>
  </section>

</article>
` + foot();
}

/* ------------------------------------------------------------ index page */

function indexPage(grades) {
  const rows = grades.map((g) => `
        <tr data-family="${esc(g.family)}">
          <th scope="row"><a href="/materials/${esc(g.slug)}.html">${esc(g.name)}</a></th>
          <td class="mono">${esc(g.uns)}</td>
          <td class="mono">${esc(g.wnr)}</td>
          <td class="idx__fam">${esc(familyLabel(g.family))}</td>
          <td class="idx__risk">${esc(g.tell || '')}</td>
        </tr>`).join('');

  const filters = ['all'].concat(data.families.map((f) => f.id)).map((id, i) => `
        <button type="button" class="chip${i === 0 ? ' is-on' : ''}" aria-pressed="${i === 0}" data-filter="${esc(id)}">${
    id === 'all' ? 'All grades' : esc(familyLabel(id))
  }</button>`).join('');

  return head(
    'Materials — nickel alloys, superalloys and grade-critical stainless | True Grade Metals',
    'Nineteen grades of nickel alloy, superalloy and grade-critical stainless, with the '
    + 'substitution risk and test regime we specify for each.',
    1
  ) + `

<section class="idx__head">
  <div class="wrap">
    <h1>Materials</h1>
    <p class="lede">
      Nineteen grades, in pipe and tube, fittings, bar and rod, sheet, plate and coil, and wire.
      Every grade below carries the substitution risk we watch for and the test regime we specify
      against it, because the grade you ordered and the grade that arrives are not the same question.
    </p>
  </div>
</section>

<section class="idx">
  <div class="wrap">
${formStrip()}

    <div class="chips" role="group" aria-label="Filter grades by family">${filters}
      <p class="idx__count" role="status" aria-live="polite">${grades.length} grades</p>
    </div>

    <table class="grades idx__table">
      <caption class="vh">Grades, designations and the substitution risk for each</caption>
      <thead>
        <tr>
          <th scope="col">Grade</th>
          <th scope="col">UNS</th>
          <th scope="col">W.Nr</th>
          <th scope="col">Family</th>
          <th scope="col">Substitution risk</th>
        </tr>
      </thead>
      <tbody>${rows}
      </tbody>
    </table>
    <p class="idx__empty" hidden>No grades in that family.</p>
  </div>
</section>

<script>
(function(){
  var chips = document.querySelectorAll('.chip');
  var rows  = document.querySelectorAll('.idx__table tbody tr');
  var empty = document.querySelector('.idx__empty');
  var count = document.querySelector('.idx__count');
  chips.forEach(function(chip){
    chip.addEventListener('click', function(){
      var f = chip.getAttribute('data-filter');
      chips.forEach(function(c){
        var on = (c === chip);
        c.classList.toggle('is-on', on);
        c.setAttribute('aria-pressed', String(on));
      });
      var shown = 0;
      rows.forEach(function(r){
        var on = (f === 'all' || r.getAttribute('data-family') === f);
        r.hidden = !on;
        if (on) shown++;
      });
      empty.hidden = shown > 0;
      if (count) count.textContent = shown + (shown === 1 ? ' grade' : ' grades');
    });
  });
})();
</script>
` + foot();
}

/* ----------------------------------------------------------------- build */

function build() {
  fs.mkdirSync(OUT, { recursive: true });

  const grades = data.grades
    .slice()
    .sort((a, b) => (b.launch === true) - (a.launch === true) || a.name.localeCompare(b.name));

  let n = 0;
  for (const g of grades) {
    fs.writeFileSync(path.join(OUT, g.slug + '.html'), gradePage(g), 'utf8');
    n++;
  }
  fs.writeFileSync(path.join(OUT, 'index.html'), indexPage(grades), 'utf8');

  /* A bare grade slug at the root is a natural URL to guess or to be sent in an
     email. Netlify resolves these to the real page rather than a 404. */
  const redirects = grades
    .map((g) => `/${g.slug}  /materials/${g.slug}  301`)
    .concat(['/materials  /materials/index.html  200'])
    .join('\n') + '\n';
  fs.writeFileSync(path.join(ROOT, '_redirects'), redirects, 'utf8');

  /* The homepage is hand-maintained, but its form drawings come from the same
     module as the grade pages. Injected between markers so the two can never
     show different shapes. */
  const homePath = path.join(ROOT, 'index.html');
  if (fs.existsSync(homePath)) {
    let home = fs.readFileSync(homePath, 'utf8');
    const marker = /<!-- FORMS:START -->[\s\S]*?<!-- FORMS:END -->/;
    if (marker.test(home)) {
      const next = home.replace(marker, '<!-- FORMS:START -->\n' + formStrip() + '\n    <!-- FORMS:END -->');
      if (next !== home) {
        fs.writeFileSync(homePath, next, 'utf8');
        console.log('injected form drawings into index.html');
      }
    } else {
      console.log('WARNING: index.html has no FORMS markers; homepage strip not updated');
    }
  }

  console.log('built ' + n + ' grade pages + materials index -> materials/');
  console.log('wrote _redirects (' + (grades.length + 1) + ' rules)');
  const missing = grades.filter((g) => !g.verify || !g.verify.risk || !g.verify.regime.length);
  if (missing.length) {
    console.log('WARNING: grades missing a verify block: ' + missing.map((g) => g.slug).join(', '));
  }
}

build();
