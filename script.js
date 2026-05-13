(function () {
  "use strict";

  /* ============================================================
     1) Copy contract address
     ============================================================ */
  const copyBtn = document.getElementById("copyBtn");
  const caEl = document.getElementById("ca");

  if (copyBtn && caEl) {
    copyBtn.addEventListener("click", async () => {
      const text = caEl.textContent.trim();
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          const tmp = document.createElement("textarea");
          tmp.value = text;
          tmp.setAttribute("readonly", "");
          tmp.style.position = "absolute";
          tmp.style.left = "-9999px";
          document.body.appendChild(tmp);
          tmp.select();
          document.execCommand("copy");
          document.body.removeChild(tmp);
        }
        copyBtn.textContent = "Copied!";
        copyBtn.classList.add("copied");
        setTimeout(() => {
          copyBtn.textContent = "Copy";
          copyBtn.classList.remove("copied");
        }, 1800);
      } catch (err) {
        copyBtn.textContent = "Press Ctrl+C";
        setTimeout(() => (copyBtn.textContent = "Copy"), 1800);
      }
    });
  }

  /* ============================================================
     2) Mouse parallax — each root has its own pointer offset
     Applies to elements [data-parallax] inside [data-parallax-root]
     value = strength multiplier (0..1+)
     ============================================================ */
  const roots = document.querySelectorAll("[data-parallax-root]");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!reduceMotion) {
    roots.forEach((root) => {
      const items = root.querySelectorAll("[data-parallax]");
      let raf = 0;
      let targetX = 0;
      let targetY = 0;
      let curX = 0;
      let curY = 0;

      const onMove = (e) => {
        const rect = root.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const px = e.clientX !== undefined ? e.clientX : 0;
        const py = e.clientY !== undefined ? e.clientY : 0;
        targetX = (px - cx) / rect.width;
        targetY = (py - cy) / rect.height;
        if (!raf) raf = requestAnimationFrame(tick);
      };

      const onLeave = () => {
        targetX = 0;
        targetY = 0;
        if (!raf) raf = requestAnimationFrame(tick);
      };

      const tick = () => {
        curX += (targetX - curX) * 0.08;
        curY += (targetY - curY) * 0.08;

        items.forEach((el) => {
          const strength = parseFloat(el.dataset.parallax) || 0;
          const tx = curX * strength * 50;
          const ty = curY * strength * 30;
          // Write to CSS variables so CSS combines mouse + scroll parallax
          el.style.setProperty("--mx", `${tx.toFixed(2)}px`);
          el.style.setProperty("--my", `${ty.toFixed(2)}px`);
        });

        if (
          Math.abs(targetX - curX) > 0.001 ||
          Math.abs(targetY - curY) > 0.001
        ) {
          raf = requestAnimationFrame(tick);
        } else {
          raf = 0;
        }
      };

      root.addEventListener("mousemove", onMove, { passive: true });
      root.addEventListener("mouseleave", onLeave, { passive: true });

      // Touch tilt (optional)
      root.addEventListener(
        "touchmove",
        (ev) => {
          if (!ev.touches[0]) return;
          onMove({ clientX: ev.touches[0].clientX, clientY: ev.touches[0].clientY });
        },
        { passive: true }
      );
      root.addEventListener("touchend", onLeave, { passive: true });
    });

    /* ============================================================
       3) Scroll parallax for the hero layers (vertical drift)
       ============================================================ */
    const hero = document.querySelector(".hero-stage");
    if (hero) {
      const heroLayers = hero.querySelectorAll(".layer[data-parallax]");
      let lastY = 0;
      let ticking = false;

      const onScroll = () => {
        lastY = window.scrollY || window.pageYOffset;
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(() => {
            heroLayers.forEach((el) => {
              const s = parseFloat(el.dataset.parallax) || 0;
              const offset = lastY * s * 0.4;
              // Write to CSS variable so CSS composes scroll + mouse parallax
              el.style.setProperty("--sy", `${(-offset).toFixed(2)}px`);
            });
            ticking = false;
          });
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  }

  /* ============================================================
     4) Reveal on scroll for content blocks
     ============================================================ */
  /* Reveal-on-scroll: only animate small "card" items that aren't critical content.
     Big content blocks (about, donation, tokenomics image) are always visible — this avoids
     any chance of them being stuck at opacity:0 if IntersectionObserver fails on deploy. */
  const targets = document.querySelectorAll(
    ".key-card, .exch-card, .outerblock, .video-card, .tk-row, .carousel-card"
  );

  if ("IntersectionObserver" in window && targets.length && !reduceMotion) {
    targets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition =
        "opacity .7s ease-out, transform .7s cubic-bezier(.2,.7,.2,1)";
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => io.observe(el));
  }

  /* ============================================================
     5) Click-to-play video (when controls are tapped)
     ============================================================ */
  document.querySelectorAll(".video-card video").forEach((vid) => {
    vid.addEventListener("click", () => {
      if (vid.paused) vid.play();
      else vid.pause();
    });
  });

  /* ============================================================
     6) Click Monty to make him jump!
     ============================================================ */
  const monty = document.querySelector(".art-monty");
  if (monty) {
    monty.style.cursor = "pointer";
    monty.addEventListener("click", () => {
      if (monty.classList.contains("jumping")) return;
      monty.classList.add("jumping");
      setTimeout(() => monty.classList.remove("jumping"), 700);
    });
  }
})();
