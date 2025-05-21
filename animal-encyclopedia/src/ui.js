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
  } catch (err) {
    container.innerHTML = `<p class="error">Error: ${err.message}</p>`;
  } finally {
    loadBtn.disabled = false;
    loadBtn.textContent = 'Load More';
  }
}
