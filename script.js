const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * .12;
  ry += (my - ry) * .12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a,button,.project-card,.stat-box,.skill-group,.cert-item,.resume-box').forEach(el => {
  el.addEventListener('mouseenter', () => { ring.style.width = '46px'; ring.style.height = '46px'; ring.style.opacity = '.8'; });
  el.addEventListener('mouseleave', () => { ring.style.width = '30px'; ring.style.height = '30px'; ring.style.opacity = '.45'; });
});

const obs = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
}), { threshold: .08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
document.querySelectorAll('.projects-grid .reveal,.skills-grid .reveal,.certs-list .reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * .07 + 's';
});

function openVideo(btn, src) {
  const container = btn.closest('.project-card').querySelector('.project-video');

  if (src.includes('drive.google.com')) {
    const match = src.match(/\/d\/([a-zA-Z0-9_-]+)/);
    const id = match ? match[1] : src;
    container.innerHTML = `<iframe src="https://drive.google.com/file/d/${id}/preview" allow="autoplay" allowfullscreen></iframe>`;

  } else if (src.includes('youtube.com') || src.includes('youtu.be') || src.length === 11) {
    let id = src;
    if (src.includes('v='))        id = src.split('v=')[1].split('&')[0];
    else if (src.includes('youtu.be/')) id = src.split('youtu.be/')[1];
    container.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" allow="autoplay;encrypted-media" allowfullscreen></iframe>`;

  } else {
    container.innerHTML = `<video src="${src}" controls autoplay style="width:100%;height:100%;object-fit:cover;"></video>`;
  }
}

function downloadResume() {
  const b64 = '==';
  const bytes = atob(b64);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  const blob = new Blob([arr], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'Gustavo_Chimello_Curriculo.docx';
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1000);
}

const secs  = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let c = '';
  secs.forEach(s => { if (window.scrollY >= s.offsetTop - 130) c = s.id; });
  navAs.forEach(a => { a.style.color = a.getAttribute('href') === '#' + c ? 'var(--cyan)' : ''; });
});