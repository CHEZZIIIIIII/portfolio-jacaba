/* =============================================
   Arvin Roy G. Jacaba — Portfolio Scripts
   ============================================= */

/* ─────────────────────────────────────────────
   SKILLS DATA
   Edit level (1–10) to change each skill bar.
   ───────────────────────────────────────────── */
const skills = [
  { name: 'HTML',             level: 8 },
  { name: 'CSS',              level: 7 },
  { name: 'JavaScript',       level: 6 },
  { name: 'PHP',              level: 7 },
  { name: 'C#',               level: 7 },
  { name: 'GDScript',         level: 6 },
  { name: 'Game Development', level: 8 },
  { name: 'Game Assets',      level: 9 },
  { name: 'UI / UX Design',   level: 7 },
];

function renderSkills() {
  const container = document.getElementById('skillBars');
  if (!container) return;
  container.innerHTML = skills.map(s => {
    const pct   = (s.level / 10) * 100;
    const label = `${s.level}/10`;
    return `
      <div class="skill-bar-item">
        <div class="skill-bar-header">
          <span class="skill-bar-name">${s.name}</span>
          <span class="skill-bar-val">${label}</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" data-pct="${pct}"></div>
        </div>
      </div>`;
  }).join('');
}

function animateBars() {
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    bar.style.width = bar.dataset.pct + '%';
  });
}

/* ─────────────────────────────────────────────
   CUSTOM CURSOR — dot + lagging ring + echo ripple on click
   ───────────────────────────────────────────── */
(function () {
  const dot  = document.getElementById('cur');
  const ring = document.getElementById('curRing');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  /* Move dot instantly, ring lags behind */
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  function animRing() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  /* Squeeze dot on mousedown, restore on mouseup */
  document.addEventListener('mousedown', () => {
    dot.style.transform  = 'translate(-50%, -50%) rotate(45deg) scale(0.6)';
    dot.style.background = 'var(--violet)';
  });
  document.addEventListener('mouseup', () => {
    dot.style.transform  = 'translate(-50%, -50%) rotate(45deg) scale(1)';
    dot.style.background = 'var(--pink)';
  });

  /* Spawn echo ripples on click */
  document.addEventListener('click', e => {
    spawnEcho(e.clientX, e.clientY, false);
    spawnEcho(e.clientX, e.clientY, true);
  });

  function spawnEcho(x, y, isSecond) {
    const el = document.createElement('div');
    el.className = 'cursor-echo' + (isSecond ? ' echo-2' : '');
    /* Size: base 24px, grows via CSS scale animation */
    el.style.cssText = `
      left: ${x}px;
      top:  ${y}px;
      width:  24px;
      height: 24px;
    `;
    document.body.appendChild(el);
    /* Remove after animation completes */
    el.addEventListener('animationend', () => el.remove());
  }

  /* Hover effect on interactive elements */
  const interactables = 'a, button, [onclick], input, textarea, .gallery-btn, .tab-btn, .add-card';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactables)) {
      dot.style.transform  = 'translate(-50%, -50%) rotate(45deg) scale(1.6)';
      dot.style.opacity    = '0.7';
      ring.style.borderColor = 'rgba(237,118,181,0.9)';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactables)) {
      dot.style.transform  = 'translate(-50%, -50%) scale(1)';
      dot.style.opacity    = '1';
      ring.style.borderColor = 'rgba(237,118,181,0.6)';
    }
  });
})();

/* ─────────────────────────────────────────────
   MOBILE MENU
   ───────────────────────────────────────────── */
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

/* ─────────────────────────────────────────────
   PROJECT TABS
   ───────────────────────────────────────────── */
function switchTab(tab, e) {
  document.querySelectorAll('.project-tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  e.target.classList.add('active');
}

/* ─────────────────────────────────────────────
   SCROLL ANIMATIONS + SKILL BAR TRIGGER
   ───────────────────────────────────────────── */
let barsAnimated = false;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
      if (!barsAnimated && entry.target.closest('#about')) {
        setTimeout(animateBars, 300);
        barsAnimated = true;
      }
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ─────────────────────────────────────────────
   CONTACT FORM → MAILTO
   Opens the user's default email client pre-filled
   and directed to arvinjacaba1590@gmail.com
   ───────────────────────────────────────────── */
function handleSubmit(e) {
  e.preventDefault();
  const name    = document.getElementById('senderName').value.trim();
  const email   = document.getElementById('senderEmail').value.trim();
  const subject = document.getElementById('msgSubject').value.trim();
  const body    = document.getElementById('msgBody').value.trim();
  const fullBody   = `From: ${name} <${email}>\n\n${body}`;
  const mailtoLink =
    `mailto:arvinjacaba1590@gmail.com` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(fullBody)}`;
  window.location.href = mailtoLink;
  const success = document.getElementById('formSuccess');
  if (success) success.style.display = 'block';
  document.getElementById('contactForm').reset();
}

/* ─────────────────────────────────────────────
   PHOTO GALLERY SLIDER
   Auto-advances every 7 seconds.
   Click arrows, dots, or swipe to navigate.
   ───────────────────────────────────────────── */
(function () {
  let currentSlide = 0;
  let autoTimer    = null;
  const INTERVAL   = 7000;

  function getSlides() { return document.querySelectorAll('.gallery-slide'); }
  function getDots()   { return document.querySelectorAll('.gallery-dot'); }

  function buildDots() {
    const dotsWrap = document.getElementById('galleryDots');
    if (!dotsWrap) return;
    const slides = getSlides();
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.className = 'gallery-dot' + (i === 0 ? ' active' : '');
      btn.setAttribute('aria-label', 'Photo ' + (i + 1));
      btn.addEventListener('click', () => { goTo(i); resetTimer(); });
      dotsWrap.appendChild(btn);
    });
  }

  function goTo(index) {
    const slides = getSlides();
    const dots   = getDots();
    if (!slides.length) return;
    slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function resetTimer() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(currentSlide + 1), INTERVAL);
  }

  window.galleryNext = function () { goTo(currentSlide + 1); resetTimer(); };
  window.galleryPrev = function () { goTo(currentSlide - 1); resetTimer(); };

  document.addEventListener('DOMContentLoaded', function () {
    buildDots();
    resetTimer();

    /* Touch / swipe */
    let touchStartX = 0;
    const gallery = document.querySelector('.home-gallery');
    if (gallery) {
      gallery.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
      gallery.addEventListener('touchend',   e => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 40) diff > 0 ? window.galleryNext() : window.galleryPrev();
      }, { passive: true });
    }
  });
})();

/* ─────────────────────────────────────────────
   INIT
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderSkills();
});