(function () {
  var S = window.SITE || {};
  var telHref = function (n) { return "tel:+1" + String(n || "").replace(/\D/g, "").replace(/^1(?=\d{10}$)/, ""); };

  // Fill names, phone numbers and links from config.js
  document.querySelectorAll("[data-site]").forEach(function (el) {
    var v = S[el.getAttribute("data-site")];
    if (v != null) el.textContent = v;
  });
  document.querySelectorAll("[data-tel]").forEach(function (el) {
    var n = S[el.getAttribute("data-tel")];
    if (!n) return;
    el.href = telHref(n);
    var t = el.querySelector(".tel-num");
    if (t) t.textContent = n;
  });
  document.querySelectorAll("[data-mail]").forEach(function (el) {
    var m = S[el.getAttribute("data-mail")];
    if (!m) return;
    el.href = "mailto:" + m;
    var t = el.querySelector(".mail-text");
    if (t) t.textContent = m;
  });
  document.querySelectorAll("[data-report]").forEach(function (el) {
    if (S.reportUrl && S.reportUrl !== "#") { el.href = S.reportUrl; el.target = "_blank"; el.rel = "noopener"; }
    else { el.href = "#"; el.addEventListener("click", soon); }
  });
  // Hide optional bits that are empty in config.js
  document.querySelectorAll("[data-optional]").forEach(function (el) {
    var v = S[el.getAttribute("data-optional")];
    if (!v) el.hidden = true;
  });

  // Notice banner
  var nb = document.getElementById("notice");
  var N = S.notice || {};
  var dismissed = false;
  try { dismissed = sessionStorage.getItem("notice-closed") === N.id; } catch (e) {}
  if (nb && N.show && N.text && !dismissed) {
    nb.className = "notice notice-" + (N.level || "info");
    nb.querySelector(".notice-text").textContent = N.text;
    var more = nb.querySelector(".notice-more");
    if (N.link) more.href = N.link; else more.hidden = true;
    nb.hidden = false;
    nb.querySelector(".notice-close").addEventListener("click", function () {
      nb.hidden = true;
      try { sessionStorage.setItem("notice-closed", N.id); } catch (e) {}
    });
  }

  var title = document.querySelector("title");
  if (title) title.textContent = title.textContent.replace("[Community Name]", S.community || "").replace("[Nation Name]", S.nation || "");
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  function soon(e) {
    e.preventDefault();
    var a = e.currentTarget;
    if (a.querySelector(".soon")) return;
    var s = document.createElement("span");
    s.className = "soon"; s.textContent = "Link coming soon";
    a.appendChild(s);
    setTimeout(function () { s.remove(); }, 2200);
  }

  // Mobile menu
  var toggle = document.querySelector(".nav-toggle"), nav = document.getElementById("site-nav");
  if (toggle && nav) toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });

  // Hero slideshow (crossfading photos)
  var slides = document.querySelectorAll(".hero-photo .slide");
  var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (slides.length) {
    var si = 0;
    slides[0].classList.add("active");
    if (!still && slides.length > 1) setInterval(function () {
      slides[si].classList.remove("active");
      si = (si + 1) % slides.length;
      slides[si].classList.add("active");
    }, 6500);
  }

  // Safety tips ticker
  document.querySelectorAll(".ticker").forEach(function (box) {
    var tips = S.safetyTips || [];
    var out = box.querySelector(".ticker-text");
    if (!tips.length || !out) { box.hidden = true; return; }
    var ti = 0;
    out.textContent = tips[0];
    if (still || tips.length < 2) return;
    setInterval(function () {
      out.classList.add("out");
      setTimeout(function () {
        ti = (ti + 1) % tips.length;
        out.textContent = tips[ti];
        out.classList.remove("out");
      }, 400);
    }, 6000);
  });

  // Staff service cards with mode tabs
  var grid = document.getElementById("service-grid");
  if (grid && S.services) {
    var lock = '<svg class="icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
    var arrow = '<svg class="icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    var icons = {
      Dashboard: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
      Survey: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
      Report: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 14h8M8 17h5"/>',
      Dataset: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
      Files: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
      "Stock Levels": '<path d="M3 7l9-4 9 4-9 4zM3 12l9 4 9-4M3 17l9 4 9-4"/>',
      Transactions: '<path d="M4 8h14l-3-3M20 16H6l3 3"/>'
    };
    var svg = function (label) {
      return '<svg class="icon" viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (icons[label] || icons.Dashboard) + "</svg>";
    };
    S.services.forEach(function (svc) {
      var card = document.createElement("article");
      card.className = "tool-card reveal";
      card.id = svc.id;
      var tabs = svc.modes.map(function (m, i) {
        return '<button role="tab" aria-selected="' + (i === 0) + '" data-i="' + i + '">' + m.label + "</button>";
      }).join("");
      card.innerHTML =
        '<header class="tool-head"><span class="lock" title="Sign-in required">' + lock + "</span>" +
        "<h3>" + svc.title + '</h3><p>' + svc.blurb + "</p></header>" +
        '<div class="tool-tabs" role="tablist" aria-label="' + svc.title + ' views">' + tabs + "</div>" +
        '<a class="tool-panel" href="#"><span class="icon-badge"></span><span class="tool-copy"><strong></strong><span></span></span><span class="go">' + arrow + "</span></a>";
      var panel = card.querySelector(".tool-panel");
      function select(i) {
        var m = svc.modes[i];
        card.querySelectorAll("[role=tab]").forEach(function (b, j) { b.setAttribute("aria-selected", i === j); });
        panel.querySelector(".icon-badge").innerHTML = svg(m.label);
        panel.querySelector("strong").textContent = "Open " + m.label.toLowerCase();
        panel.querySelector(".tool-copy span").textContent = m.text;
        var real = m.url && m.url !== "#";
        panel.href = real ? m.url : "#";
        panel.target = real ? "_blank" : "";
        panel.rel = real ? "noopener" : "";
        panel.dataset.ready = real ? "1" : "";
      }
      panel.addEventListener("click", function (e) { if (!panel.dataset.ready) soon(e); });
      card.querySelectorAll("[role=tab]").forEach(function (b) {
        b.addEventListener("click", function () { select(+b.dataset.i); });
      });
      select(0);
      grid.appendChild(card);
    });
    var jump = document.getElementById("service-jump");
    if (jump) jump.innerHTML = S.services.map(function (s) { return '<a href="#' + s.id + '">' + s.title + "</a>"; }).join("");
  }

  // Gentle scroll reveal
  var els = document.querySelectorAll(".reveal, [data-reveal]");
  els.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window && !still) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else els.forEach(function (el) { el.classList.add("in"); });
})();
