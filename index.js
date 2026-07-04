/* Dean Satine portfolio interactions */
(function () {
  const handleFirstTab = (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
      window.addEventListener('mousedown', handleMouseDownOnce);
    }
  };

  const handleMouseDownOnce = () => {
    document.body.classList.remove('user-is-tabbing');
    window.removeEventListener('mousedown', handleMouseDownOnce);
    window.addEventListener('keydown', handleFirstTab);
  };

  window.addEventListener('keydown', handleFirstTab);

  const backToTopButton = document.querySelector('.back-to-top');
  const updateBackToTop = () => {
    if (!backToTopButton) return;
    const isVisible = window.scrollY > 700;
    backToTopButton.style.visibility = isVisible ? 'visible' : 'hidden';
    backToTopButton.style.opacity = isVisible ? '1' : '0';
    backToTopButton.style.transform = isVisible ? 'scale(1)' : 'scale(.72)';
  };
  updateBackToTop();
  window.addEventListener('scroll', updateBackToTop, { passive: true });

  const nav = document.querySelector('.nav__panel, .simple-header');
  const updateNav = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  const revealTargets = document.querySelectorAll([
    '.featured-card-wrap',
    '.project-list-card',
    '.client__logo-wrap',
    '.about-contact__about',
    '.about-contact__contact',
    '.project-body__top',
    '.project-body__media',
    '.project-header__image',
    '.projects-category',
    '.privacy-content',
    '.reveal-on-scroll'
  ].join(','));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach((el, index) => {
      el.classList.add('reveal-ready');
      el.style.setProperty('--reveal-delay', `${Math.min(index * 40, 280)}ms`);
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  // Small parallax lift on hero background, light enough to stay smooth.
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      const offset = Math.min(window.scrollY * 0.08, 80);
      header.style.setProperty('--hero-drift', `${offset}px`);
    }, { passive: true });
  }
}());
