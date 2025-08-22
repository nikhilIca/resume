winow.addEventListener('DOMContentLoaded', function () {
  // AOS
  if (window.AOS) AOS.init({ once:true, duration:900, offset:110, easing:'ease-out' });
  // Current year
  document.getElementById('year').textContent = new Date().getFullYear();
  // Theme toggle with persistence
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  function setTheme(mode){
    root.setAttribute('data-bs-theme', mode);
    localStorage.setItem('color-mode', mode);
    btn.innerHTML = (mode === 'dark') ? '<i class="bi bi-brightness-high"></i>' : '<i class="bi bi-moon-stars"></i>';
  }
  setTheme(localStorage.getItem('color-mode') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  btn.addEventListener('click', ()=> setTheme(root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark'));
  // Navbar shrink on scroll
  const nav = document.querySelector('.navbar');
  const onScrollNav = () => {
    if (window.scrollY > 10) nav.classList.add('shrink'); else nav.classList.remove('shrink');
  };
  onScrollNav(); window.addEventListener('scroll', onScrollNav);
  // Scroll-to-top
  const toTop = document.getElementById('toTop');
  const onScrollTop = () => { (window.scrollY > 300) ? toTop.classList.add('show') : toTop.classList.remove('show'); };
  window.addEventListener('scroll', onScrollTop);
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  // Animated counters when visible
  const counters = document.querySelectorAll('.counter');
  const counterObs = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.getAttribute('data-target') || 0;
      const step = Math.max(1, Math.round(target / 80));
      let val = 0;
      const tick = () => {
        val += step;
        if (val >= target) { el.textContent = target; return; }
        el.textContent = val; requestAnimationFrame(tick);
      };
      tick();
      obs.unobserve(el);
    });
  }, { threshold: .35 });
  counters.forEach(c => counterObs.observe(c));
  // Animate skill bars on reveal
  const bars = document.querySelectorAll('.progress-bar');
  const barObs = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      const value = bar.getAttribute('data-value') || '0';
      bar.style.transition = 'width 1.2s ease';
      requestAnimationFrame(()=> bar.style.width = value + '%');
      obs.unobserve(bar);
    });
  }, { threshold:.4 });
  bars.forEach(b => barObs.observe(b));
  // Parallax hero background (mobile-safe: transforms instead of background-attachment)
  const heroBg = document.querySelector('.hero-bg');
  let ticking = false;
  function parallax(){
    const y = window.scrollY * 0.25; // parallax strength
    heroBg.style.transform = `translate3d(0, ${y}px, 0)`;
    ticking = false;
  }
  window.addEventListener('scroll', ()=>{
    if (!ticking){ window.requestAnimationFrame(parallax); ticking = true; }
  });
  parallax();
});