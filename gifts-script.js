// Gift data - matches game.js
const gifts = [
  {
    id: 1,
    emoji: '📚',
    title: 'Knowledge & Growth',
    message: 'For all the research breakthroughs and continuous learning on your journey!',
    hint: 'A gift to expand your mind and feed your curiosity...'
  },
  {
    id: 2,
    emoji: '✈️',
    title: 'Adventures & Experiences',
    message: 'For creating beautiful memories beyond the campus walls!',
    hint: 'Something to make unforgettable journeys around the world...'
  },
  {
    id: 3,
    emoji: '💅',
    title: 'Self-Care & Wellness',
    message: 'For taking care of yourself and embracing your elegance!',
    hint: 'Something luxurious to pamper yourself with...'
  },
  {
    id: 4,
    emoji: '🎨',
    title: 'Creativity & Expression',
    message: 'For letting your beautiful spirit shine through your creations!',
    hint: 'Something to inspire your artistic side...'
  },
  {
    id: 5,
    emoji: '💎',
    title: 'Elegance & Style',
    message: 'For your timeless beauty and graceful personality!',
    hint: 'Something to accessorize your sophisticated taste...'
  },
  {
    id: 6,
    emoji: '🎵',
    title: 'Joy & Entertainment',
    message: 'For all the happiness you bring to everyone around you!',
    hint: 'Something to bring music and laughter to your days...'
  },
  {
    id: 7,
    emoji: '💝',
    title: 'Love & Friendship',
    message: 'For being an inspiration and true friend to all of us!',
    hint: 'Something as special as the bond we share with you...'
  }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  populateGifts();
  setupParticles();
});

// Populate gifts grid
function populateGifts() {
  const giftsGrid = document.getElementById('giftsGrid');
  giftsGrid.innerHTML = '';

  gifts.forEach((gift) => {
    const giftBox = document.createElement('div');
    giftBox.className = 'gift-box';
    
    giftBox.innerHTML = `
      <div class="gift-header">${gift.emoji}</div>
      <div class="gift-content">
        <div class="gift-number">Gift #${gift.id}</div>
        <h3 class="gift-title">${gift.title}</h3>
        <p class="gift-message">${gift.message}</p>
        <div class="gift-hint-box">
          <div class="gift-hint-label">💡 Hint</div>
          <p class="gift-hint-text">${gift.hint}</p>
        </div>
      </div>
    `;

    giftsGrid.appendChild(giftBox);
  });
}

// Setup floating particles
function setupParticles() {
  const particleLayer = document.querySelector('.floating-particles');
  const particleCount = 24;

  for (let index = 0; index < particleCount; index++) {
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
}
