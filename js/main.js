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
  // Logo: swap the placeholder for the real logo when one is set
  if (S.logo) document.querySelectorAll("[data-logo]").forEach(function (el) {
    var img = new Image();
    img.src = S.logo; img.alt = ""; img.className = "logo-img" + (el.classList.contains("sm") ? " sm" : "");
    el.replaceWith(img);
  });

  // Captions on page header photos
  document.querySelectorAll(".page-photo [data-photo]").forEach(function (img) {
    var p = (S.photos || {})[img.getAttribute("data-photo")];
    var c = img.parentNode.querySelector(".photo-cap");
    if (c && p && p.caption) c.textContent = p.caption; else if (c) c.hidden = true;
  });

  // Demo tag
  if (S.demo) document.querySelectorAll(".footer-base").forEach(function (fb) {
    var t = document.createElement("span");
    t.className = "demo-tag"; t.title = S.demoNote || ""; t.textContent = "Demo site";
    fb.firstElementChild.appendChild(t);
  });

  // Staff help details
  var H = S.staffHelp || {};
  document.querySelectorAll("[data-help]").forEach(function (el) {
    var k = el.getAttribute("data-help");
    if (k === "name" && H.name) el.textContent = H.name;
    if (k === "email" && H.email) { el.href = "mailto:" + H.email; var t = el.querySelector(".mail-text"); if (t) t.textContent = H.email; }
    if (k === "manual") { if (H.manualUrl && H.manualUrl !== "#") { el.href = H.manualUrl; el.target = "_blank"; el.rel = "noopener"; } else { el.href = "#"; el.addEventListener("click", soon); } }
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
    var tog = nb.querySelector(".notice-toggle");
    if (tog) tog.addEventListener("click", function () {
      var open = nb.classList.toggle("expanded");
      tog.textContent = open ? "Less" : "More";
      tog.setAttribute("aria-expanded", open);
    });
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

  // Pause / play button helper (WCAG 2.2.2: anything that changes on its own can be paused)
  var ICON_PAUSE = '<svg class="icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>', ICON_PLAY = '<svg class="icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M7 5.5v13a1 1 0 0 0 1.5.9l10.5-6.5a1 1 0 0 0 0-1.8L8.5 4.6A1 1 0 0 0 7 5.5z"/></svg>';
  function pauseButton(btn, label, onChange) {
    var paused = false;
    function draw() {
      btn.innerHTML = paused ? ICON_PLAY : ICON_PAUSE;
      btn.setAttribute("aria-label", (paused ? "Play " : "Pause ") + label);
      btn.setAttribute("aria-pressed", paused);
    }
    btn.addEventListener("click", function () { paused = !paused; draw(); onChange(paused); });
    draw();
  }
  var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hero slideshow: first photo loads straight away, the rest after the page has loaded
  var photo = document.querySelector(".hero-full, .hero-photo");
  var slides = photo ? photo.querySelectorAll(".slide") : [];
  if (slides.length) {
    var si = 0, userPaused = still, hover = false;
    slides[0].classList.add("active");
    // Load each photo just before it's needed, so the first visit only downloads one
    var load = function (i) { var s = slides[i % slides.length]; if (s && s.dataset.src) { s.src = s.dataset.src; s.removeAttribute("data-src"); } };
    var warm = function () { setTimeout(function () { load(1); }, 2500); };
    if (document.readyState === "complete") warm(); else window.addEventListener("load", warm);
    var dotsBox = photo.querySelector(".slide-dots");
    var dots = [];
    var cap = photo.querySelector(".photo-cap");
    var PH = S.photos || {};
    function caption() {
      if (!cap) return;
      var key = slides[si].getAttribute("data-photo"), c = PH[key] && PH[key].caption;
      cap.innerHTML = c ? '<span class="cap-n">' + ("0" + (si + 1)).slice(-2) + "</span>" + c : (S.community || "");
    }
    caption();
    function show(i) {
      slides[si].classList.remove("active");
      if (dots[si]) dots[si].setAttribute("aria-current", "false");
      si = (i + slides.length) % slides.length;
      load(si); load(si + 1);
      slides[si].classList.add("active");
      if (dots[si]) dots[si].setAttribute("aria-current", "true");
      caption();
    }
    if (dotsBox && slides.length > 1) {
      slides.forEach(function (s, i) {
        var d = document.createElement("button");
        d.type = "button"; d.className = "dot";
        d.setAttribute("aria-label", "Show photo " + (i + 1) + " of " + slides.length);
        d.setAttribute("aria-current", i === 0 ? "true" : "false");
        d.addEventListener("click", function () { show(i); });
        dotsBox.appendChild(d); dots.push(d);
      });
      var pb = photo.querySelector(".slide-pause");
      if (pb) pauseButton(pb, "slideshow", function (p) { userPaused = p; });
      if (still && pb) pb.click();
      if (photo.classList.contains("hero-photo")) {
        photo.addEventListener("mouseenter", function () { hover = true; });
        photo.addEventListener("mouseleave", function () { hover = false; });
      }
      setInterval(function () { if (!userPaused && !hover && !document.hidden) show(si + 1); }, 6500);
    } else if (dotsBox) dotsBox.parentNode.hidden = true;
  }

  // Tip ticker: the current season's maintenance tips mixed with the safety tips
  var month = new Date().getMonth() + 1;
  var season = (S.seasons || []).filter(function (s) { return (s.months || []).indexOf(month) > -1; })[0];
  var seasonal = season ? season.tips.map(function (t) { return { l: season.name + " tip", t: t }; }) : [];
  var safety = (S.safetyTips || []).map(function (t) { return { l: "Safety tip", t: t }; });
  var TIPS = [];
  for (var k = 0; k < Math.max(seasonal.length, safety.length); k++) {
    if (seasonal[k]) TIPS.push(seasonal[k]);
    if (safety[k]) TIPS.push(safety[k]);
  }
  document.querySelectorAll(".ticker").forEach(function (box) {
    var out = box.querySelector(".ticker-text"), lbl = box.querySelector(".ticker-label .lbl");
    if (!TIPS.length || !out) { box.hidden = true; return; }
    var ti = 0, paused = still, hover = false;
    function draw() { out.textContent = TIPS[ti].t; if (lbl) lbl.textContent = TIPS[ti].l; }
    draw();
    var tb = box.querySelector(".ticker-pause");
    if (TIPS.length < 2) { if (tb) tb.hidden = true; return; }
    if (tb) { pauseButton(tb, "tips", function (p) { paused = p; }); if (still) tb.click(); }
    box.addEventListener("mouseenter", function () { hover = true; });
    box.addEventListener("mouseleave", function () { hover = false; });
    box.addEventListener("focusin", function () { hover = true; });
    box.addEventListener("focusout", function () { hover = false; });
    setInterval(function () {
      if (paused || hover || document.hidden) return;
      out.classList.add("out");
      setTimeout(function () { ti = (ti + 1) % TIPS.length; draw(); out.classList.remove("out"); }, 400);
    }, 7000);
  });

  // Duotone icon set: 24px grid, 1.75 stroke, soft tinted fill behind the line work
  var DUO = {
    Dashboard: ['<rect x="3" y="4" width="18" height="16" rx="2.5"/>', '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M7.5 16v-3M12 16V8.5M16.5 16v-5.5"/>'],
    Survey: ['<rect x="5" y="4.5" width="14" height="16.5" rx="2.5"/>', '<rect x="5" y="4.5" width="14" height="16.5" rx="2.5"/><path d="M9 4.5V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v.5"/><path d="M8.5 10.5l1.2 1.2 2.3-2.4M14 11h2M8.5 15.5l1.2 1.2 2.3-2.4M14 16h2"/>'],
    Report: ['<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/>', '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>'],
    Dataset: ['<path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6z"/>', '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>'],
    Files: ['<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"/>', '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"/><path d="M3 10h18"/>'],
    "Stock Levels": ['<path d="M3.5 8L12 4l8.5 4v8L12 20l-8.5-4z"/>', '<path d="M3.5 8L12 4l8.5 4v8L12 20l-8.5-4z"/><path d="M3.5 8L12 12l8.5-4M12 12v8"/>'],
    Transactions: ['<circle cx="12" cy="12" r="9"/>', '<circle cx="12" cy="12" r="9"/><path d="M8 10h8l-2.5-2.5M16 14H8l2.5 2.5"/>'],
    wrench: ['<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>', '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>'],
    house: ['<path d="M4 10.5L12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z"/>', '<path d="M4 10.5L12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z"/><path d="M10 20.5V15h4v5.5"/>'],
    lifebuoy: ['<circle cx="12" cy="12" r="9"/>', '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.75"/><path d="M5.6 5.6l3.7 3.7M14.7 14.7l3.7 3.7M18.4 5.6l-3.7 3.7M9.3 14.7l-3.7 3.7"/>'],
    box: ['<path d="M3.5 8L12 4l8.5 4v8L12 20l-8.5-4z"/>', '<path d="M3.5 8L12 4l8.5 4v8L12 20l-8.5-4z"/><path d="M3.5 8L12 12l8.5-4M12 12v8M7.8 6l8.4 4.1"/>'],
    book: ['<path d="M4 19.5v-14A2.5 2.5 0 0 1 6.5 3H20v14H6.5A2.5 2.5 0 0 0 4 19.5z"/>', '<path d="M4 19.5v-14A2.5 2.5 0 0 1 6.5 3H20v14H6.5A2.5 2.5 0 0 0 4 19.5zm0 0A2.5 2.5 0 0 0 6.5 22H20v-5"/><path d="M8.5 7.5h7M8.5 11h5"/>'],
    truck: ['<path d="M2.5 6h11v11h-11z"/>', '<path d="M2.5 6h11v11h-11zM13.5 9.5h4l3 3.5V17h-7"/><circle cx="7" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/>'],
    water: ['<path d="M12 3s6.5 7 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10 12 3 12 3z"/>', '<path d="M12 3s6.5 7 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10 12 3 12 3z"/><path d="M9 15a3 3 0 0 0 3 3"/>'],
    bolt: ['<path d="M13 2.5L4.5 13.5H12l-1 8 8.5-11H12z"/>', '<path d="M13 2.5L4.5 13.5H12l-1 8 8.5-11H12z"/>'],
    spring: ['<path d="M12 21v-8M12 13c0-4 3-7 8-7 0 5-3 7-8 7zM12 15c0-3-2.5-5.5-7-5.5 0 4 2.5 5.5 7 5.5z"/>', '<path d="M12 21v-8M12 13c0-4 3-7 8-7 0 5-3 7-8 7zM12 15c0-3-2.5-5.5-7-5.5 0 4 2.5 5.5 7 5.5z"/>'],
    summer: ['<circle cx="12" cy="12" r="4.5"/>', '<circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4"/>'],
    fall: ['<path d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15z"/>', '<path d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15zM4 20l9-9"/>'],
    winter: ['<circle cx="12" cy="12" r="3"/>', '<path d="M12 2.5v19M3.8 7.25l16.4 9.5M3.8 16.75l16.4-9.5M9.5 4L12 6.5 14.5 4M9.5 20l2.5-2.5 2.5 2.5"/>'],
    tree: ['<path d="M12 2.5l6 8h-3l4 6H5l4-6H6z"/>', '<path d="M12 2.5l6 8h-3l4 6H5l4-6H6zM12 16.5v5"/>']
  };
  var svg = function (name, size) {
    var d = DUO[name] || (/^Module/.test(name) ? DUO.book : DUO.Dashboard), s = size || 26;
    return '<svg class="icon duo" viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="duo-fill" fill="currentColor" stroke="none">' + d[0] + "</g>" + d[1] + "</svg>";
  };

  // Staff service cards with mode tabs
  var grid = document.getElementById("service-grid");
  if (grid && S.services) {
    var lock = '<svg class="icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
    var arrow = '<svg class="icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    S.services.forEach(function (svc) {
      var card = document.createElement("article");
      card.className = "tool-card reveal";
      card.id = svc.id;
      var tabs = svc.modes.map(function (m, i) {
        return '<button role="tab" aria-selected="' + (i === 0) + '" data-i="' + i + '">' + m.label + "</button>";
      }).join("");
      card.innerHTML =
        '<header class="tool-head"><span class="svc-icon">' + svg(svc.icon || "wrench", 28) + '</span><span class="lock" title="Sign-in required">' + lock + "</span>" +
        "<div><h3>" + svc.title + '</h3><p>' + svc.blurb + "</p></header>" +
        '<div class="tool-tabs" role="tablist" aria-label="' + svc.title + ' views">' + tabs + "</div>" +
        '<a class="tool-panel" href="#"><span class="icon-badge"></span><span class="tool-copy"><strong></strong><span></span></span><span class="go">' + arrow + "</span></a>";
      var panel = card.querySelector(".tool-panel");
      function select(i) {
        var m = svc.modes[i];
        card.querySelectorAll("[role=tab]").forEach(function (b, j) { b.setAttribute("aria-selected", i === j); });
        panel.querySelector(".icon-badge").innerHTML = svg(m.icon || m.label, 24);
        panel.querySelector("strong").textContent = m.title || ("Open " + m.label.toLowerCase());
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

  // Seasonal maintenance tips (Home page)
  var sbox = document.getElementById("seasons");
  if (sbox && S.seasons) {
    var month = new Date().getMonth() + 1;
    var tick = '<svg class="icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
    S.seasons.forEach(function (s) {
      var now = (s.months || []).indexOf(month) > -1;
      var el = document.createElement("article");
      el.className = "season" + (now ? " now" : "");
      el.setAttribute("data-reveal", "");
      el.innerHTML = '<header><span class="season-icon">' + svg(s.name.toLowerCase(), 24) + "</span><h3>" + s.name + "</h3>" +
        (now ? '<span class="now-tag">This season</span>' : "") + "</header><ul>" +
        s.tips.map(function (t) { return "<li>" + tick + "<span>" + t + "</span></li>"; }).join("") + "</ul>";
      sbox.appendChild(el);
    });
  }

  // FAQ accordion (Community page)
  var fbox = document.getElementById("faq");
  if (fbox && S.faq) {
    fbox.innerHTML = S.faq.map(function (f, i) {
      return '<details class="faq-item"' + (i === 0 ? " open" : "") + '><summary><span>' + f.q + '</span><span class="faq-sign" aria-hidden="true"></span></summary><div class="faq-a"><p>' + f.a + "</p></div></details>";
    }).join("");
  }

  // Install to phone: register the service worker (needs https, so it does nothing on file:// previews)
  if ("serviceWorker" in navigator && location.protocol === "https:") {
    window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
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
