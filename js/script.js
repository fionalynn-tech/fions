//!
// * Minimalist Professional Portfolio - Script JS
// * Vanilla JavaScript, no dependencies
//!

/* -----------------------------------------------
   State Management
   ----------------------------------------------- */
const state = {
  reducedMotion: false,
  lastScrollY: 0,
  mobileMenuOpen: false,
};

/* -----------------------------------------------
   DOM Element Caching
   ----------------------------------------------- */
const dom = {
  navbar: document.querySelector('.navbar'),
  navbarContainer: document.querySelector('.navbar-container'),
  navbarLinks: document.querySelectorAll('.navbar-link'),
  navbarToggle: document.querySelector('.navbar-toggle'),
  mobileMenu: document.querySelector('.mobile-menu'),
  mobileMenuClose: document.querySelector('.mobile-menu-close'),
  skipLink: document.querySelector('.skip-link'),
  scrollIndicators: document.querySelectorAll('.hero-scroll-indicator'),
  backToTop: document.querySelector('.back-to-top'),
  copyrightYear: document.getElementById('copyright-year'),
  sections: document.querySelectorAll('section[id]'),
  projectCards: document.querySelectorAll('.project-card'),
};

/* -----------------------------------------------
   Initialize Reduced Motion Detection
   ----------------------------------------------- */
function initReducedMotion() {
  if ('matchMedia' in window) {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    state.reducedMotion = reducedMotionQuery.matches;
    
    reducedMotionQuery.addEventListener('change', (e) => {
      state.reducedMotion = e.matches;
    });
  }
}

/* -----------------------------------------------
   Intersection Observer for Scroll Reveals
   ----------------------------------------------- */
function initScrollReveal() {
  if (state.reducedMotion) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all sections with animation classes
  document.querySelectorAll('.about-info-blocks .info-block').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
  
  // Observe project cards
  document.querySelectorAll('.project-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(el);
  });
  
  // Observe timeline items
  document.querySelectorAll('.timeline-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(el);
  });
}

/* -----------------------------------------------
   Sticky Navbar Background Transition
   ----------------------------------------------- */
function initNavbarTransition() {
  function handleScroll() {
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
      dom.navbar.style.background = 'rgba(11, 13, 16, 0.95)';
      dom.navbar.style.backdropFilter = 'blur(10px)';
    } else {
      dom.navbar.style.background = 'rgba(11, 13, 16, 0.8)';
      dom.navbar.style.backdropFilter = 'blur(10px)';
    }
    
    // Show/hide back-to-top button
    if (scrollY > 300) {
      dom.backToTop.classList.add('visible');
    } else {
      dom.backToTop.classList.remove('visible');
    }
    
    state.lastScrollY = scrollY;
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true });
}

/* -----------------------------------------------
   Smooth Scrolling for Anchor Links
   ----------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: state.reducedMotion ? 'auto' : 'smooth',
        });
      }
    });
  });
}

/* -----------------------------------------------
   Mobile Menu Toggle
   ----------------------------------------------- */
function initMobileMenu() {
  if (!dom.navbarToggle || !dom.mobileMenu) return;
  
  dom.navbarToggle.addEventListener('click', () => {
    state.mobileMenuOpen = !state.mobileMenuOpen;
    dom.mobileMenu.classList.toggle('active', state.mobileMenuOpen);
    dom.navbarToggle.setAttribute('aria-expanded', state.mobileMenuOpen);
    dom.mobileMenu.setAttribute('aria-hidden', !state.mobileMenuOpen);
    document.body.style.overflow = state.mobileMenuOpen ? 'hidden' : '';
  });
  
  dom.mobileMenuClose.addEventListener('click', () => {
    state.mobileMenuOpen = false;
    dom.mobileMenu.classList.remove('active');
    dom.navbarToggle.setAttribute('aria-expanded', false);
    dom.mobileMenu.setAttribute('aria-hidden', true);
    document.body.style.overflow = '';
  });
  
  // Close menu when a link is clicked
  dom.mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      state.mobileMenuOpen = false;
      dom.mobileMenu.classList.remove('active');
      dom.navbarToggle.setAttribute('aria-expanded', false);
      dom.mobileMenu.setAttribute('aria-hidden', true);
      document.body.style.overflow = '';
    });
  });
}

/* -----------------------------------------------
   Active Section Highlighting
   ----------------------------------------------- */
function initSectionHighlighting() {
  const navbarLinks = document.querySelectorAll('.navbar-link');
  
  function highlightSection() {
    const scrollY = window.pageYOffset;
    
    dom.sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navbarLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightSection, { passive: true });
  
  // Initial check
  highlightSection();
}

/* -----------------------------------------------
   Project Card Hover Effects
   ----------------------------------------------- */
function initProjectCardHover() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (state.reducedMotion) return;
      card.style.transform = 'translateY(-4px)';
      card.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
      if (state.reducedMotion) return;
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
}

/* -----------------------------------------------
   Button Hover Effects
   ----------------------------------------------- */
function initButtonHover() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      if (state.reducedMotion) return;
    });
    
    btn.addEventListener('focus', () => {
      if (state.reducedMotion) return;
    });
  });
}

/* -----------------------------------------------
   Copyright Year Update
   ----------------------------------------------- */
function initCopyrightYear() {
  const today = new Date();
  const year = today.getFullYear();
  if (dom.copyrightYear) {
    dom.copyrightYear.textContent = year;
  }
}

/* -----------------------------------------------
   Skip Link Focus Management
   ----------------------------------------------- */
function initSkipLink() {
  if (dom.skipLink) {
    dom.skipLink.addEventListener('focus', () => {
      dom.skipLink.classList.add('focus');
    });
    
    dom.skipLink.addEventListener('blur', () => {
      dom.skipLink.classList.remove('focus');
    });
  }
}

/* -----------------------------------------------
   Main Initialization
   ----------------------------------------------- */
function init() {
  initReducedMotion();
  initScrollReveal();
  initNavbarTransition();
  initSmoothScroll();
  initMobileMenu();
  initSectionHighlighting();
  initProjectCardHover();
  initButtonHover();
  initCopyrightYear();
  initSkipLink();
  
  console.log('Portfolio initialized successfully');
}

// DOMContentLoaded event
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
