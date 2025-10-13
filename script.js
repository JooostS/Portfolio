// Mobile menu toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');
mobileMenu.onclick = () => {
  mobileMenu.classList.toggle('active');
  navLinks.classList.toggle('active');
};

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.onclick = e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
});

// Scroll shadow effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.boxShadow = window.pageYOffset > 0 ? '0 2px 20px rgba(0,0,0,0.5)' : 'none';
});

// Scroll animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.project-card, .skill-category').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.5s ease';
  observer.observe(el);
});

// Fade-in on load
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// Dark mode toggle
document.getElementById('darkModeToggle').onclick = () =>
  document.body.classList.toggle('light-mode');

// Meteors
function createMeteor() {
  const m = document.createElement('div');
  m.className = 'meteor';
  m.style.top = '-80px';
  m.style.left = Math.random() * window.innerWidth + 'px';
  m.style.setProperty('--drift', ((Math.random() - 0.5) * 300) + 'px');
  m.style.animation = 'fall-diagonal 2s linear forwards';
  document.body.appendChild(m);
  setTimeout(() => m.remove(), 2000);
}
setInterval(createMeteor, 1000);