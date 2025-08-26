import { fetchRandomAnimals } from './api/animals.js';
import { createAnimalCard } from './components/AnimalCard.js';

const container = document.getElementById('animal-list');
const loadBtn = document.getElementById('load-more');

export function init() {
  loadBtn.addEventListener('click', loadAnimals);
  window.addEventListener('DOMContentLoaded', loadAnimals);
}

async function loadAnimals() {
  loadBtn.disabled = true;
  loadBtn.textContent = 'Loading…';
  try {
    const animals = await fetchRandomAnimals(5);
    container.innerHTML = '';
    animals.forEach(a => container.appendChild(createAnimalCard(a)));
    // After rendering the animals trigger a confetti burst to celebrate
    launchConfetti();
  } catch (err) {
    container.innerHTML = `<p class="error">Error: ${err.message}</p>`;
  } finally {
    loadBtn.disabled = false;
    loadBtn.textContent = 'Load More';
  }
}

/**
 * Creates a transient confetti effect by spawning multiple coloured
 * pieces that fall from the top of the viewport. This function is
 * intentionally playful to give the application some extra energy.
 */
function launchConfetti() {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  const colours = ['#ff6b6b', '#6bcaff', '#6bffb0', '#fdff6b', '#d36bff', '#ff6bd1', '#6b84ff', '#ffa46b'];
  const pieceCount = 30;
  for (let i = 0; i < pieceCount; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.backgroundColor = colours[Math.floor(Math.random() * colours.length)];
    piece.style.left = `${Math.random() * 100}vw`;
    // vary the animation duration and delay for a more natural effect
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    piece.style.animationDuration = `${2.5 + Math.random() * 1.5}s`;
    container.appendChild(piece);
  }
  document.body.appendChild(container);
  // Clean up confetti after 4 seconds
  setTimeout(() => {
    container.remove();
  }, 4000);
}
