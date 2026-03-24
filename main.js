/* ============================================================
   main.js — Artist Editor Portfolio
   Handles: cursor, nav scroll, reveal, mobile menu, showreel
============================================================ */

(function () {
  'use strict';

  /* ── Custom Cursor ────────────────────────────────────────── */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    // Smooth follower loop
    function animateFollower() {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Scale on interactive elements
    const interactives = document.querySelectorAll('a, button, input, textarea, .work-item, .service-card, .video-frame');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
        cursor.style.opacity = '0.5';
        follower.style.transform = 'translate(-50%, -50%) scale(1.4)';
        follower.style.borderColor = 'rgba(201, 169, 110, 0.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.opacity = '1';
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.borderColor = 'rgba(201, 169, 110, 0.35)';
      });
    });
  }

  /* ── Nav Scroll Effect ────────────────────────────────────── */
  const nav = document.getElementById('nav');
  function handleNavScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ── Mobile Menu ──────────────────────────────────────────── */
  const menuBtn = document.getElementById('nav-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function closeMenu() {
    menuBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const isOpen = menuBtn.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ── Scroll Reveal ────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── Showreel Play ────────────────────────────────────────── */
  const videoFrame = document.getElementById('video-frame');
  const placeholder = document.getElementById('video-placeholder');
  const iframe = document.getElementById('showreel-iframe');

  if (videoFrame && placeholder && iframe) {
    videoFrame.addEventListener('click', () => {
      const src = iframe.getAttribute('data-src');
      if (src) {
        iframe.src = src;
        iframe.style.display = 'block';
        placeholder.style.opacity = '0';
        placeholder.style.pointerEvents = 'none';
      }
    });
  }

  /* ── Contact Form ─────────────────────────────────────────── */
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.textContent = 'Message Sent ✓';
        submitBtn.style.background = '#4ade80';
        form.reset();
        setTimeout(() => {
          submitBtn.textContent = 'Send Message';
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 1200);
    });
  }

  /* ── Smooth Anchor Scrolling ─────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const navH = nav ? nav.offsetHeight : 64;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Page Load Animation ─────────────────────────────────── */
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });

})();
