/* ===== CUSTOM CURSOR ===== */
const cursor = document.querySelector('.custom-cursor');
if (cursor && window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .service-item, .case-card, .blog-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
}

/* ===== NAVBAR SCROLL ===== */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 80);
});

/* ===== MOBILE MENU ===== */
const hamburger = document.querySelector('.nav-hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

/* ===== SERVICE ACCORDIONS ===== */
document.querySelectorAll('.service-item').forEach(item => {
  item.querySelector('.service-header').addEventListener('click', () => {
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.service-item').forEach(i => i.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
  });
});

/* ===== SCROLL REVEAL ===== */
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ===== COUNTER ANIMATION ===== */
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(counter => {
    if (counter.dataset.animated) return;
    const target = parseInt(counter.dataset.target);
    const suffix = counter.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.querySelector('.count').textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(update);
    }
    counter.dataset.animated = 'true';
    requestAnimationFrame(update);
  });
}
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { animateCounters(); statsObserver.unobserve(entry.target); }
  });
}, { threshold: 0.3 });
const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ===== HERO TEXT ANIMATION ===== */
window.addEventListener('load', () => {
  document.querySelector('.hero-content')?.classList.add('visible');
  const title = document.querySelector('.hero-title');
  if (title) {
    title.style.opacity = '0';
    title.style.transform = 'translateY(30px)';
    setTimeout(() => {
      title.style.transition = 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)';
      title.style.opacity = '1';
      title.style.transform = 'translateY(0)';
    }, 200);
  }
  const labels = document.querySelectorAll('.hero-label');
  labels.forEach((label, i) => {
    label.style.opacity = '0';
    label.style.transform = 'translateY(15px)';
    setTimeout(() => {
      label.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      label.style.opacity = '1';
      label.style.transform = 'translateY(0)';
    }, 600 + i * 100);
  });
  const cta = document.querySelector('.hero-cta');
  if (cta) {
    cta.style.opacity = '0';
    setTimeout(() => {
      cta.style.transition = 'opacity 0.8s ease';
      cta.style.opacity = '1';
    }, 1000);
  }
});


/* ===== SCROLL PROGRESS INDICATOR ===== */
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  progressBar.style.width = scrolled + '%';
});

/* ===== MAGNETIC BUTTONS ===== */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const h = rect.width / 2;
    const w = rect.height / 2;
    const x = e.clientX - rect.left - h;
    const y = e.clientY - rect.top - w;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0px, 0px)';
  });
});

/* ===== SPOTLIGHT EFFECT ===== */
document.querySelectorAll('.spotlight-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

/* ===== SAFE TEXT REVEAL LOGIC ===== */
document.querySelectorAll('.word-reveal').forEach(el => {
  // Only apply to plain text elements to avoid breaking HTML structures
  if (el.children.length === 0) {
    const words = el.innerText.split(' ');
    el.innerHTML = '';
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'text-word';
      span.innerText = word + ' ';
      span.style.transitionDelay = `${i * 0.05}s`;
      el.appendChild(span);
    });
  }
});
const wordObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.text-word').forEach(w => w.classList.add('visible'));
      wordObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.word-reveal').forEach(el => wordObserver.observe(el));

