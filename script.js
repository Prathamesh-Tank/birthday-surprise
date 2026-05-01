const particleLayer = document.querySelector('.floating-particles');
const reveals = document.querySelectorAll('.reveal');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxFallback = document.getElementById('lightboxFallback');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCaption = document.getElementById('lightboxCaption');
const musicToggle = document.getElementById('musicToggle');

const imageExists = (path) => new Promise((resolve) => {
  const image = new Image();
  image.onload = () => resolve(true);
  image.onerror = () => resolve(false);
  image.src = path;
});

const setMedia = async (path, imageEl, fallbackEl, fallbackText) => {
  if (!path) {
    imageEl.hidden = true;
    fallbackEl.hidden = false;
    fallbackEl.textContent = fallbackText;
    return;
  }

  const exists = await imageExists(path);
  if (exists) {
    imageEl.src = path;
    imageEl.hidden = false;
    fallbackEl.hidden = true;
  } else {
    imageEl.hidden = true;
    fallbackEl.hidden = false;
    fallbackEl.textContent = fallbackText;
  }
};

document.querySelectorAll('[data-image]').forEach((element) => {
  const path = element.dataset.image;
  const fallbackText = element.querySelector('.portrait-placeholder')?.textContent?.trim() || 'R';
  const image = document.createElement('img');
  image.alt = '';
  image.loading = 'lazy';
  image.hidden = true;
  element.prepend(image);
  setMedia(path, image, element.querySelector('.portrait-placeholder'), fallbackText);
});

const particleCount = 24;
for (let index = 0; index < particleCount; index += 1) {
  const particle = document.createElement('span');
  particle.className = 'particle';
  const size = `${Math.random() * 6 + 3}px`;
  const left = `${Math.random() * 100}%`;
  const duration = `${Math.random() * 12 + 10}s`;
  const drift = `${Math.random() * 80 - 40}px`;
  const delay = `${Math.random() * 12}s`;
  particle.style.setProperty('--size', size);
  particle.style.setProperty('--left', left);
  particle.style.setProperty('--duration', duration);
  particle.style.setProperty('--drift', drift);
  particle.style.animationDelay = delay;
  particleLayer.appendChild(particle);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

reveals.forEach((element) => observer.observe(element));

galleryItems.forEach((item) => {
  item.addEventListener('click', async () => {
    const path = item.dataset.full;
    const title = item.dataset.title || 'Memory';
    const caption = item.dataset.caption || '';
    lightboxTitle.textContent = title;
    lightboxCaption.textContent = caption;

    const exists = await imageExists(path);
    if (exists) {
      lightboxImage.src = path;
      lightboxImage.hidden = false;
      lightboxFallback.hidden = true;
    } else {
      lightboxImage.hidden = true;
      lightboxFallback.hidden = false;
      lightboxFallback.textContent = 'R';
    }

    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

const closeLightbox = () => {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
};

lightbox.addEventListener('click', (event) => {
  if (event.target.matches('[data-close]')) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLightbox();
  }
});

let musicEnabled = false;
musicToggle.addEventListener('click', () => {
  musicEnabled = !musicEnabled;
  musicToggle.textContent = musicEnabled ? 'Music Ready' : 'Music Off';
});