/* ════════════════════════════════════════
   ARIK MUKHERJEE — PORTFOLIO JS
   ════════════════════════════════════════ */

// ── AOS Init ──────────────────────────────
AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' });

// ── DOM References ────────────────────────
const navbar       = document.getElementById('navbar');
const hamburger    = document.getElementById('hamburger');
const mobileMenu   = document.getElementById('mobileMenu');
const themeToggle  = document.getElementById('themeToggle');
const themeIcon    = document.getElementById('themeIcon');
const scrollTopBtn = document.getElementById('scrollTop');
const heroTyped    = document.getElementById('heroTyped');
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');
const cursor       = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
const sliderTrack  = document.getElementById('testimonialsTrack');
const sliderDotsEl = document.getElementById('sliderDots');
const sliderPrev   = document.getElementById('sliderPrev');
const sliderNext   = document.getElementById('sliderNext');

// ════════════════════════════════════════
// CUSTOM CURSOR
// ════════════════════════════════════════
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Scale cursor on interactive elements
document.querySelectorAll('a, button, .project-card, .service-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(2)';
    cursorFollower.style.transform += ' scale(1.5)';
    cursorFollower.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    cursorFollower.style.opacity = '0.5';
  });
});

// ════════════════════════════════════════
// NAVBAR — scroll + hamburger
// ════════════════════════════════════════
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  // Scroll-to-top button
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close mobile menu on link click
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Scroll to top
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ════════════════════════════════════════
// THEME TOGGLE
// ════════════════════════════════════════
let isDark = true;
themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Persist theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  isDark = false;
  document.documentElement.setAttribute('data-theme', 'light');
  themeIcon.className = 'fas fa-sun';
}

// ════════════════════════════════════════
// TYPING ANIMATION
// ════════════════════════════════════════
const typedStrings = [
  'Full Stack Developer',
  'React Specialist',
  'Node.js Engineer',
  'UI/UX Enthusiast',
  'Problem Solver',
];
let typeIdx = 0, charIdx = 0, isDeleting = false;
const typeSpeed = 80, deleteSpeed = 40, pauseTime = 1800;

function typeLoop() {
  const current = typedStrings[typeIdx];
  if (!isDeleting) {
    heroTyped.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, pauseTime);
      return;
    }
  } else {
    heroTyped.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      typeIdx = (typeIdx + 1) % typedStrings.length;
    }
  }
  setTimeout(typeLoop, isDeleting ? deleteSpeed : typeSpeed);
}
typeLoop();

// ════════════════════════════════════════
// PARTICLE CANVAS
// ════════════════════════════════════════
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.5 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99,102,241,${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99,102,241,${0.15 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(loop);
  }
  loop();
})();

// ════════════════════════════════════════
// COUNTER ANIMATION
// ════════════════════════════════════════
function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  let current = 0;
  const step = target / 50;
  const interval = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(interval); }
    el.textContent = Math.floor(current);
  }, 30);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(animateCounter);
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ════════════════════════════════════════
// SKILL BARS ANIMATION
// ════════════════════════════════════════
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skills-cat').forEach(cat => barObserver.observe(cat));

// ════════════════════════════════════════
// PROJECT FILTERING
// ════════════════════════════════════════
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Active state
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeSlideUp 0.4s ease both';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ════════════════════════════════════════
// TESTIMONIALS SLIDER
// ════════════════════════════════════════
(function initSlider() {
  const cards = sliderTrack.querySelectorAll('.testimonial-card');
  const total = cards.length;
  let current = 0;
  let autoSlide;

  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    sliderDotsEl.appendChild(dot);
  });

  function getVisible() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function goTo(idx) {
    current = idx;
    const visible = getVisible();
    const maxIdx = Math.max(0, total - visible);
    const clampedIdx = Math.min(current, maxIdx);
    const cardWidth = cards[0].offsetWidth + 24; // gap 24px
    sliderTrack.style.transform = `translateX(-${clampedIdx * cardWidth}px)`;
    document.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  }

  function next() { current = (current + 1) % total; goTo(current); }
  function prev() { current = (current - 1 + total) % total; goTo(current); }

  sliderNext.addEventListener('click', () => { next(); resetAuto(); });
  sliderPrev.addEventListener('click', () => { prev(); resetAuto(); });

  function resetAuto() { clearInterval(autoSlide); autoSlide = setInterval(next, 4000); }
  autoSlide = setInterval(next, 4000);
  window.addEventListener('resize', () => goTo(current));
})();

// ════════════════════════════════════════
// CONTACT FORM VALIDATION
// ════════════════════════════════════════
if (contactForm) {
  const nameInput    = document.getElementById('name');
  const emailInput   = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameErr      = document.getElementById('nameError');
  const emailErr     = document.getElementById('emailError');
  const msgErr       = document.getElementById('messageError');
  const submitBtn    = document.getElementById('submitBtn');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearError(input, errEl) {
    input.style.borderColor = '';
    errEl.textContent = '';
  }

  function showError(input, errEl, msg) {
    input.style.borderColor = '#f87171';
    errEl.textContent = msg;
  }

  nameInput.addEventListener('input',    () => clearError(nameInput, nameErr));
  emailInput.addEventListener('input',   () => clearError(emailInput, emailErr));
  messageInput.addEventListener('input', () => clearError(messageInput, msgErr));

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;

    if (!nameInput.value.trim()) {
      showError(nameInput, nameErr, 'Please enter your name.'); valid = false;
    }
    if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
      showError(emailInput, emailErr, 'Please enter a valid email.'); valid = false;
    }
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      showError(messageInput, msgErr, 'Message must be at least 10 characters.'); valid = false;
    }

    if (!valid) return;

    // Simulate sending (replace with EmailJS or Formspree)
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    await new Promise(resolve => setTimeout(resolve, 1800));

    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    submitBtn.disabled = false;
    contactForm.reset();
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  });
}

// ════════════════════════════════════════
// ACTIVE NAV LINK ON SCROLL
// ════════════════════════════════════════
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinksAll.forEach(link => {
    link.classList.remove('active-nav');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active-nav');
  });
});

// ════════════════════════════════════════
// LAZY LOAD PLACEHOLDER IMAGES (on scroll)
// ════════════════════════════════════════
const lazyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      lazyObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .service-card').forEach(el => lazyObserver.observe(el));

// ════════════════════════════════════════
// TILT EFFECT ON PROJECT CARDS
// ════════════════════════════════════════
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / rect.height) * 6;
    const rotY =  (x / rect.width)  * 6;
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ════════════════════════════════════════
// STAGGERED HERO ENTRANCE (already via CSS)
// Additional — add visible class to body
// ════════════════════════════════════════
document.body.classList.add('loaded');

console.log('%c👋 Hi! Built by Arik Mukherjee', 'font-size:14px;color:#6366f1;font-weight:bold;');
console.log('%c💼 Open for freelance projects — arik.mukherjee@email.com', 'font-size:12px;color:#a855f7;');
