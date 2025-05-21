import { fetchRandomAnimals } from './api/animals.js';
import { createAnimalCard } from './components/AnimalCard.js';

const container = document.getElementById('animal-list');
const loadBtn   = document.getElementById('load-more');

async function loadAnimals() {
  try {
    loadBtn.disabled = true;
    loadBtn.textContent = 'Loading…';
    const animals = await fetchRandomAnimals(5);
    animals.forEach(a => container.appendChild(createAnimalCard(a)));
  } catch {
    container.insertAdjacentHTML(
      'beforeend',
      '<p class="error">Sorry, could not load animals.</p>'
    );
  } finally {
    loadBtn.disabled = false;
    loadBtn.textContent = 'Load More';
  }
}

export function init() {
  loadBtn.addEventListener('click', loadAnimals);
  window.addEventListener('DOMContentLoaded', loadAnimals);
}
