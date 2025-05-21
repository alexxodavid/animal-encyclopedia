const BASE_URL = 'https://api.api-ninjas.com/v1/animals';

function randomLetter() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  return letters[Math.floor(Math.random() * letters.length)];
}

export async function fetchRandomAnimals(count = 5) {
  let data = [];
  for (let i = 0; i < 5 && data.length === 0; i++) {
    const res = await fetch(`${BASE_URL}?name=${randomLetter()}`, {
      headers: { 'X-Api-Key': import.meta.env.VITE_API_NINJAS_KEY }
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    data = await res.json();
  }
  if (!data.length) throw new Error('No animals returned.');
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
  return data.slice(0, count);
}