/* =============================================
   Arvin Roy G. Jacaba — Portfolio Scripts
   ============================================= */

/* ─────────────────────────────────────────────
   SKILLS DATA
   Edit level (1–5) to change each skill bar.
   ───────────────────────────────────────────── */
const skills = [
  { name: 'HTML',             level: 4 },
  { name: 'CSS',              level: 4 },
  { name: 'JavaScript',       level: 3 },
  { name: 'PHP',              level: 3 },
  { name: 'C#',               level: 3 },
  { name: 'GDScript',         level: 3 },
  { name: 'Game Development', level: 3 },
  { name: 'UI / UX Design',   level: 4 },
];

function renderSkills() {
  const container = document.getElementById('skillBars');
  if (!container) return;

  container.innerHTML = skills.map(s => {
    const pct   = (s.level / 5) * 100;
    const label = `${s.level}/5`;
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
   CUSTOM CURSOR
   ───────────────────────────────────────────── */
const cur  = document.getElementById('cur');
const ring = document.getElementById('curRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  if (cur) {
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  }
});

function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  if (ring) {
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
  }
  requestAnimationFrame(animRing);
}

animRing();

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

      // Animate skill bars when the About section comes into view
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
   Opens the user's default email client (Gmail,
   Outlook, etc.) pre-filled with their message,
   directed to arvinjacaba1590@gmail.com
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
   INIT — runs after DOM is ready
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderSkills();
});