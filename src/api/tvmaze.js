const BASE_URL = 'https://api.tvmaze.com';

/**
 * Fetch all TV shows
 */
export async function fetchAllShows() {
  const response = await fetch(`${BASE_URL}/shows`);
  if (!response.ok) {
    throw new Error('Failed to fetch shows');
  }
  const data = await response.json();
  return data.map(normalizeShow);
}

/**
 * Search shows by query
 */
export async function searchShows(query) {
  if (!query || query.trim() === '') return [];
  const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('Failed to search shows');
  }
  const data = await response.json();
  return data.map((item) => normalizeShow(item.show));
}

/**
 * Fetch a single show by ID
 */
export async function getShowDetails(id) {
  const response = await fetch(`${BASE_URL}/shows/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch show details');
  }
  const data = await response.json();
  return normalizeShow(data);
}

/**
 * Normalize show data with fallback values
 */
function normalizeShow(show) {
  return {
    id: show.id,
    name: show.name || 'Untitled',
    image: show.image?.original || show.image?.medium || null,
    imageMedium: show.image?.medium || null,
    rating: show.rating?.average || null,
    premiered: show.premiered || null,
    year: show.premiered ? new Date(show.premiered).getFullYear() : null,
    summary: show.summary || '<p>No description available.</p>',
    genres: show.genres || [],
    language: show.language || 'Unknown',
    status: show.status || 'Unknown',
    network: show.network?.name || show.webChannel?.name || 'Unknown',
    runtime: show.runtime || null,
    officialSite: show.officialSite || null,
    url: show.url || null,
  };
}

