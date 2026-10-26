//!
// * Minimalist Professional Portfolio - Script JS
// * Vanilla JavaScript, no dependencies
//!

/* -----------------------------------------------
   State Management
   ----------------------------------------------- */
const state = {
  reducedMotion: false,
  mobileMenuOpen: false,
  lastFocusedElement: null,
};

/* -----------------------------------------------
   DOM Element Caching
   ----------------------------------------------- */
const dom = {
  navbar: document.querySelector('.navbar'),
  navbarLinks: document.querySelectorAll('.navbar-link'),
  mobileLinks: document.querySelectorAll('.mobile-link'),
  navbarToggle: document.querySelector('.navbar-toggle'),
  mobileMenu: document.querySelector('.mobile-menu'),
  mobileMenuClose: document.querySelector('.mobile-menu-close'),
  backToTop: document.querySelector('.back-to-top'),
  footer: document.querySelector('.footer'),
  copyrightYear: document.getElementById('copyright-year'),
  sections: document.querySelectorAll('section[id]'),
};

/* -----------------------------------------------
   Reduced Motion Detection
   ----------------------------------------------- */
function initReducedMotion() {
  if (!('matchMedia' in window)) return;

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  state.reducedMotion = reducedMotionQuery.matches;

  reducedMotionQuery.addEventListener('change', (event) => {
    state.reducedMotion = event.matches;
  });
}

/* -----------------------------------------------
   Intersection Observer for Scroll Reveals
   ----------------------------------------------- */
function initScrollReveal() {
  if (state.reducedMotion || !('IntersectionObserver' in window)) return;

  const revealGroups = [
    { selector: '.section-header', delay: 0.06 },
    { selector: '.about-copy, .about-stats', delay: 0.08 },
    { selector: '.focus-card', delay: 0.07 },
    { selector: '.skill-card', delay: 0.06 },
    { selector: '.project-card', delay: 0.1 },
    { selector: '.timeline-item', delay: 0.08 },
    { selector: '.contact-copy, .contact-card', delay: 0.07 },
  ];

  const observer = new IntersectionObserver(
    (entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12,
    }
  );

  revealGroups.forEach(({ selector, delay }) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add('reveal');
      element.style.setProperty(
        '--reveal-delay',
        `${Math.min(index * delay, 0.4)}s`
      );
      observer.observe(element);
    });
  });
}

/* -----------------------------------------------
   Portrait Tilt (subtle CSS 3D)
   ----------------------------------------------- */
function initPortraitTilt() {
  if (state.reducedMotion) return;

  const heroVisual = document.querySelector('.hero-visual');
  const portraitStack = document.querySelector('.portrait-stack');
  if (!heroVisual || !portraitStack) return;

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!finePointer.matches) return;

  let frame = null;
  let tiltX = 0;
  let tiltY = 0;

  function applyTilt() {
    portraitStack.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
    portraitStack.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
    frame = null;
  }

  function queueTilt() {
    if (frame !== null) return;
    frame = window.requestAnimationFrame(applyTilt);
  }

  heroVisual.addEventListener('pointermove', (event) => {
    if (state.reducedMotion) return;

    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    tiltX = Math.max(-4, Math.min(4, -y * 8));
    tiltY = Math.max(-5, Math.min(5, x * 10));
    queueTilt();
  });

  heroVisual.addEventListener('pointerleave', () => {
    tiltX = 0;
    tiltY = 0;
    queueTilt();
  });

  finePointer.addEventListener('change', (event) => {
    if (event.matches) return;
    tiltX = 0;
    tiltY = 0;
    queueTilt();
  });
}

/* -----------------------------------------------
   Background Word Parallax
   ----------------------------------------------- */
function initParallax() {
  if (state.reducedMotion) return;

  const items = Array.from(document.querySelectorAll('[data-parallax]'));
  if (!items.length) return;

  let ticking = false;

  function updateParallax() {
    const viewportCenter = window.innerHeight / 2;

    items.forEach((item) => {
      const factor = Number.parseFloat(item.dataset.parallax) || 0;
      const parent = item.offsetParent;
      const parentTop = parent ? parent.getBoundingClientRect().top : 0;
      const itemCenter = parentTop + item.offsetTop + item.offsetHeight / 2;
      const offset = (viewportCenter - itemCenter) * factor * 10;
      const clamped = Math.max(-70, Math.min(70, offset));
      item.style.setProperty('--parallax', `${clamped.toFixed(1)}px`);
    });

    ticking = false;
  }

  function handleScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateParallax);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll, { passive: true });
  updateParallax();

  if (document.fonts?.ready) {
    document.fonts.ready.then(handleScroll).catch(() => {});
  }
}

/* -----------------------------------------------
   Navbar and Back-to-Top Visibility
   ----------------------------------------------- */
