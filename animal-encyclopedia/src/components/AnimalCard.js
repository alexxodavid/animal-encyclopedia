export function createAnimalCard(animal) {
  /*
   * Create a single animal card element. Each card displays an
   * image, the animal name, habitat, diet and an optional fun fact.
   * To add a bit of "crazy" personality to the project every card is
   * assigned a random pastel background colour and the border colour
   * is synchronised to match. Where available the animal emoji and
   * fun fact are also rendered.
   */
  const imgSrc = `https://source.unsplash.com/featured/240x160/?${encodeURIComponent(animal.name)}`;
  const habitat = animal.characteristics?.habitat || 'Unknown';
  const diet = animal.characteristics?.diet || 'Unknown';
  const fact = animal.fact || '';
  const emoji = animal.emoji || '🐾';

  // Choose a random pastel colour to give each card a unique look
  const pastelPalette = ['#ffe4e1', '#e6f7ff', '#eafaf1', '#fff8e7', '#f3e5f5', '#e8eaf6', '#e7f5fe', '#f9e6ff'];
  const bgColour = pastelPalette[Math.floor(Math.random() * pastelPalette.length)];

  const card = document.createElement('div');
  card.className = 'animal-card';
  // Inline styles allow each card to have a different colour without extra classes
  card.style.background = bgColour;
  card.style.borderColor = bgColour;

  card.innerHTML = `
    <div class="animal-card__emoji" aria-hidden="true">${emoji}</div>
    <img src="${imgSrc}" class="animal-card__img"/>
    <div class="animal-card__info">
      <h3 class="animal-card__name">${animal.name}</h3>
      <p><strong>Habitat:</strong> ${habitat}</p>
      <p><strong>Diet:</strong> ${diet}</p>
      ${fact ? `<p class="animal-card__fact"><em>${fact}</em></p>` : ''}
    </div>`;
  return card;
}
