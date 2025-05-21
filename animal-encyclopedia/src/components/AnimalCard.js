export function createAnimalCard(animal) {
  const imgSrc = `https://source.unsplash.com/featured/240x160/?${encodeURIComponent(animal.name)}`;
  const habitat = animal.characteristics?.habitat || 'Unknown';
  const diet = animal.characteristics?.diet || 'Unknown';

  const card = document.createElement('div');
  card.className = 'animal-card';
  card.innerHTML = `
    <img src="${imgSrc}" class="animal-card__img"/>
    <div class="animal-card__info">
      <h3 class="animal-card__name">${animal.name}</h3>
      <p><strong>Habitat:</strong> ${habitat}</p>
      <p><strong>Diet:</strong> ${diet}</p>
    </div>`;
  return card;
}
