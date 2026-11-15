/* KARYLITE — site interactions (no dependencies) */
(function () {
  "use strict";
  var doc = document;
  var header = doc.getElementById("header");
  var isSubPage = !!doc.querySelector(".pdp");

  /* ---------- sticky header ---------- */
  function onScroll() {
    if (!header) return;
    var solid = isSubPage || window.scrollY > 60;
    header.classList.toggle("is-solid", solid);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile drawer ---------- */
  var drawer = doc.getElementById("drawer");
  var burger = doc.getElementById("burger");
  var closeBtn = doc.getElementById("drawerClose");
  function setDrawer(open) {
    if (!drawer) return;
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    if (burger) burger.setAttribute("aria-expanded", String(open));
    doc.body.style.overflow = open ? "hidden" : "";
  }
  if (burger) burger.addEventListener("click", function () { setDrawer(true); });
  if (closeBtn) closeBtn.addEventListener("click", function () { setDrawer(false); });
  if (drawer) {
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setDrawer(false); });
    });
  }
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      setDrawer(false);
      closeLightbox();
      doc.querySelectorAll("details.lang[open]").forEach(function (d) { d.removeAttribute("open"); });
    }
  });
  doc.addEventListener("click", function (e) {
    doc.querySelectorAll("details.lang[open]").forEach(function (d) {
      if (!d.contains(e.target)) d.removeAttribute("open");
    });
  });

  /* ---------- remember language ---------- */
  doc.querySelectorAll(".lang__menu a, .footer__langs a, .drawer__foot a").forEach(function (a) {
    a.addEventListener("click", function () {
      var m = a.getAttribute("href").match(/([a-z]{2})\/(?:products\/)?(?:[^\/]+\/)?$/);
      if (m) { try { localStorage.setItem("karylite_lang", m[1]); } catch (err) {} }
    });
  });

  /* ---------- reveal on scroll ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    doc.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    doc.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- video: play only when visible ---------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var vids = doc.querySelectorAll("video[data-autoplay]");
  if (vids.length && "IntersectionObserver" in window && !reduce) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else v.pause();
      });
    }, { threshold: 0.25 });
    vids.forEach(function (v) { vio.observe(v); });
  }
  if (reduce) {
    doc.querySelectorAll("video[autoplay]").forEach(function (v) {
      v.removeAttribute("autoplay"); v.pause();
    });
  }

  /* ---------- product gallery ---------- */
  var mainImg = doc.getElementById("mainImg");
  var thumbs = doc.getElementById("thumbs");
  if (mainImg && thumbs) {
    thumbs.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      thumbs.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-selected", "false"); });
      b.setAttribute("aria-selected", "true");
      mainImg.src = b.getAttribute("data-src");
    });
  }

  /* ---------- lightbox ---------- */
  var lb = doc.getElementById("lightbox");
  function closeLightbox() { if (lb) { lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); doc.body.style.overflow = ""; } }
  if (lb) {
    var lbImg = lb.querySelector("img");
    doc.querySelectorAll("[data-lightbox]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        lbImg.src = btn.getAttribute("data-lightbox");
        lb.classList.add("is-open");
        lb.setAttribute("aria-hidden", "false");
        doc.body.style.overflow = "hidden";
      });
    });
    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target.tagName === "BUTTON") closeLightbox();
    });
  }

  /* ---------- quote form (mailto) ---------- */
  var form = doc.getElementById("quoteForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var d = new FormData(form);
      var brand = doc.body.getAttribute("data-brand") || "KARYLITE";
      var to = (doc.documentElement.getAttribute("data-email") || "info@karylite.com");
      var subject = "Quote request — " + (d.get("company") || d.get("name") || "Website");
      var lines = [
        "Name: " + (d.get("name") || ""),
        "Email: " + (d.get("email") || ""),
        "Company: " + (d.get("company") || ""),
        "Country: " + (d.get("country") || ""),
        "",
        d.get("message") || ""
      ];
      window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n"));
      form.classList.add("is-sent");
    });
  }

  /* ---------- smooth anchor offset ---------- */
  doc.addEventListener("click", function (e) {
    var a = e.target.closest('a[href*="#"]');
    if (!a) return;
    var href = a.getAttribute("href");
    if (href.indexOf("#") === -1) return;
    var id = href.split("#")[1];
    if (!id) return;
    var target = doc.getElementById(id);
    if (!target) return;
    e.preventDefault();
    var top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", "#" + id);
  });
})();
