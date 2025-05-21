const BASE_URL = 'https://api.api-ninjas.com/v1/animals';

export async function fetchRandomAnimals(limit = 10) {
  const res = await fetch(`${BASE_URL}?limit=${limit}`, {
    headers: { 'X-Api-Key': import.meta.env.VITE_API_NINJAS_KEY }
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
