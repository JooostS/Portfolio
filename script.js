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

document.querySelectorAll('.posts-card, .skill-category').forEach(el => {
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

// TYPE-WRITER H1 -----------------------------------------------------------
const txts = ["JooostS", "Full-Stack Tinker", "Open-Source Fan"];
let ti = 0, ci = 0, fwd = true, speed = 80;
const h1 = document.querySelector(".hero h1");

(function type() {
  const cur = txts[ti];
  h1.textContent = cur.substring(0, ci);
  if (fwd && ci < cur.length) { ci++; setTimeout(type, speed); }
  else if (!fwd && ci > 0) { ci--; setTimeout(type, speed/2); }
  else { fwd = !fwd; if (fwd) ti = (ti+1)%txts.length; setTimeout(type, 800); }
})();

addEventListener('click', e=>{
  const p = document.createElement('particle');
  for(let i=0;i<30;i++){
    const s = p.cloneNode();
    s.style.cssText=`
      position:fixed;left:${e.clientX}px;top:${e.clientY}px;
      width:4px;height:4px;background:var(--accent);border-radius:50%;
      pointer-events:none;z-index:9999`;
    document.body.appendChild(s);
    const a=Math.random()*6.28, v=Math.random()*80+40;
    s.animate([
      {transform:'translate(0,0) scale(1)',opacity:1},
      {transform:`translate(${Math.cos(a)*v}px,${Math.sin(a)*v}px) scale(0)`,opacity:0}
    ],{duration:700,easing:'ease-out'}).onfinish=()=>s.remove();
  }
});

// REPOS FUNCTION
async function loadRepos() {
  const username = "JooostS";
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`);
  const repos = await response.json();
  const container = document.getElementById("repos");

    container.innerHTML = repos.map(repo => {
    const imageUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/main/preview.png`;

    return `
      <div class="repos-card">
        <div class="repos-image">
          <img src="${imageUrl}" alt="${repo.name} preview" onerror="this.style.display='none'">
        </div>
        <div class="repos-content">
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available"}</p>
          <p><strong>Latest update:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
          <a href="${repo.html_url}" target="_blank" class="btn btn-primary">View Project</a>
        </div>
      </div>
    `;
  }).join("");

}

loadRepos();


// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const konamiSequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiSequence[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiSequence.length) {
      konamiIndex = 0;
      activateStars();
    }
  } else {
    konamiIndex = 0;
  }
});

function activateStars() {
  for (let i = 0; i < 750; i++) {
    const star = document.createElement('div');
    star.className = 'konami-star';
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = '-60px';
    document.body.appendChild(star);

    star.animate([
      { transform: 'translateY(0)', opacity: 2 },
      { transform: `translateY(${window.innerHeight}px)`, opacity: 0 }
    ], {
      duration: 2500 + Math.random() * 2000,
      easing: 'ease-in'
    }).onfinish = () => star.remove();
  }
}

