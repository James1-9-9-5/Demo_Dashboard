/*
  Service worker: lets staff and residents add the portal to their phone's home screen,
  and shows a friendly offline page (with phone numbers) when there's no signal.
  Pages always load fresh when online. Bump VERSION after big updates.
*/
var VERSION = "v7";
var CACHE = "maint-" + VERSION;
var CORE = [
  "./", "index.html", "staff.html", "community.html", "offline.html",
  "css/style.css", "css/fonts.css", "js/config.js", "js/brand.js", "js/main.js",
  "images/favicon.svg", "images/icon-192.png", "images/logo.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  // Network first, so content is always current; fall back to the cache, then the offline page
  e.respondWith(
    fetch(req).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(req, copy); });
      return res;
    }).catch(function () {
      return caches.match(req, { ignoreSearch: true }).then(function (hit) {
        return hit || (req.mode === "navigate" ? caches.match("offline.html") : undefined);
      });
    })
  );
});
