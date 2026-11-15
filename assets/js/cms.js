/* KARYLITE — content hydration.
   The pages are pre-rendered for SEO. If /data/*.json is edited through the
   admin console, this script patches the rendered text in the browser so a
   commit of the JSON is enough to update the live site. */
(function () {
  "use strict";
  var html = document.documentElement;
  var root = html.getAttribute("data-root") || "";
  var lang = html.getAttribute("lang") || "en";
  var isPreview = /[?&]preview=1/.test(location.search);

  function get(obj, path) {
    var parts = path.split("."), node = obj;
    for (var i = 0; i < parts.length; i++) {
      if (node == null) return undefined;
      node = node[parts[i]];
    }
    return node;
  }

  function apply(site, i18n) {
    if (!site) return;

    document.querySelectorAll("[data-cms]").forEach(function (el) {
      var v = get(i18n, el.getAttribute("data-cms"));
      if (typeof v === "string" && v) el.textContent = v;
    });

    document.querySelectorAll("[data-cms-site]").forEach(function (el) {
      var v = get(site, el.getAttribute("data-cms-site"));
      if (typeof v === "string" && v) el.textContent = v;
    });

    document.querySelectorAll("[data-cms-href-site]").forEach(function (el) {
      var v = get(site, el.getAttribute("data-cms-href-site"));
      if (typeof v === "string" && v) el.setAttribute("href", v);
    });

    document.querySelectorAll("[data-cms-src-site]").forEach(function (el) {
      var v = get(site, el.getAttribute("data-cms-src-site"));
      if (typeof v === "string" && v) el.setAttribute("src", v);
    });

    if (site.brand) {
      html.setAttribute("data-email", site.brand.email || "");
      document.querySelectorAll("[data-cms-email]").forEach(function (el) {
        el.textContent = site.brand.email;
        el.setAttribute("href", "mailto:" + site.brand.email);
      });
      var tel = site.brand.phone;
      if (tel) {
        document.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
          el.textContent = tel;
          el.setAttribute("href", "tel:" + tel.replace(/\s/g, ""));
        });
      }
    }

    if (isPreview) {
      if (i18n && i18n.meta) {
        if (i18n.meta.title) document.title = i18n.meta.title;
        var md = document.querySelector('meta[name="description"]');
        if (md && i18n.meta.desc) md.setAttribute("content", i18n.meta.desc);
      }
    }
  }

  if (isPreview) {
    try {
      var raw = localStorage.getItem("karylite_preview");
      if (raw) {
        var d = JSON.parse(raw);
        apply(d.site, d.i18n && d.i18n[lang]);
        return;
      }
    } catch (e) { /* fall through to network */ }
  }

  Promise.all([
    fetch(root + "data/site.json", { cache: isPreview ? "no-store" : "default" }).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; }),
    fetch(root + "data/i18n/" + lang + ".json", { cache: isPreview ? "no-store" : "default" }).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; })
  ]).then(function (res) { apply(res[0], res[1]); });
})();
