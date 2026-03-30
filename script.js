
const themeToggle = document.getElementById('themeToggle');
const toggleIcon = document.getElementById('toggleIcon');
const html = document.documentElement;

const ICONS = { light: '◐', dark: '◑' };

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

applyTheme(initialTheme);

themeToggle.addEventListener('click', () => {
  const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

function applyTheme(theme) {
  html.dataset.theme = theme;
  toggleIcon.textContent = theme === 'dark' ? ICONS.dark : ICONS.light;
}


const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.style.boxShadow = 'var(--shadow-md)';
  } else {
    nav.style.boxShadow = 'none';
  }
}, { passive: true });


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navHeight = nav.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


const revealEls = document.querySelectorAll(
  '.project-card, .cert-card, .contact-link, .section-header, .hero-inner'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => observer.observe(el));


document.querySelectorAll('.projects-grid .project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 70}ms`;
});

document.querySelectorAll('.certs-grid .cert-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 55}ms`;
});



document.getElementById('year').textContent = new Date().getFullYear();
