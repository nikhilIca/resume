// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for same-page nav (basic: modern browsers handle it via CSS; this is a little JS polish)
document.querySelectorAll('a.nav-link[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Light/Dark mode toggle using Bootstrap's color modes
const root = document.documentElement;
const themeToggleBtn = document.getElementById('themeToggle');

function setTheme(mode) {
  root.setAttribute('data-bs-theme', mode);
  localStorage.setItem('color-mode', mode);
  themeToggleBtn.innerHTML = (mode === 'dark')
    ? '<i class="bi bi-brightness-high"></i>'
    : '<i class="bi bi-moon-stars"></i>';
}

const saved = localStorage.getItem('color-mode');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(saved || (prefersDark ? 'dark' : 'light'));

themeToggleBtn.addEventListener('click', () => {
  const current = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
  setTheme(current);
});
