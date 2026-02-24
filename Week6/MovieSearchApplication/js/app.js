import { debounce, throttle } from './utils.js';
import { StorageHelpers } from './storage.js';
import { fetchShows } from './api.js';
import { showLoading, hideLoading, renderMovies, renderMessage, renderPagination, toggleBackToTop, renderWatchlistModal } from './ui.js';

let allResults = [];
let currentPage = 1;
const ITEMS_PER_PAGE = 8; 

const searchInput = document.getElementById('search-input');
const backToTopBtn = document.getElementById('back-to-top');
const modal = document.getElementById('watchlist-modal');
const openModalBtn = document.getElementById('view-watchlist-btn');
const closeModalBtn = document.getElementById('close-watchlist');

const handleSearch = async (query, page = 1) => {
  if (!query.trim()) {
    renderMessage("Start typing to search...");
    return;
  }

  showLoading();
  allResults = await fetchShows(query);
  hideLoading();

  if (allResults === null) {
    renderMessage("Error fetching data.");
    return;
  }

  if (allResults.length === 0) {
    renderMessage("No results found.");
    return;
  }

  currentPage = page;
  updateUI();
  StorageHelpers.saveSessionState(query, currentPage);
};

const updateUI = () => {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = allResults.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(allResults.length / ITEMS_PER_PAGE);

  renderMovies(paginatedItems, handleToggleWatchlist);
  
  renderPagination(currentPage, totalPages, (newPage) => {
    currentPage = newPage;
    updateUI();
    StorageHelpers.saveSessionState(searchInput.value, currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

const handleToggleWatchlist = (movie, btnElement) => {
  const watchlist = StorageHelpers.getWatchlist();
  const exists = watchlist.some(m => m.id === movie.id);

  if (exists) {
    StorageHelpers.removeFromWatchlist(movie.id);
    btnElement.innerText = 'Add to Watchlist';
    btnElement.classList.remove('active');
  } else {
    StorageHelpers.addToWatchlist(movie);
    btnElement.innerText = 'Remove';
    btnElement.classList.add('active');
  }
};

const handleRemoveFromModal = (id) => {
  StorageHelpers.removeFromWatchlist(id);
  renderWatchlistModal(handleRemoveFromModal);
  updateUI(); 
};

const debouncedSearch = debounce((event) => {
  handleSearch(event.target.value, 1);
}, 500);
searchInput.addEventListener('input', debouncedSearch);

const throttledScroll = throttle(() => {
  toggleBackToTop(window.scrollY > 300);
}, 300);
window.addEventListener('scroll', throttledScroll);

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

openModalBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
  renderWatchlistModal(handleRemoveFromModal);
});

closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

const init = () => {
  const { query, page } = StorageHelpers.getSessionState();
  if (query) {
    searchInput.value = query;
    handleSearch(query, page);
  } else {
    renderMessage("Search for a famous movie to begin.");
  }
};

init();