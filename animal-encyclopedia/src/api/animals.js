/*
 * This module exposes a single function, `fetchRandomAnimals`, which will
 * retrieve a list of animal objects. In production the function attempts
 * to call the API Ninjas animals endpoint if an API key has been defined
 * via the `VITE_API_NINJAS_KEY` environment variable. When the API is
 * unavailable or the key is missing the function falls back to a set of
 * hard‑coded animals defined below. Each animal includes an emoji and
 * a fun fact to make the UI more colourful.
 */

const BASE_URL = 'https://api.api-ninjas.com/v1/animals';

// A small set of animals with basic information used as a fallback when
// the external API cannot be queried. Feel free to add your own entries.
const SAMPLE_ANIMALS = [
  {
    name: 'Lion',
    emoji: '🦁',
    characteristics: {
      habitat: 'Savannah',
      diet: 'Carnivore'
    },
    fact: 'Lions live in prides and are known as the king of the jungle.'
  },
  {
    name: 'Elephant',
    emoji: '🐘',
    characteristics: {
      habitat: 'Savannah and forests',
      diet: 'Herbivore'
    },
    fact: 'Elephants use their trunks to drink and communicate.'
  },
  {
    name: 'Giraffe',
    emoji: '🦒',
    characteristics: {
      habitat: 'Savannah',
      diet: 'Herbivore'
    },
    fact: 'Giraffes have the same number of neck vertebrae as humans.'
  },
  {
    name: 'Penguin',
    emoji: '🐧',
    characteristics: {
      habitat: 'Antarctica',
      diet: 'Carnivore'
    },
    fact: 'Penguins can slide on their bellies across ice.'
  },
  {
    name: 'Kangaroo',
    emoji: '🦘',
    characteristics: {
      habitat: 'Australian Outback',
      diet: 'Herbivore'
    },
    fact: 'Kangaroos can jump up to three times their height.'
  },
  {
    name: 'Panda',
    emoji: '🐼',
    characteristics: {
      habitat: 'Bamboo forests',
      diet: 'Herbivore'
    },
    fact: 'Pandas spend most of their day eating bamboo.'
  },
  {
    name: 'Tiger',
    emoji: '🐯',
    characteristics: {
      habitat: 'Rainforests',
      diet: 'Carnivore'
    },
    fact: 'No two tigers have the same stripes.'
  },
  {
    name: 'Dolphin',
    emoji: '🐬',
    characteristics: {
      habitat: 'Oceans',
      diet: 'Carnivore'
    },
    fact: 'Dolphins are highly intelligent and communicate with clicks.'
  }
];

/**
 * Returns a random letter from the English alphabet. Used to generate
 * search queries when hitting the external API.
 */
function randomLetter() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  return letters[Math.floor(Math.random() * letters.length)];
}

/**
 * Returns a new array with up to `count` distinct entries randomly
 * selected from the provided array. If `count` exceeds the length of
 * the array, the returned array will contain all items in random order.
 *
 * @param {any[]} arr - the array to sample from
 * @param {number} count - how many items to select
 */
function sampleArray(arr, count) {
  const copy = arr.slice();
  const result = [];
  while (copy.length && result.length < count) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}

/**
 * Fetches a list of random animals.
 *
 * If a `VITE_API_NINJAS_KEY` environment variable is present and the
 * network request succeeds, the external API is used to fetch animals.
 * Otherwise the function will fall back to a predefined list of
 * animals. The returned array will always have at most `count` items.
 *
 * @param {number} count - how many animals to fetch
 * @returns {Promise<Object[]>}
 */
export async function fetchRandomAnimals(count = 5) {
  const apiKey = import.meta.env.VITE_API_NINJAS_KEY;
  if (apiKey) {
    try {
      let data = [];
      // Try up to 5 times to find animals from the API; sometimes a
      // random letter may not return results (empty array). When that
      // happens we simply try again with another letter. If after
      // several attempts the array remains empty we fall back.
      for (let i = 0; i < 5 && data.length === 0; i++) {
        const res = await fetch(`${BASE_URL}?name=${randomLetter()}`, {
          headers: { 'X-Api-Key': apiKey }
        });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        data = await res.json();
      }
      if (data.length) {
        return data.slice(0, count);
      }
    } catch (err) {
      console.warn('API request failed, falling back to sample animals:', err);
    }
  }
  // Fall back to our local sample data
  return sampleArray(SAMPLE_ANIMALS, count);
}
