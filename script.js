// Mobile menu toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');
mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scroll effect to navigation
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    nav.style.boxShadow = 'none';
  } else {
    nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
  }
  lastScroll = currentScroll;
});

// Optional: Add intersection observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all project cards and skill categories for animation
document.querySelectorAll('.project-card, .skill-category').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Fade-in effect on page load
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 2s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Dark-Light mode switch

const darkToggle = document.getElementById('darkModeToggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode'); // ← niet dark-mode
});



// --- top-only, random-diagonal meteors ---
function createMeteor() {
  const m = document.createElement('div');
  m.className = 'meteor';

  /* start just above the viewport, random horizontal position */
  m.style.top = '-80px';
  m.style.left = Math.random() * window.innerWidth + 'px';

  /* randomise the horizontal drift (positive = right, negative = left) */
  const drift = (Math.random() - 0.5) * 300; // -150px … +150px
  m.style.setProperty('--drift', drift + 'px');

  /* reuse the single key-frame */
  m.style.animation = 'fall-diagonal 3s linear forwards';

  document.body.appendChild(m);
  setTimeout(() => m.remove(), 3000);
}

setInterval(createMeteor, 750);