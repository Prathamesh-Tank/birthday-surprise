// Gift data - 5 gifts
const gifts = [
  {
    id: 1,
    emoji: '🌹',
    title: 'Bouquet',
    message: 'A beautiful collection of fresh flowers to brighten your day!',
    hint: 'Nature\'s most colorful and fragrant gift...',
    color: 'red',
    photos: 3
  },
  {
    id: 2,
    emoji: '💐',
    title: 'Perfume',
    message: 'An elegant fragrance to match your graceful personality!',
    hint: 'Something that carries your essence wherever you go...',
    color: 'pink',
    photos: 3
  },
  {
    id: 3,
    emoji: '✨',
    title: 'Set of Necklace',
    message: 'Beautiful jewelry to complement your timeless elegance!',
    hint: 'Shimmering accessories that frame your beauty...',
    color: 'purple',
    photos: 3
  },
  {
    id: 4,
    emoji: '💎',
    title: 'Jewellery Organizer',
    message: 'A stylish way to organize and display your precious collection!',
    hint: 'A keeper for all your treasured pieces...',
    color: 'yellow',
    photos: 3
  },
  {
    id: 5,
    emoji: '💍',
    title: 'Bracelet',
    message: 'An exquisite bracelet to adorn your wrist with grace!',
    hint: 'A wearable reminder of our special friendship...',
    color: 'blue',
    photos: 3
  }
];

// DOM Elements
const welcomeScreen = document.getElementById('welcomeScreen');
const gameArena = document.getElementById('gameArena');
const startButton = document.getElementById('startButton');
const balloonsContainer = document.getElementById('balloonsContainer');
const revealPanel = document.getElementById('revealPanel');
const closeReveal = document.getElementById('closeReveal');
const completionModal = document.getElementById('completionModal');
const foundCount = document.getElementById('foundCount');
const particleCanvas = document.getElementById('particleCanvas');
const canvasCtx = particleCanvas.getContext('2d');

let poppedBalloons = new Set();
let particles = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupParticles();
  setupEventListeners();
});

// Setup listener for start button
function setupEventListeners() {
  startButton.addEventListener('click', () => {
    welcomeScreen.style.display = 'none';
    gameArena.style.display = 'block';
    createBalloons();
  });

  closeReveal.addEventListener('click', closeGiftCard);
  revealPanel.addEventListener('click', (e) => {
    if (e.target === revealPanel) closeGiftCard();
  });
}

// Create floating balloons
function createBalloons() {
  balloonsContainer.innerHTML = '';
  const colors = ['red', 'pink', 'purple', 'yellow', 'blue'];
  const memoryImages = ['memory-1.png', 'memory-2.png', 'memory-3.png', 'memory-4.png'];

  gifts.forEach((gift, index) => {
    const balloon = document.createElement('div');
    balloon.className = `balloon ${colors[index]}`;
    balloon.dataset.giftId = gift.id;
    
    // Cycle through available memory images
    const imageNum = index % 4;
    const imagePath = `assets/photos/${memoryImages[imageNum]}`;
    
    balloon.innerHTML = `
      <div class="balloon-body" style="background-image: url('${imagePath}'); background-size: cover; background-position: center;"></div>
      <div class="balloon-string"></div>
      <div class="balloon-number">${gift.id}</div>
    `;

    balloon.addEventListener('click', (e) => {
      e.stopPropagation();
      popBalloon(balloon, gift);
    });

    balloonsContainer.appendChild(balloon);
  });
}

// Pop balloon animation
function popBalloon(balloonEl, gift) {
  if (poppedBalloons.has(gift.id)) return;

  poppedBalloons.add(gift.id);
  balloonEl.classList.add('popping');

  // Create confetti
  createConfetti(balloonEl);

  // Play pop sound (optional - can add sound file)
  // new Audio('assets/sounds/pop.mp3').play().catch(() => {});

  // Update progress
  updateProgress();

  // Show gift card
  setTimeout(() => {
    showGiftCard(gift);
  }, 300);

  // Disable balloon
  balloonEl.style.pointerEvents = 'none';
  balloonEl.style.opacity = '0.5';
}

