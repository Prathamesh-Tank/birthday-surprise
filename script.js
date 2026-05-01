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

/* ===== PREMIUM MOTION ANIMATIONS JS ===== */

// 1. CAROUSEL ANIMATION
const carouselTrack = document.getElementById('carouselTrack');
const carouselDots = document.querySelectorAll('.carousel-dot');
let currentSlide = 0;

const updateCarousel = () => {
  const offset = -currentSlide * 100;
  carouselTrack.style.transform = `translateX(${offset}%)`;
  carouselTrack.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
  
  carouselDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
};

carouselDots.forEach(dot => {
  dot.addEventListener('click', () => {
    currentSlide = parseInt(dot.dataset.index);
    updateCarousel();
  });
});

// Auto-rotate carousel every 6 seconds
setInterval(() => {
  currentSlide = (currentSlide + 1) % 3;
  updateCarousel();
}, 6000);

// 2. PARALLAX SCROLL EFFECT
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.parallax-image img');
  
  parallaxElements.forEach(el => {
    const yPos = scrolled * 0.5;
    el.style.transform = `translateY(${yPos}px)`;
  });
});

// 3. BLUR-IN ON SCROLL
const observerBlur = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('blur-in');
      observerBlur.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.blur-in-trigger').forEach(el => {
  observerBlur.observe(el);
});

// 4. TEXT LETTER-BY-LETTER ANIMATION
const animateTextLetters = (element) => {
  const text = element.textContent;
  element.textContent = '';
  
  Array.from(text).forEach((letter, index) => {
    const span = document.createElement('span');
    span.textContent = letter;
    span.className = 'letter-animate';
    span.style.animationDelay = `${index * 0.05}s`;
    element.appendChild(span);
  });
};

// Apply letter animation to h1 on page load
const h1Element = document.querySelector('h1');
if (h1Element && window.location.hash === '' || window.location.hash === '#home') {
  setTimeout(() => {
    const originalText = h1Element.textContent;
    h1Element.textContent = '';
    
    Array.from(originalText).forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.className = 'letter-animate';
      span.style.animationDelay = `${index * 0.05}s`;
      h1Element.appendChild(span);
    });
  }, 300);
}

// 5. CONFETTI BURST EFFECT
const createConfetti = (x, y, count = 50) => {
  const confettiColors = [
    'rgba(212, 175, 55, 0.8)',  // Gold
    'rgba(125, 91, 166, 0.8)',  // Purple
    'rgba(248, 217, 196, 0.8)', // Peach
    'rgba(189, 167, 212, 0.8)', // Lavender
  ];

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    const size = Math.random() * 8 + 6;
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';
    confetti.style.left = (x || window.innerWidth / 2) + 'px';
    confetti.style.top = (y || window.innerHeight / 2) + 'px';
    confetti.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    
    const angle = (Math.PI * 2 * i) / count;
    const velocity = Math.random() * 8 + 4;
    const tx = Math.cos(angle) * velocity * 100;
    const ty = Math.sin(angle) * velocity * 100;
    
    const duration = Math.random() * 3 + 2;
    confetti.style.setProperty('--tx', tx);
    confetti.style.setProperty('--ty', ty);
    confetti.style.animationDuration = duration + 's';
    confetti.style.animationDelay = (Math.random() * 0.1) + 's';
    
    // Add keyframe dynamically
    if (!document.getElementById('confetti-keyframes')) {
      const style = document.createElement('style');
      style.id = 'confetti-keyframes';
      style.textContent = `
        @keyframes confetti-custom {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx, 0), var(--ty, 0)) rotate(720deg);
            opacity: 0;
          }
        }
        .confetti { animation: confetti-custom 1s ease-out forwards; }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), duration * 1000);
  }
};

// Trigger confetti when reaching wishes section
const wishSection = document.getElementById('wishes');
if (wishSection) {
  const observerConfetti = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.confettiShown) {
        entry.target.dataset.confettiShown = 'true';
        createConfetti(window.innerWidth / 2, 200, 60);
      }
    });
  }, { threshold: 0.5 });
  
  observerConfetti.observe(wishSection);
}

// 6. GLOW PULSE ON HOVER
document.querySelectorAll('.gold-pulse').forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.style.animationPlayState = 'running';
  });
  el.addEventListener('mouseleave', () => {
    el.style.animationPlayState = 'paused';
  });
});

// 7. DYNAMIC PARALLAX WITH MOUSE MOVE
document.addEventListener('mousemove', (e) => {
  const parallaxElements = document.querySelectorAll('.portrait-orb');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  parallaxElements.forEach((el, index) => {
    const depth = (index + 1) * 20;
    const moveX = (x - 0.5) * depth;
    const moveY = (y - 0.5) * depth;
    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});