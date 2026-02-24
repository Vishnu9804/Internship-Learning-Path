export const StorageHelpers = {
  getWatchlist: () => {
    const data = localStorage.getItem('my_watchlist');
    return data ? JSON.parse(data) : [];
  },
  
  addToWatchlist: (movie) => {
    const list = StorageHelpers.getWatchlist();
    if (!list.find(m => m.id === movie.id)) {
      list.push(movie);
      localStorage.setItem('my_watchlist', JSON.stringify(list));
    }
  },

  removeFromWatchlist: (id) => {
    const list = StorageHelpers.getWatchlist();
    const newList = list.filter(m => m.id !== id);
    localStorage.setItem('my_watchlist', JSON.stringify(newList));
  },

  saveSessionState: (query, page) => {
    sessionStorage.setItem('last_search', query);
    sessionStorage.setItem('last_page', page);
  },

  getSessionState: () => {
    return {
      query: sessionStorage.getItem('last_search') || '',
      page: parseInt(sessionStorage.getItem('last_page')) || 1
    };
  }
};