function initNavbarTransition() {
  if (!dom.navbar) return;

  function handleScroll() {
    const scrollY = window.scrollY;

    dom.navbar.classList.toggle('scrolled', scrollY > 24);

    if (dom.backToTop) {
      // Hide the button while the footer is in view so it never covers
      // the footer's social links.
      const footerInView =
        dom.footer &&
        dom.footer.getBoundingClientRect().top < window.innerHeight - 24;
      const showBackToTop = scrollY > 320 && !footerInView;

      dom.backToTop.classList.toggle('visible', showBackToTop);
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function initBackToTop() {
  if (!dom.backToTop) return;

  dom.backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: state.reducedMotion ? 'auto' : 'smooth',
    });
  });
}

/* -----------------------------------------------
   Smooth Scrolling for Anchor Links
   ----------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    // Let the skip link use native fragment navigation so the main
    // content receives focus for keyboard and screen-reader users.
    if (anchor.classList.contains('skip-link')) return;

    anchor.addEventListener('click', (event) => {
      event.preventDefault();

      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      const headerOffset = (dom.navbar?.offsetHeight ?? 76) + 12;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: state.reducedMotion ? 'auto' : 'smooth',
      });
    });
  });
}

/* -----------------------------------------------
   Mobile Menu
   ----------------------------------------------- */
function getMobileMenuFocusableElements() {
  if (!dom.mobileMenu) return [];
  return Array.from(
    dom.mobileMenu.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  );
}

function openMobileMenu() {
  if (!dom.mobileMenu || !dom.navbarToggle) return;

  state.lastFocusedElement = dom.navbarToggle;
  state.mobileMenuOpen = true;

  dom.mobileMenu.classList.add('active');
  dom.navbarToggle.classList.add('active');
  dom.navbarToggle.setAttribute('aria-expanded', 'true');
  dom.mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Wait for the menu to become visible before moving focus into it.
  window.requestAnimationFrame(() => {
    if (state.mobileMenuOpen && dom.mobileMenuClose) {
      dom.mobileMenuClose.focus({ preventScroll: true });
    }
  });
}

function closeMobileMenu({ restoreFocus = true } = {}) {
  if (!dom.mobileMenu || !dom.navbarToggle) return;

  state.mobileMenuOpen = false;

  dom.mobileMenu.classList.remove('active');
  dom.navbarToggle.classList.remove('active');
  dom.navbarToggle.setAttribute('aria-expanded', 'false');
  dom.mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (
    restoreFocus &&
    state.lastFocusedElement instanceof HTMLElement &&
    document.contains(state.lastFocusedElement)
  ) {
    state.lastFocusedElement.focus({ preventScroll: true });
  }

  state.lastFocusedElement = null;
}

function initMobileMenu() {
  if (!dom.navbarToggle || !dom.mobileMenu) return;

  dom.navbarToggle.addEventListener('click', () => {
    if (state.mobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  if (dom.mobileMenuClose) {
    dom.mobileMenuClose.addEventListener('click', () => closeMobileMenu());
  }

  dom.mobileMenu.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => closeMobileMenu());
  });

  document.addEventListener('keydown', (event) => {
    if (!state.mobileMenuOpen) return;

    if (event.key === 'Escape') {
      closeMobileMenu();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusableElements = getMobileMenuFocusableElements();
    if (!focusableElements.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  });

  window.addEventListener(
    'resize',
    () => {
      if (window.innerWidth > 1024 && state.mobileMenuOpen) {
        closeMobileMenu({ restoreFocus: false });
        dom.navbar?.querySelector('.navbar-logo')?.focus({ preventScroll: true });
      }
    },
    { passive: true }
  );
}

/* -----------------------------------------------
   Active Section Highlighting
   ----------------------------------------------- */
function initSectionHighlighting() {
  if (!dom.navbarLinks.length || !dom.sections.length) return;

  let ticking = false;

  function highlightSection() {
    const navbarHeight = dom.navbar?.offsetHeight ?? 76;
    const scrollPosition = window.scrollY + navbarHeight + 40;
    let currentSectionId = '';

    dom.sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop) {
        currentSectionId = section.id;
      }
    });

    [...dom.navbarLinks, ...dom.mobileLinks].forEach((link) => {
      const isActive = link.getAttribute('href') === `#${currentSectionId}`;
      link.classList.toggle('active', isActive);

      if (isActive) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function handleScroll() {
    if (ticking) return;

    ticking = true;
    window.requestAnimationFrame(() => {
      highlightSection();
      ticking = false;
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', highlightSection, { passive: true });
  highlightSection();
}

/* -----------------------------------------------
   Copyright Year Update
   ----------------------------------------------- */
function initCopyrightYear() {
  const year = new Date().getFullYear();

  if (dom.copyrightYear) {
    dom.copyrightYear.textContent = year;
  }
}

/* -----------------------------------------------
   Main Initialization
   ----------------------------------------------- */
function init() {
  initReducedMotion();
  initNavbarTransition();
  initScrollReveal();
  initPortraitTilt();
  initParallax();
  initMobileMenu();
  initSmoothScroll();
  initSectionHighlighting();
  initBackToTop();
  initCopyrightYear();
}

// DOMContentLoaded event
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
