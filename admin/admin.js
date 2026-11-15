/* KARYLITE Content Console — vanilla JS, no build step. */
(function () {
  "use strict";

  var PASS_HASH = "e866c24d332a1e51eb46fb94707f8b84e827ae4988b920c17cd0dd3ece712987"; // karylite2026
  var store = {
    draft: "karylite_draft",
    preview: "karylite_preview",
    auth: "karylite_auth",
    gh: "karylite_github"
  };

  var state = {
    site: null,
    i18n: {},
    lang: "en",
    section: "dashboard",
    product: null,
    media: [],
    dirty: false
  };

  var content = document.getElementById("content");
  var titleEl = document.getElementById("sectionTitle");
  var subEl = document.getElementById("sectionSub");
  var saveState = document.getElementById("saveState");
  var langPick = document.getElementById("langPick");
  var toastEl = document.getElementById("toast");
  var saveTimer = null;

  /* ---------------- utils ---------------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function get(obj, path) {
    var p = path.split("."), n = obj;
    for (var i = 0; i < p.length; i++) { if (n == null) return undefined; n = n[p[i]]; }
    return n;
  }
  function set(obj, path, val) {
    var p = path.split("."), n = obj;
    for (var i = 0; i < p.length - 1; i++) { if (n[p[i]] == null) n[p[i]] = {}; n = n[p[i]]; }
    n[p[p.length - 1]] = val;
  }
  function param(obj) { return obj ? (obj === "site" ? state.site : state.i18n[state.lang]) : null; }
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-on");
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove("is-on"); }, 2200);
  }
  function b64(str) {
    var bytes = new TextEncoder().encode(str), bin = "";
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }
  function download(name, text, mime) {
    var blob = new Blob([text], { type: mime || "application/json;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 3000);
  }

  /* ---------------- form helpers ---------------- */
  function field(label, scope, path, opts) {
    opts = opts || {};
    var src = scope === "site" ? state.site : state.i18n[state.lang];
    var val = get(src, path);
    if (opts.type === "lines") val = Array.isArray(val) ? val.join("\n") : (val || "");
    if (val == null) val = "";
    var id = "f_" + Math.random().toString(36).slice(2, 9);
    var hint = opts.hint ? '<small>' + esc(opts.hint) + '</small>' : "";
    if (opts.type === "textarea" || opts.type === "lines") {
      return '<div class="field' + (opts.full ? " full" : "") + '"><label for="' + id + '">' + esc(label) +
        '</label><textarea id="' + id + '" data-bind="' + scope + ":" + path + '" data-type="' + (opts.type || "text") +
        '">' + esc(val) + "</textarea>" + hint + "</div>";
    }
    if (opts.type === "select") {
      var optsHtml = (opts.options || []).map(function (o) {
        var v = typeof o === "string" ? o : o.value, t = typeof o === "string" ? o : o.label;
        return '<option value="' + esc(v) + '"' + (v === val ? " selected" : "") + ">" + esc(t) + "</option>";
      }).join("");
      return '<div class="field"><label for="' + id + '">' + esc(label) + '</label><select id="' + id +
        '" data-bind="' + scope + ":" + path + '">' + optsHtml + "</select></div>";
    }
    return '<div class="field"><label for="' + id + '">' + esc(label) + '</label><input id="' + id +
      '" type="' + (opts.type || "text") + '" value="' + esc(val) + '" data-bind="' + scope + ":" + path +
      '" data-type="' + (opts.type || "text") + '"' + (opts.placeholder ? ' placeholder="' + esc(opts.placeholder) + '"' : "") +
      ">" + hint + "</div>";
  }

  /* ---------------- boot ---------------- */
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var pw = document.getElementById("pw").value;
    var buf = new TextEncoder().encode(pw);
    crypto.subtle.digest("SHA-256", buf).then(function (hash) {
      var hex = Array.from(new Uint8Array(hash)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
      if (hex === PASS_HASH) {
        sessionStorage.setItem(store.auth, "1");
        start();
      } else {
        document.getElementById("loginErr").textContent = "Wrong password. Try again.";
      }
    });
  });

  if (sessionStorage.getItem(store.auth) === "1") start();

  function start() {
    document.getElementById("gate").style.display = "none";
    document.getElementById("app").hidden = false;
    loadData();
  }

  document.getElementById("logout").addEventListener("click", function () {
    sessionStorage.removeItem(store.auth);
    location.reload();
  });

  function loadData() {
    Promise.all([
      fetch("../data/site.json").then(function (r) { return r.json(); }),
      fetch("../data/media.json").then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; })
    ]).then(function (res) {
      state.site = res[0];
      state.media = res[1] || [];
      state.product = state.site.products[0].id;
      state.lang = state.site.defaultLanguage || "en";
      var codes = state.site.languages.map(function (l) { return l.code; });
      langPick.innerHTML = state.site.languages.map(function (l) {
        return '<option value="' + l.code + '">' + esc(l.native) + "</option>";
      }).join("");
      langPick.value = state.lang;
      return Promise.all(codes.map(function (c) {
        return fetch("../data/i18n/" + c + ".json").then(function (r) { return r.json(); });
      })).then(function (list) {
      codes.forEach(function (c, i) { state.i18n[c] = list[i]; });
      // restore local draft
      try {
        var d = JSON.parse(localStorage.getItem(store.draft) || "null");
        if (d && d.site) { state.site = d.site; state.i18n = d.i18n || state.i18n; }
      } catch (e) {}
      var h = location.hash.replace("#", "");
      if (TITLES[h]) state.section = h;
      render();
      });
    }).catch(function (err) {
      content.innerHTML = '<div class="block"><h2>Could not load content</h2><p class="hint">' +
        esc(err.message) + "</p><p class=\"hint\">Open the console from a web server, not as a file:// path. " +
        "Locally: <code>python -m http.server 8080</code></p></div>";
    });
  }

  langPick.addEventListener("change", function () {
    state.lang = langPick.value;
    try { localStorage.setItem("karylite_lang", state.lang); } catch (e) {}
    render();
  });

  document.getElementById("sideNav").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-section]");
    if (!b) return;
    state.section = b.dataset.section;
    render();
  });

  /* ---------------- save ---------------- */
  content.addEventListener("input", function (e) {
    var t = e.target;
    if (!t.dataset || !t.dataset.bind) return;
    var idx = t.dataset.bind.indexOf(":");
    var scope = t.dataset.bind.slice(0, idx);
    var path = t.dataset.bind.slice(idx + 1);
    var v = t.value;
    if (t.dataset.type === "lines") {
      v = v.split("\n").map(function (s) { return s.trim(); }).filter(Boolean);
    }
    set(scope === "site" ? state.site : state.i18n[state.lang], path, v);
    markDirty();
    scheduleSave();
  });

  content.addEventListener("change", function (e) {
    if (e.target.tagName === "SELECT" && e.target.dataset.bind) {
      var t = e.target, idx = t.dataset.bind.indexOf(":");
      set(t.dataset.bind.slice(0, idx) === "site" ? state.site : state.i18n[state.lang],
        t.dataset.bind.slice(idx + 1), t.value);
      markDirty(); scheduleSave(); render();
    }
  });

  function markDirty() {
    state.dirty = true;
    saveState.textContent = "Unsaved";
    saveState.classList.add("is-dirty");
  }
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveLocal, 700);
  }
  function saveLocal() {
    try {
      localStorage.setItem(store.draft, JSON.stringify({ site: state.site, i18n: state.i18n }));
      localStorage.setItem(store.preview, JSON.stringify({ site: state.site, i18n: state.i18n }));
      state.dirty = false;
      saveState.textContent = "Draft saved";
      saveState.classList.remove("is-dirty");
    } catch (e) {
      saveState.textContent = "Storage full";
      saveState.classList.add("is-dirty");
    }
  }
  // flush before leaving
  window.addEventListener("beforeunload", function () { if (state.dirty) saveLocal(); });

  /* ---------------- render ---------------- */
  var TITLES = {
    dashboard: ["Dashboard", "Manage every text, image and specification."],
    brand: ["Brand & contact", "Company details used across all languages."],
    home: ["Home page", "Hero, section headings and company copy."],
    products: ["Products", "Models, specifications and localized descriptions."],
    tech: ["Technology", "Six engineering blocks shown on the home page."],
    service: ["Service & OEM", "After-sales promises and private-label offer."],
    media: ["Media library", "All images and videos shipped with the site."],
    preview: ["Preview", "See the draft without publishing."],
    publish: ["Publish", "Export JSON or commit straight to GitHub."]
  };

  function render() {
    var t = TITLES[state.section] || TITLES.dashboard;
    titleEl.textContent = t[0];
    subEl.textContent = t[1];
    document.querySelectorAll("#sideNav button").forEach(function (b) {
      b.classList.toggle("is-on", b.dataset.section === state.section);
    });
    var html = "";
    if (state.section === "dashboard") html = viewDashboard();
    else if (state.section === "brand") html = viewBrand();
    else if (state.section === "home") html = viewHome();
    else if (state.section === "products") html = viewProducts();
    else if (state.section === "tech") html = viewTech();
    else if (state.section === "service") html = viewService();
    else if (state.section === "media") html = viewMedia();
    else if (state.section === "preview") html = viewPreview();
    else if (state.section === "publish") html = viewPublish();
    content.innerHTML = html;
    if (state.section === "products") bindProductList();
    if (state.section === "preview") bindPreview();
    if (state.section === "publish") bindPublish();
    if (state.section === "media") bindMedia();
  }

  /* ---------------- views ---------------- */
  function viewDashboard() {
    var langs = state.site.languages.length;
    return '<div class="cards">' +
      '<div class="kpi"><b>' + state.site.products.length + '</b><span>Products</span></div>' +
      '<div class="kpi"><b>' + langs + '</b><span>Languages</span></div>' +
      '<div class="kpi"><b>' + state.media.length + '</b><span>Media files</span></div>' +
      '<div class="kpi"><b>' + state.site.features.length + '</b><span>Tech blocks</span></div>' +
      '</div>' +
      '<div class="block"><h2>How publishing works</h2><p class="hint">The site is fully static. Text, specs, links and images are stored in <code>data/site.json</code> and <code>data/i18n/*.json</code>.</p>' +
      '<ul class="steps">' +
      '<li><b>1</b><span><strong>Edit here.</strong> Changes are saved as a local draft and previewed instantly.</span></li>' +
      '<li><b>2</b><span><strong>Publish.</strong> Commit the JSON files to your GitHub repository from the Publish tab (or export and upload them manually).</span></li>' +
      '<li><b>3</b><span><strong>Done.</strong> Visitors get the new copy on the next page load — no rebuild for text or specs.</span></li>' +
      '<li><b>4</b><span>Adding or removing <em>products</em> changes page structure. After that, run <code>python tools/build.py</code> and commit the new folders.</span></li>' +
      '</ul></div>' +
      '<div class="block"><h2>Brand at a glance</h2>' +
      '<div class="grid2">' + field("Company", "site", "brand.legalName") + field("Email", "site", "brand.email") + "</div>" +
      '<div class="row"><button class="btn btn--ghost" data-go="brand">Edit brand</button>' +
      '<button class="btn btn--ghost" data-go="preview">Open preview</button>' +
      '<button class="btn btn--dark" data-go="publish">Publish</button></div></div>';
  }

  function viewBrand() {
    var s = state.site;
    return '<div class="block"><h2>Identity</h2><p class="hint">Used in the header, footer, schema.org data and share cards.</p>' +
      '<div class="grid2">' + field("Brand name", "site", "brand.name") + field("Descriptor", "site", "brand.descriptor") +
      field("Legal name", "site", "brand.legalName") + field("Tagline", "site", "brand.tagline") + "</div>" +
      '<div class="grid3">' + field("Email", "site", "brand.email", { type: "email" }) +
      field("Phone", "site", "brand.phone") + field("WhatsApp (digits)", "site", "brand.whatsapp") + "</div>" +
      field("Factory address", "site", "brand.addressLine") +
      '<div class="grid2">' + field("Public domain", "site", "brand.domain", { hint: "Used for canonical URLs, hreflang and sitemap. No trailing slash." }) +
      field("Founded", "site", "brand.founded") + "</div></div>" +
      '<div class="block"><h2>Social profiles</h2><p class="hint">Icons appear in the footer and contact section. Leave empty to hide an icon.</p>' +
      '<div class="grid2">' + field("Instagram", "site", "brand.socials.instagram", { type: "url" }) +
      field("Facebook", "site", "brand.socials.facebook", { type: "url" }) +
      field("LinkedIn", "site", "brand.socials.linkedin", { type: "url" }) +
      field("YouTube", "site", "brand.socials.youtube", { type: "url" }) + "</div></div>" +
      '<div class="block"><h2>Languages</h2><p class="hint">Active locales. The URL structure is <code>/en/</code>, <code>/de/</code>, … with hreflang tags.</p>' +
      '<div class="row">' + state.site.languages.map(function (l) {
        return '<span class="tag">' + esc(l.code) + " · " + esc(l.native) + (l.dir === "rtl" ? " · RTL" : "") + "</span>";
      }).join(" ") + "</div></div>";
  }

  function viewHome() {
    return '<div class="block"><h2>SEO</h2><p class="hint">Per-language title and meta description.</p>' +
      field("Meta title", "i18n", "meta.title") + field("Meta description", "i18n", "meta.desc", { type: "textarea" }) + "</div>" +
      '<div class="block"><h2>Hero</h2><div class="grid2">' +
      field("Eyebrow", "i18n", "home.heroEyebrow") + field("Headline", "i18n", "home.heroTitle") + "</div>" +
      field("Sub-headline", "i18n", "home.heroSub", { type: "textarea" }) +
      '<div class="grid2">' + field("Primary button", "i18n", "ui.ctaExplore") + field("Secondary button", "i18n", "ui.ctaDealer") + "</div></div>" +
      '<div class="block"><h2>Intro block</h2><div class="grid2">' +
      field("Eyebrow", "i18n", "home.introEyebrow") + field("Heading", "i18n", "home.introTitle") + "</div>" +
      field("Body", "i18n", "home.introText", { type: "textarea" }) + "</div>" +
      '<div class="block"><h2>Section headings</h2><div class="grid2">' +
      field("Range eyebrow", "i18n", "home.seriesEyebrow") + field("Range heading", "i18n", "home.seriesTitle") +
      field("Technology heading", "i18n", "home.techTitle") + field("Gallery heading", "i18n", "home.galleryTitle") +
      field("Service heading", "i18n", "home.serviceTitle") + field("Contact heading", "i18n", "home.ctaTitle") + "</div>" +
      field("Contact sub-line", "i18n", "home.ctaSub", { type: "textarea" }) + "</div>" +
      '<div class="block"><h2>Company</h2><div class="grid2">' +
      field("Heading", "i18n", "home.companyTitle") + field("Eyebrow", "i18n", "home.companyEyebrow") + "</div>" +
      field("Body", "i18n", "home.companyText", { type: "textarea" }) +
      '<div class="grid3">' + field("Stat 1", "i18n", "home.companyStat1") + field("Stat 2", "i18n", "home.companyStat2") + field("Stat 3", "i18n", "home.companyStat3") + "</div>" +
      '<div class="grid3">' + field("Stat 1 label", "i18n", "home.companyStat1Label") + field("Stat 2 label", "i18n", "home.companyStat2Label") + field("Stat 3 label", "i18n", "home.companyStat3Label") + "</div></div>";
  }

  function viewProducts() {
    var cats = state.site.categories.map(function (c) { return { value: c.id, label: c.id }; });
    var list = state.site.products.map(function (p) {
      return '<button data-pid="' + p.id + '"' + (p.id === state.product ? ' class="is-on"' : "") + ">" +
        '<img src="../' + esc(p.image) + '" alt=""><span><b>' + esc(p.name) + "</b><span>" + esc(p.category) + "</span></span></button>";
    }).join("");
    var p = state.site.products.find(function (x) { return x.id === state.product; }) || state.site.products[0];
    var specs = Object.keys(p.specs).map(function (k) {
      return '<div class="field"><label>' + esc(k) + '</label><input value="' + esc(p.specs[k]) +
        '" data-bind="site:products.' + state.site.products.indexOf(p) + '.specs.' + k + '"></div>';
    }).join("");
    return '<div class="split-admin"><div class="plist">' + list + "</div><div>" +
      '<div class="block"><div class="thumbbox"><img src="../' + esc(p.image) + '" alt=""><div><h2 style="margin:0">' + esc(p.name) + '</h2><p class="hint" style="margin:4px 0 0">' + esc(p.id) + "</p></div></div>" +
      '<div class="grid2">' + field("Model name", "site", "products." + state.site.products.indexOf(p) + ".name") +
      field("Badge", "site", "products." + state.site.products.indexOf(p) + ".badge", { hint: "e.g. flagship, pro, solar. Leave empty to hide." }) + "</div>" +
      '<div class="grid2">' + field("Category", "site", "products." + state.site.products.indexOf(p) + ".category", { type: "select", options: cats }) +
      field("Primary image", "site", "products." + state.site.products.indexOf(p) + ".image") + "</div>" +
      field("Gallery images (one per line)", "site", "products." + state.site.products.indexOf(p) + ".images", { type: "lines" }) +
      '<div class="grid2">' + field("Video (optional)", "site", "products." + state.site.products.indexOf(p) + ".video") +
      field("Poster image", "site", "products." + state.site.products.indexOf(p) + ".poster") + "</div></div>" +
      '<div class="block"><h2>Copy — ' + esc(langLabel()) + "</h2>" +
      field("Tagline", "i18n", "products." + p.id + ".tagline") +
      field("Description", "i18n", "products." + p.id + ".desc", { type: "textarea" }) + "</div>" +
      '<div class="block"><h2>Specifications</h2><p class="hint">Keys are fixed per model. Values appear in the spec table and comparison chart.</p>' +
      '<div class="grid2">' + specs + "</div>" +
      '<div class="row"><button class="btn btn--ghost btn--sm" id="addSpec">+ Add specification</button></div></div>' +
      "</div></div>";
  }

  function langLabel() {
    var l = state.site.languages.find(function (x) { return x.code === state.lang; });
    return l ? l.native : state.lang;
  }

  function bindProductList() {
    document.querySelectorAll(".plist button[data-pid]").forEach(function (b) {
      b.addEventListener("click", function () { state.product = b.dataset.pid; render(); });
    });
    var add = document.getElementById("addSpec");
    if (add) add.addEventListener("click", function () {
      var p = state.site.products.find(function (x) { return x.id === state.product; });
      var k = prompt("Specification key (lowercase, e.g. noise)");
      if (!k) return;
      var v = prompt("Value (e.g. 52 dB)");
      if (v == null) return;
      p.specs[k.trim()] = v;
      markDirty(); saveLocal(); render();
    });
  }

  function viewTech() {
    var out = '<div class="block"><h2>Technology blocks</h2><p class="hint">Six blocks alternate image / text on the home page. Product pages reuse three of them.</p></div>';
    state.site.features.forEach(function (f, i) {
      out += '<div class="block"><h2>0' + (i + 1) + ' — ' + esc(f.id) + "</h2>" +
        '<div class="grid2">' + field("Media path", "site", "features." + i + ".media", { hint: "Image (.jpg) or video (.mp4)." }) +
        field("Poster", "site", "features." + i + ".poster") + "</div>" +
        '<div class="grid2">' + field("Title", "i18n", "features." + f.id + ".title") +
        field("Description", "i18n", "features." + f.id + ".desc", { type: "textarea" }) + "</div></div>";
    });
    return out;
  }

  function viewService() {
    return '<div class="block"><h2>After-sales promises</h2><p class="hint">One promise per line. Shown as a checklist.</p>' +
      field("Items", "i18n", "service.items", { type: "lines" }) + "</div>" +
      '<div class="block"><h2>OEM / ODM offer</h2><p class="hint">Four short labels.</p>' +
      field("Items", "i18n", "service.oemItems", { type: "lines" }) + "</div>" +
      '<div class="block"><h2>Copy</h2>' +
      field("OEM heading", "i18n", "home.oemTitle") +
      field("OEM paragraph", "i18n", "home.oemText", { type: "textarea" }) + "</div>";
  }

  function viewMedia() {
    var grid = state.media.map(function (m) {
      var isVid = /\.mp4$/i.test(m.path);
      return '<div class="mediacard' + (isVid ? " is-video" : "") + '" data-path="' + esc(m.path) + '">' +
        (isVid ? '<img src="../assets/img/renders/underwater-hero.jpg" alt="">' : '<img src="../' + esc(m.path) + '" alt="" loading="lazy">') +
        "<span>" + esc(m.path.replace("assets/img/", "")) + "</span></div>";
    }).join("");
    return '<div class="block"><h2>Media library</h2><p class="hint">Click any file to copy its path, then paste it into an image or video field.</p>' +
      '<div class="row" style="margin-bottom:14px"><label class="btn btn--ghost btn--sm">Upload image<input type="file" id="upload" accept="image/*" hidden></label>' +
      '<span class="hint" style="margin:0">Uploads stay in your browser — download and drop them into <code>assets/img/</code>.</span></div>' +
      '<div class="mediagrid">' + grid + "</div></div>";
  }

  function bindMedia() {
    content.querySelectorAll(".mediacard").forEach(function (c) {
      c.addEventListener("click", function () {
        var p = c.dataset.path;
        if (navigator.clipboard) navigator.clipboard.writeText(p).then(function () { toast("Copied " + p); });
        else toast(p);
      });
    });
    var up = document.getElementById("upload");
    if (up) up.addEventListener("change", function () {
      var f = up.files[0];
      if (!f) return;
      var url = URL.createObjectURL(f);
      var a = document.createElement("a");
      a.href = url; a.download = f.name; a.textContent = "Download " + f.name;
      a.className = "btn btn--ghost btn--sm";
      a.style.marginInlineStart = "8px";
      up.parentElement.parentElement.appendChild(a);
      toast("Download the file, then upload it to assets/img/");
    });
  }

  function viewPreview() {
    var src = "../" + state.lang + "/?preview=1";
    return '<div class="block"><h2>Live draft preview</h2><p class="hint">Renders the localized site with your unsaved draft, loaded from this browser.</p>' +
      '<div class="previewbar"><button class="btn btn--ghost btn--sm" data-dev="desktop">Desktop</button>' +
      '<button class="btn btn--ghost btn--sm" data-dev="mobile">Mobile</button>' +
      '<a class="btn btn--dark btn--sm" href="' + src + '" target="_blank" rel="noopener">Open in new tab ↗</a></div>' +
      '<div class="framewrap desktop" id="framewrap"><iframe src="' + src + '" title="Preview" loading="lazy"></iframe></div></div>';
  }

  function bindPreview() {
    document.querySelectorAll("[data-dev]").forEach(function (b) {
      b.addEventListener("click", function () {
        var w = document.getElementById("framewrap");
        w.className = "framewrap " + b.dataset.dev;
      });
    });
  }

  function viewPublish() {
    var cfg = {};
    try { cfg = JSON.parse(localStorage.getItem(store.gh) || "{}"); } catch (e) {}
    return '<div class="block"><h2>Export / import</h2><p class="hint">Download the current draft as JSON files and commit them to your repository.</p>' +
      '<div class="row"><button class="btn" id="expSite">Export site.json</button>' +
      '<button class="btn btn--ghost" id="expLang">Export ' + esc(state.lang) + '.json</button>' +
      '<button class="btn btn--ghost" id="expAll">Export all languages</button>' +
      '<label class="btn btn--ghost">Import JSON<input type="file" id="imp" accept=".json" hidden></label>' +
      '<button class="btn btn--danger" id="resetDraft">Reset draft</button></div>' +
      '<div class="note">Text and specification edits only require the JSON files. Structural changes (new products, new sections) require <code>python tools/build.py</code> and a commit of the generated HTML.</div></div>' +
      '<div class="block"><h2>Publish to GitHub</h2><p class="hint">Commits <code>data/site.json</code> and every <code>data/i18n/*.json</code> through the GitHub API. The token is stored only in this browser.</p>' +
      '<div class="grid2">' + field("Owner", "gh", "owner", { type: "text" }) + field("Repository", "gh", "repo") +
      field("Branch", "gh", "branch") + field("Commit message", "gh", "message") + "</div>" +
      '<div class="field"><label>Personal access token (fine-grained, Contents: read &amp; write)</label>' +
      '<input type="password" id="ghToken" value="' + esc(cfg.token || "") + '" placeholder="github_pat_…"></div>' +
      '<div class="row"><button class="btn" id="publishBtn">Publish content</button>' +
      '<button class="btn btn--ghost" id="saveGh">Save settings</button></div>' +
      '<div class="log" id="log">Ready. Nothing published yet.</div>' +
      '<div class="note">GitHub Pages usually redeploys in 30–90 seconds. Enable Pages once under Settings → Pages → Deploy from branch → <code>main</code> / <code>root</code>.</div></div>';
  }

  function bindPublish() {
    var cfg = {};
    try { cfg = JSON.parse(localStorage.getItem(store.gh) || "{}"); } catch (e) {}
    ["owner", "repo", "branch", "message"].forEach(function (k) {
      var input = document.querySelector('[data-bind="gh:' + k + '"]');
      if (input && cfg[k]) input.value = cfg[k];
      if (input) input.dataset.bind = "";
    });
    var token = document.getElementById("ghToken");
    document.getElementById("saveGh").addEventListener("click", function () {
      var c = {
        owner: document.querySelector('[data-bind="gh:owner"]').value.trim(),
        repo: document.querySelector('[data-bind="gh:repo"]').value.trim(),
        branch: document.querySelector('[data-bind="gh:branch"]').value.trim() || "main",
        message: document.querySelector('[data-bind="gh:message"]').value.trim() || "Update site content"
      };
      localStorage.setItem(store.gh, JSON.stringify(c));
      toast("GitHub settings saved");
    });
    document.getElementById("expSite").addEventListener("click", function () {
      download("site.json", JSON.stringify(state.site, null, 2));
    });
    document.getElementById("expLang").addEventListener("click", function () {
      download(state.lang + ".json", JSON.stringify(state.i18n[state.lang], null, 2));
    });
    document.getElementById("expAll").addEventListener("click", function () {
      state.site.languages.forEach(function (l, i) {
        setTimeout(function () { download(l.code + ".json", JSON.stringify(state.i18n[l.code], null, 2)); }, i * 350);
      });
    });
    document.getElementById("imp").addEventListener("change", function (e) {
      var f = e.target.files[0];
      if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        try {
          var j = JSON.parse(r.result);
          if (j.brand && j.products) { state.site = j; toast("site.json imported"); }
          else if (j.meta || j.home) { state.i18n[state.lang] = j; toast(state.lang + ".json imported"); }
          markDirty(); saveLocal(); render();
        } catch (err) { toast("Invalid JSON"); }
      };
      r.readAsText(f);
    });
    document.getElementById("resetDraft").addEventListener("click", function () {
      if (!confirm("Discard the local draft and reload the files from disk?")) return;
      localStorage.removeItem(store.draft);
      location.reload();
    });
    document.getElementById("publishBtn").addEventListener("click", publishAll);
  }

  function log(msg, cls) {
    var l = document.getElementById("log");
    if (!l) return;
    l.innerHTML += '\n<span class="' + (cls || "") + '">' + esc(msg) + "</span>";
    l.scrollTop = l.scrollHeight;
  }

  function ghPut(cfg, path, text) {
    var api = "https://api.github.com/repos/" + cfg.owner + "/" + cfg.repo + "/contents/" + path;
    var headers = {
      "Authorization": "Bearer " + cfg.token,
      "Accept": "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    return fetch(api + "?ref=" + encodeURIComponent(cfg.branch), { headers: headers })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (existing) {
        var body = { message: cfg.message, content: b64(text), branch: cfg.branch };
        if (existing && existing.sha) body.sha = existing.sha;
        return fetch(api, { method: "PUT", headers: headers, body: JSON.stringify(body) });
      })
      .then(function (r) {
        if (!r.ok) return r.text().then(function (t) { throw new Error(path + " → " + r.status + " " + t.slice(0, 160)); });
        return true;
      });
  }

  function publishAll() {
    var cfg = {
      owner: document.querySelector('[data-bind="gh:owner"]').value.trim(),
      repo: document.querySelector('[data-bind="gh:repo"]').value.trim(),
      branch: document.querySelector('[data-bind="gh:branch"]').value.trim() || "main",
      message: document.querySelector('[data-bind="gh:message"]').value.trim() || "Update site content",
      token: document.getElementById("ghToken").value.trim()
    };
    if (!cfg.owner || !cfg.repo || !cfg.token) { toast("Owner, repo and token are required"); return; }
    localStorage.setItem(store.gh, JSON.stringify({ owner: cfg.owner, repo: cfg.repo, branch: cfg.branch, message: cfg.message }));
    var l = document.getElementById("log");
    l.textContent = "Publishing to " + cfg.owner + "/" + cfg.repo + " (" + cfg.branch + ")…";
    var files = [{ path: "data/site.json", text: JSON.stringify(state.site, null, 2) }];
    state.site.languages.forEach(function (lg) {
      files.push({ path: "data/i18n/" + lg.code + ".json", text: JSON.stringify(state.i18n[lg.code], null, 2) });
    });
    var chain = Promise.resolve();
    files.forEach(function (f) {
      chain = chain.then(function () {
        return ghPut(cfg, f.path, f.text).then(function () {
          log("✓ " + f.path, "ok");
        }).catch(function (err) {
          log("✗ " + err.message, "err");
        });
      });
    });
    chain.then(function () {
      log("Finished. GitHub Pages will redeploy shortly.");
      toast("Content published");
    });
  }

  /* dashboard quick links */
  content.addEventListener("click", function (e) {
    var b = e.target.closest("[data-go]");
    if (b) { state.section = b.dataset.go; render(); }
  });
})();
