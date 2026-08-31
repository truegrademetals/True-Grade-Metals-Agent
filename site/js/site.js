/* True Grade Metals — one authored moment: a measurement resolving. */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var y = document.getElementById('yr');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- The PMI readout resolves ---------- */
  var readout = document.getElementById('readout');
  if (readout) {
    var rows = Array.prototype.slice.call(readout.querySelectorAll('tr[data-row]'));
    var stamp = readout.querySelector('[data-stamp]');

    // Molybdenum is the substitution tell on C-276 — it gets the emphasis.
    rows.forEach(function (row) {
      var el = row.querySelector('th');
      if (el && el.textContent.trim() === 'Mo') row.classList.add('is-watch');
    });

    var settle = function (row, delay) {
      var cell = row.querySelector('.num');
      var target = cell.getAttribute('data-val');
      var decimals = (target.split('.')[1] || '').length;
      var value = parseFloat(target);

      if (reduced) {
        cell.textContent = target;
        row.classList.add('is-in');
        return;
      }

      window.setTimeout(function () {
        var start = performance.now();
        var dur = 520;
        var tick = function (now) {
          var t = Math.min(1, (now - start) / dur);
          // exponential ease-out: fast arrival, long settle
          var e = 1 - Math.pow(2, -10 * t);
          if (t < 1) {
            // instrument noise while it resolves
            var noise = (1 - e) * value * 0.35 * (Math.random() - 0.5);
            cell.textContent = (value * e + noise).toFixed(decimals);
            requestAnimationFrame(tick);
          } else {
            cell.textContent = target;
            row.classList.add('is-in');
          }
        };
        requestAnimationFrame(tick);
      }, delay);
    };

    var run = function () {
      rows.forEach(function (row, i) { settle(row, 260 + i * 130); });
      var last = 260 + rows.length * 130 + 420;
      if (stamp) {
        if (reduced) { stamp.style.opacity = 1; }
        else { window.setTimeout(function () { stamp.classList.add('is-on'); }, last); }
      }
    };

    if ('IntersectionObserver' in window) {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { run(); ro.disconnect(); }
        });
      }, { threshold: 0.25 });
      ro.observe(readout);
    } else {
      run();
    }
  }

  /* ---------- Gates advance as you pass them ---------- */
  var gates = document.querySelectorAll('[data-gate]');
  if (gates.length) {
    if (reduced || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(gates, function (g) { g.classList.add('is-in'); });
    } else {
      var go = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('is-in');
            go.unobserve(en.target);
          }
        });
      }, { threshold: 0.3, rootMargin: '0px 0px -8% 0px' });
      Array.prototype.forEach.call(gates, function (g) { go.observe(g); });
    }
  }
})();
