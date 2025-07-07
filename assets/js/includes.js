// /assets/js/includes.js
document.addEventListener('DOMContentLoaded', async () => {
  // Inject navbar & footer
  await Promise.all([
    inject('#header-placeholder', '/partials/nav.html'),
    inject('#footer-placeholder', '/partials/footer.html')
  ]);

  // After injection: activate current link, scroll logic, AOS …
  highlightActiveNav();
  initHelpers();
});

async function inject(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;
  const res = await fetch(url);
  el.innerHTML = await res.text();
}

function highlightActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#navMenu .nav-link')
          .forEach(a => a.classList.toggle('active', a.getAttribute('href') === path));
}

function initHelpers() {
  const nav  = document.getElementById('mainNav');
  const topB = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    const y = scrollY;
    nav?.classList.toggle('scrolled', y > 20);
    topB?.classList.toggle('show',     y > 400);
  });
  topB?.addEventListener('click', () => scrollTo({top: 0, behavior: 'smooth'}));
  AOS.init({duration: 800, once: true});
  GLightbox({selector: '.glightbox'});
}