// Create confetti particles
function createConfetti(balloonEl) {
  const rect = balloonEl.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  // Particle system
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = Math.random() * 8 + 4 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = ['var(--purple)', 'var(--gold)', 'var(--lavender)', '#ff6b9d', '#4fa3ff'][
      Math.floor(Math.random() * 5)
    ];
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '50';
    particle.style.animation = `confetti ${1 + Math.random() * 1}s ease-out forwards`;
    particle.style.setProperty('--tx', Math.random() * 200 - 100);
    particle.style.setProperty('--ty', Math.random() * -300);

    // Custom keyframes animation
    particle.animate(
      [
        { transform: 'translate(0, 0)', opacity: 1 },
        { transform: `translate(${Math.random() * 200 - 100}px, ${-(Math.random() * 300)}px)`, opacity: 0 }
      ],
      {
        duration: 1000 + Math.random() * 1000,
        easing: 'ease-out'
      }
    ).onfinish = () => particle.remove();

    document.body.appendChild(particle);
  }
}

// Show gift card reveal
function showGiftCard(gift) {
  const header = document.getElementById('giftCardHeader');
  const title = document.getElementById('giftTitle');
  const photosContainer = document.getElementById('giftPhotos');
  const message = document.getElementById('giftMessage');
  const hint = document.getElementById('giftHint');

  header.innerHTML = gift.emoji;
  title.innerHTML = gift.title;

  // Create photo placeholders using available memory images
  photosContainer.innerHTML = '';
  for (let i = 1; i <= gift.photos; i++) {
    const photoDiv = document.createElement('div');
    photoDiv.className = 'gift-photo-item';
    // Cycle through available memory images (1-4)
    const imageNum = ((i - 1) % 4) + 1;
    photoDiv.innerHTML = `
      <img src="assets/photos/memory-${imageNum}.png" 
           alt="Memory ${i}" 
           loading="lazy"
           onerror="this.parentElement.innerHTML = '📷'" />
    `;
    photosContainer.appendChild(photoDiv);
  }

  message.innerHTML = `<p>"${gift.message}"</p>`;
  hint.innerHTML = `
    <h4>🎁 Gift Hint</h4>
    <p>${gift.hint}</p>
  `;

  revealPanel.classList.add('active');

  // Check if all gifts found
  if (poppedBalloons.size === gifts.length) {
    setTimeout(() => {
      revealPanel.classList.remove('active');
      showCompletion();
    }, 3000);
  }
}

// Close gift card
function closeGiftCard() {
  revealPanel.classList.remove('active');
}

// Update progress counter
function updateProgress() {
  foundCount.textContent = poppedBalloons.size;
}

// Show completion modal
function showCompletion() {
  completionModal.classList.add('active');
  
  // Burst of confetti across screen
  createCompletionConfetti();
}

// Celebrate with confetti burst
function createCompletionConfetti() {
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = window.innerWidth / 2 + 'px';
    particle.style.top = window.innerHeight / 2 + 'px';
    particle.style.width = Math.random() * 12 + 6 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = ['var(--purple)', 'var(--gold)', 'var(--lavender)', '#ff6b9d', '#4fa3ff', '#70c878'][
      Math.floor(Math.random() * 6)
    ];
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '104';

    const angle = (i / 50) * Math.PI * 2;
    const velocity = 5 + Math.random() * 10;
    const tx = Math.cos(angle) * velocity * 50;
    const ty = Math.sin(angle) * velocity * 50;

    particle.animate(
      [
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
      ],
      {
        duration: 2000 + Math.random() * 1000,
        easing: 'ease-out'
      }
    ).onfinish = () => particle.remove();

    document.body.appendChild(particle);
  }
}

// Setup floating particles (decorative)
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
