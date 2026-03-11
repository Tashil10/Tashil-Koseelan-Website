(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hero: add .in-view after load so entrance animation runs (stagger handled in CSS)
  function initHero() {
    var hero = document.getElementById("hero");
    if (!hero) return;
    if (reducedMotion) {
      hero.classList.add("in-view");
      return;
    }
    window.requestAnimationFrame(function () {
      setTimeout(function () {
        hero.classList.add("in-view");
      }, 80);
    });
  }

  // Scroll-triggered: add .in-view when section enters viewport
  function initScrollObserver() {
    var sections = document.querySelectorAll(".section");
    if (!sections.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -20% 0px",
        threshold: 0
      }
    );

    sections.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Smooth scroll for in-page links (anchor links and .hero-cta)
  function initSmoothScroll() {
    if (reducedMotion) return;

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      if (link.closest(".section-nav")) return;
      var href = link.getAttribute("href");
      if (href === "#") return;
      var target = document.querySelector(href);
      if (!target) return;

      link.addEventListener("click", function (e) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  // Section nav: sliding glass bubble + scroll spy
  function initSectionNav() {
    var navInner = document.querySelector(".section-nav-inner");
    var bubble = document.querySelector(".section-nav-bubble");
    var links = document.querySelectorAll(".section-nav-link");
    if (!navInner || !bubble || !links.length) return;

    var sectionIds = ["bio", "experience", "projects", "skills", "education", "contact"];
    var sections = sectionIds.map(function (id) {
      return document.getElementById(id);
    }).filter(Boolean);

    var navClickTargetId = null;
    var scrollSpyRafId = null;
    var refYRatio = 0.2;

    function updateBubble(activeLink) {
      if (!activeLink) return;
      var innerRect = navInner.getBoundingClientRect();
      var linkRect = activeLink.getBoundingClientRect();
      var pad = 2;
      bubble.style.left = (linkRect.left - innerRect.left - pad) + "px";
      bubble.style.top = (linkRect.top - innerRect.top - pad) + "px";
      bubble.style.width = (linkRect.width + pad * 2) + "px";
      bubble.style.height = (linkRect.height + pad * 2) + "px";
    }

    function setActiveLink(link) {
      links.forEach(function (l) {
        l.removeAttribute("aria-current");
      });
      if (link) {
        link.setAttribute("aria-current", "location");
        updateBubble(link);
      }
    }

    function getLinkForSection(section) {
      if (!section || !section.id) return null;
      var href = "#" + section.id;
      for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute("href") === href) return links[i];
      }
      return null;
    }

    function getSectionContainingRefY() {
      var refY = refYRatio * window.innerHeight;
      for (var i = 0; i < sections.length; i++) {
        if (!sections[i]) continue;
        var rect = sections[i].getBoundingClientRect();
        if (rect.top <= refY && refY <= rect.bottom) {
          return sections[i];
        }
      }
      var firstInView = null;
      for (var j = 0; j < sections.length; j++) {
        if (!sections[j]) continue;
        var r = sections[j].getBoundingClientRect();
        if (r.top <= window.innerHeight && r.bottom >= 0) {
          if (!firstInView || r.top < firstInView.getBoundingClientRect().top) {
            firstInView = sections[j];
          }
        }
      }
      return firstInView || sections[0] || null;
    }

    function updateActiveFromScroll() {
      if (navClickTargetId) {
        var targetSection = document.getElementById(navClickTargetId);
        if (targetSection) {
          var rect = targetSection.getBoundingClientRect();
          var refY = refYRatio * window.innerHeight;
          if (rect.top <= refY && refY <= rect.bottom) {
            setActiveLink(getLinkForSection(targetSection));
            navClickTargetId = null;
          }
        }
        return;
      }
      var activeSection = getSectionContainingRefY();
      setActiveLink(activeSection ? getLinkForSection(activeSection) : links[0]);
    }

    function scheduleScrollSpy() {
      if (scrollSpyRafId) return;
      scrollSpyRafId = requestAnimationFrame(function () {
        scrollSpyRafId = null;
        updateActiveFromScroll();
      });
    }

    var spyObserver = new IntersectionObserver(
      function () {
        scheduleScrollSpy();
      },
      { root: null, rootMargin: "0px", threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1] }
    );

    sections.forEach(function (s) {
      if (s) spyObserver.observe(s);
    });

    links.forEach(function (link) {
      link.addEventListener(
        "click",
        function (e) {
          var href = link.getAttribute("href");
          if (!href || href.indexOf("#") !== 0) return;
          e.preventDefault();
          var targetId = href.slice(1);
          var targetSection = document.getElementById(targetId);
          if (!targetSection) return;
          navClickTargetId = targetId;
          setActiveLink(link);
          var targetRect = targetSection.getBoundingClientRect();
          var scrollY = window.pageYOffset || document.documentElement.scrollTop;
          var scrollTop = targetRect.top + scrollY - refYRatio * window.innerHeight;
          var targetIndex = sectionIds.indexOf(targetId);
          if (targetIndex > 0) {
            var prevSection = document.getElementById(sectionIds[targetIndex - 1]);
            if (prevSection) {
              var prevRect = prevSection.getBoundingClientRect();
              scrollTop = Math.max(scrollTop, prevRect.bottom + scrollY);
            }
          }
          var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          window.scrollTo({ top: Math.min(Math.max(0, scrollTop), maxScroll), behavior: "smooth" });
          window.setTimeout(function () {
            if (navClickTargetId) navClickTargetId = null;
          }, 5000);
        },
        true
      );
    });

    updateActiveFromScroll();
    window.addEventListener("resize", function () {
      scheduleScrollSpy();
    });
  }

  // Run after DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initHero();
      initScrollObserver();
      initSmoothScroll();
      initSectionNav();
    });
  } else {
    initHero();
    initScrollObserver();
    initSmoothScroll();
    initSectionNav();
  }
})();
