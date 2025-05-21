export function createAnimalCard(animal) {
    const card = document.createElement('div');
    card.className = 'animal-card';
    card.innerHTML = `<img src="${animal.image_link||'https://via.placeholder.com/150'}"
      alt="${animal.name}" class="animal-card__img"/>
      <div class="animal-card__info">
        <h3 class="animal-card__name">${animal.name}</h3>
        <p><strong>Habitat:</strong> ${animal.habitat}</p>
        <p><strong>Diet:</strong> ${animal.diet}</p>
      </div>`;
    return card;
  }
  