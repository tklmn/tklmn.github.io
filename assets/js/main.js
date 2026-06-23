(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Theme toggle ----------
  var themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      root.classList.toggle("dark");
      try { localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light"); } catch (e) {}
    });
  }

  // ---------- Burger menu ----------
  var burger = document.getElementById("navBurger");
  var navLinks = document.getElementById("navLinks");
  if (burger && navLinks) {
    burger.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ---------- i18n (language switching) ----------
  // Dictionary is emitted in <head> from _data/i18n/*; languages auto-discovered.
  var DICT = window.__I18N__ || {};
  var I18N_DEFAULT = window.__I18N_DEFAULT__ || "en";
  var LANGS = Object.keys(DICT);

  if (LANGS.length) {
    var resolvePath = function (obj, path) {
      return path.split(".").reduce(function (o, k) {
        return o == null ? undefined : o[k];
      }, obj);
    };

    // Typewriter effect — types out an element's text with a blinking cursor.
    var twTimer = null;
    var runTypewriter = function (el) {
      var text = el.textContent;
      el.setAttribute("aria-label", text);
      if (twTimer) { clearTimeout(twTimer); twTimer = null; }
      if (reduce) return; // keep the full text, no animation
      var span = document.createElement("span");
      var cursor = document.createElement("span");
      cursor.className = "tw-cursor";
      cursor.setAttribute("aria-hidden", "true");
      el.textContent = "";
      el.appendChild(span);
      el.appendChild(cursor);
      var i = 0;
      var tick = function () {
        span.textContent = text.slice(0, i);
        if (i++ < text.length) twTimer = setTimeout(tick, 60);
        else twTimer = null;
      };
      tick();
    };

    var applyLang = function (lang) {
      if (!DICT[lang]) lang = I18N_DEFAULT;
      var d = DICT[lang];
      document.querySelectorAll("[data-i18n]").forEach(function (el) {
        var val = resolvePath(d, el.getAttribute("data-i18n"));
        if (val == null) return;
        var attr = el.getAttribute("data-i18n-attr");
        if (attr) el.setAttribute(attr, val);
        else el.textContent = val;
      });
      // (Re)run the typewriter on the freshly-set text.
      document.querySelectorAll("[data-typewriter]").forEach(runTypewriter);
      root.lang = lang;
      root.setAttribute("data-lang", lang);
      // Update the document title on the home page.
      if (d.profile && document.querySelector(".hero")) {
        document.title = d.profile.name + " — " + d.profile.role;
      }
      // Reflect choice in the switcher.
      document.querySelectorAll("[data-set-lang]").forEach(function (b) {
        b.setAttribute("aria-checked", b.getAttribute("data-set-lang") === lang ? "true" : "false");
      });
      var cur = document.querySelector("[data-lang-current]");
      if (cur) cur.textContent = lang.toUpperCase();
      try { localStorage.setItem("lang", lang); } catch (e) {}
    };

    var initLang = root.getAttribute("data-lang");
    if (LANGS.indexOf(initLang) === -1) initLang = I18N_DEFAULT;
    applyLang(initLang);

    var langToggle = document.getElementById("langToggle");
    var langMenu = document.getElementById("langMenu");
    if (langToggle && langMenu) {
      langToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = langMenu.classList.toggle("open");
        langToggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      document.addEventListener("click", function () {
        langMenu.classList.remove("open");
        langToggle.setAttribute("aria-expanded", "false");
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          langMenu.classList.remove("open");
          langToggle.setAttribute("aria-expanded", "false");
        }
      });
      langMenu.querySelectorAll("[data-set-lang]").forEach(function (b) {
        b.addEventListener("click", function () {
          applyLang(b.getAttribute("data-set-lang"));
          langMenu.classList.remove("open");
          langToggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  // ---------- Reveal on scroll ----------
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll("[data-reveal]").forEach(function (el) { el.classList.add("is-in"); });
  }

  // ---------- Count-up stats ----------
  // Animates ".stat .num" from 0 to its value when scrolled into view,
  // preserving any prefix/suffix like "+" (e.g. "200+").
  var nums = document.querySelectorAll(".stat .num");
  if (nums.length) {
    var animateNum = function (el) {
      var raw = el.getAttribute("data-count") || el.textContent;
      el.setAttribute("data-count", raw);
      var m = raw.match(/^(\D*)([\d.,]+)(\D*)$/);
      if (!m) return;
      var pre = m[1], numStr = m[2].replace(/,/g, ""), suf = m[3];
      var dec = (numStr.split(".")[1] || "").length;
      var target = parseFloat(numStr);
      if (isNaN(target)) return;
      if (reduce) { el.textContent = raw; return; }
      var dur = 1300, start = null;
      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var val = target * (1 - Math.pow(1 - p, 3)); // ease-out cubic
        el.textContent = pre + (dec ? val.toFixed(dec) : Math.round(val).toLocaleString()) + suf;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = raw;
      };
      requestAnimationFrame(step);
    };
    if ("IntersectionObserver" in window) {
      var ioNum = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { animateNum(e.target); ioNum.unobserve(e.target); }
        });
      }, { threshold: 0.4 });
      nums.forEach(function (el) { ioNum.observe(el); });
    } else {
      nums.forEach(animateNum);
    }
  }

  // ---------- Scroll to top ----------
  var toTop = document.getElementById("toTop");
  if (toTop) {
    window.addEventListener("scroll", function () {
      toTop.classList.toggle("show", window.scrollY > 600);
    }, { passive: true });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
  }

  // ---------- GitHub projects import ----------
  var grid = document.getElementById("projectGrid");
  if (grid) {
    var user = grid.getAttribute("data-user");
    var hide = (grid.getAttribute("data-hide") || "").split(",").map(function (s) { return s.trim().toLowerCase(); }).filter(Boolean);
    var max = parseInt(grid.getAttribute("data-max"), 10) || 12;
    var emptyMsg = grid.getAttribute("data-empty") || "No public repositories found.";
    var state = document.getElementById("projectState");

    function esc(s) {
      return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    }

    fetch("https://api.github.com/users/" + encodeURIComponent(user) + "/repos?per_page=100&sort=updated", {
      headers: { Accept: "application/vnd.github+json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("GitHub API " + res.status);
        return res.json();
      })
      .then(function (repos) {
        var list = repos
          .filter(function (r) { return !r.fork && !r.archived && !r.private; })
          .filter(function (r) { return hide.indexOf(r.name.toLowerCase()) === -1; })
          .sort(function (a, b) {
            if (b.stargazers_count !== a.stargazers_count) return b.stargazers_count - a.stargazers_count;
            return new Date(b.pushed_at) - new Date(a.pushed_at);
          })
          .slice(0, max);

        if (!list.length) {
          state.textContent = emptyMsg;
          return;
        }

        grid.innerHTML = list.map(function (r) {
          var tags = "";
          if (r.language) tags += '<span class="tag">' + esc(r.language) + "</span>";
          if (r.topics) {
            r.topics.slice(0, 3).forEach(function (t) { tags += '<span class="tag">' + esc(t) + "</span>"; });
          }
          var meta =
            '<span><iconify-icon icon="ph:star-bold"></iconify-icon>' + r.stargazers_count + "</span>" +
            '<span><iconify-icon icon="ph:git-fork-bold"></iconify-icon>' + r.forks_count + "</span>";
          return (
            '<a class="project" href="' + esc(r.html_url) + '" target="_blank" rel="noopener">' +
              '<div class="project-top">' +
                '<iconify-icon class="project-icon" icon="ph:folder-open-bold"></iconify-icon>' +
                '<span class="project-meta">' + meta + "</span>" +
              "</div>" +
              '<div class="project-title">' + esc(r.name) + "</div>" +
              '<div class="project-desc">' + esc(r.description || "No description provided.") + "</div>" +
              '<div class="tags">' + tags + "</div>" +
            "</a>"
          );
        }).join("");
      })
      .catch(function (err) {
        state.textContent = "Could not load projects right now. View them on GitHub →";
        var link = document.createElement("a");
        link.href = "https://github.com/" + user + "?tab=repositories";
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = " github.com/" + user;
        state.appendChild(link);
        if (window.console) console.warn("Project import failed:", err);
      });
  }
})();
