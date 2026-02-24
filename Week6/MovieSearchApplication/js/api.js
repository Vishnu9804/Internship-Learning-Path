import { ENV } from '../env.js'; // Import your key

// Use the key from your environment file
const BASE_URL = `https://www.omdbapi.com/?apikey=${ENV.OMDB_API_KEY}&type=movie&s=`;

export const fetchShows = async (query) => {
  if (!query) return [];
  
  try {
    const response = await fetch(`${BASE_URL}${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Network issue');
    
    const data = await response.json();
    
    if (data.Response === "False") {
      return []; 
    }
    
    return data.Search.map(item => {
      return {
        id: item.imdbID,
        title: item.Title,
        image: item.Poster !== "N/A" ? item.Poster : 'https://via.placeholder.com/300x450?text=No+Poster',
        genre: item.Type.charAt(0).toUpperCase() + item.Type.slice(1), 
        year: item.Year
      };
    });
  } catch (error) {
    console.error("API fetch failed:", error);
    return null; 
  }
};