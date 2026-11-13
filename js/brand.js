/*
  Brand colours: builds the full palette from two colours in config.js
  (brand.primary and brand.accent), so each Nation's site can match its logo.
  Shades are adjusted automatically so text stays readable (WCAG AA contrast).
*/
(function () {
  var B = (window.SITE && window.SITE.brand) || {};
  var root = document.documentElement.style;

  function hex(h) {
    h = String(h || "").replace("#", "").trim();
    if (h.length === 3) h = h.replace(/./g, "$&$&");
    if (!/^[0-9a-f]{6}$/i.test(h)) return null;
    return [0, 2, 4].map(function (i) { return parseInt(h.substr(i, 2), 16); });
  }
  function toHex(c) { return "#" + c.map(function (v) { return ("0" + Math.round(Math.max(0, Math.min(255, v))).toString(16)).slice(-2); }).join(""); }
  function mix(a, b, t) { return a.map(function (v, i) { return v + (b[i] - v) * t; }); }
  function lum(c) {
    var v = c.map(function (x) { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); });
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  }
  function contrast(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  var WHITE = [255, 255, 255], BLACK = [0, 0, 0];
  // Darken (or lighten) a colour until it reaches the target contrast against a background
  function until(c, bg, target, toward) {
    var out = c.slice();
    for (var i = 0; i < 40 && contrast(out, bg) < target; i++) out = mix(out, toward, 0.06);
    return out;
  }

  var accent = hex(B.accent), primary = hex(B.primary);
  if (primary) {
    root.setProperty("--navy", toHex(primary));
    root.setProperty("--navy-2", toHex(mix(primary, WHITE, 0.06)));
    root.setProperty("--navy-hover", toHex(mix(primary, WHITE, 0.1)));
    root.setProperty("--navy-soft", toHex(until(mix(primary, WHITE, 0.15), WHITE, 7, BLACK)));
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", toHex(primary));
  }
  if (accent) {
    var deep = until(accent, WHITE, 4.8, BLACK);
    var mist = mix(accent, WHITE, 0.93);
    var nav = primary || [43, 46, 60];
    root.setProperty("--green", toHex(accent));
    root.setProperty("--green-deep", toHex(deep));
    root.setProperty("--green-hover", toHex(mix(deep, BLACK, 0.12)));
    root.setProperty("--green-ink", toHex(until(deep, mist, 7, BLACK)));
    root.setProperty("--green-tint", toHex(mix(accent, WHITE, 0.85)));
    root.setProperty("--green-mist", toHex(mist));
    root.setProperty("--green-line", toHex(mix(accent, WHITE, 0.72)));
    root.setProperty("--green-light", toHex(until(mix(accent, WHITE, 0.55), nav, 6, WHITE)));
    root.setProperty("--green-glow", "rgba(" + deep.map(Math.round).join(",") + ",.35)");
  }

  // Photo focus points: centre each crop on the subject (set in config.js > photos)
  var P = (window.SITE && window.SITE.photos) || {};
  var rules = Object.keys(P).filter(function (k) { return P[k] && P[k].focus; }).map(function (k) {
    return '[data-photo="' + k + '"]{object-position:' + P[k].focus + "}";
  }).join("");
  if (rules) { var st = document.createElement("style"); st.textContent = rules; document.head.appendChild(st); }
})();
