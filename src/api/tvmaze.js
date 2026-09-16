const BASE_URL = 'https://api.tvmaze.com';

export async function fetchAllShows() {
  const response = await fetch(`${BASE_URL}/shows`);
  if (!response.ok) {
    throw new Error('Failed to fetch shows');
  }
  const data = await response.json();
  return data.map(formatShowData);
}

export async function searchShows(query) {
  if (!query || !query.trim()) return [];
  const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('Failed to search shows');
  }
  const data = await response.json();
  return data.map((item) => formatShowData(item.show));
}

function formatShowData(show) {
  return {
    id: show.id,
    name: show.name || 'Untitled',
    image: show.image?.original || show.image?.medium || null,
    imageMedium: show.image?.medium || null,
    rating: show.rating?.average || null,
    premiered: show.premiered || null,
    year: show.premiered ? new Date(show.premiered).getFullYear() : null,
    summary: show.summary || '',
    genres: show.genres || [],
    language: show.language || 'Unknown',
    status: show.status || 'Unknown',
    network: show.network?.name || show.webChannel?.name || 'Unknown',
    runtime: show.runtime || null,
    officialSite: show.officialSite || null,
  };
}
