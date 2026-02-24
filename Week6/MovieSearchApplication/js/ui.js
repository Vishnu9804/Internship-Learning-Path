import { StorageHelpers } from './storage.js';

const grid = document.getElementById('movie-grid');
const paginationContainer = document.getElementById('pagination');
const loadingSpinner = document.getElementById('loading');
const backToTopBtn = document.getElementById('back-to-top');
const watchlistContainer = document.getElementById('watchlist-items');

export const showLoading = () => {
  grid.innerHTML = '';
  paginationContainer.innerHTML = '';
  loadingSpinner.style.display = 'block';
};

export const hideLoading = () => {
  loadingSpinner.style.display = 'none';
};

export const renderMessage = (message) => {
  grid.innerHTML = `<div class="empty-state"><h2>${message}</h2></div>`;
};

export const renderMovies = (movies, onToggleWatchlist) => {
  grid.innerHTML = '';
  const watchlist = StorageHelpers.getWatchlist();

  movies.forEach(movie => {
    const isFavorited = watchlist.some(m => m.id === movie.id);
    
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}" loading="lazy" />
      <div class="card-content">
        <h3>${movie.title} (${movie.year})</h3>
        <p style="color: #aaa; margin-bottom: 15px; font-size: 0.9rem;">🎬 ${movie.genre}</p>
        <button class="watchlist-btn ${isFavorited ? 'active' : ''}">
          ${isFavorited ? 'Remove' : 'Add to Watchlist'}
        </button>
      </div>
    `;

    const btn = card.querySelector('.watchlist-btn');
    btn.addEventListener('click', () => onToggleWatchlist(movie, btn));

    grid.appendChild(card);
  });
};

export const renderPagination = (currentPage, totalPages, onPageChange) => {
  paginationContainer.innerHTML = '';
  if (totalPages <= 1) return;

  const prevBtn = document.createElement('button');
  prevBtn.innerText = 'Prev';
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener('click', () => onPageChange(currentPage - 1));

  const pageInfo = document.createElement('span');
  pageInfo.innerText = ` Page ${currentPage} of ${totalPages} `;

  const nextBtn = document.createElement('button');
  nextBtn.innerText = 'Next';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener('click', () => onPageChange(currentPage + 1));

  paginationContainer.append(prevBtn, pageInfo, nextBtn);
};

export const toggleBackToTop = (show) => {
  if (show) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
};

export const renderWatchlistModal = (onRemove) => {
  const watchlist = StorageHelpers.getWatchlist();
  watchlistContainer.innerHTML = '';

  if (watchlist.length === 0) {
    watchlistContainer.innerHTML = '<p style="color: #aaa; text-align: center;">Your watchlist is empty.</p>';
    return;
  }

  watchlist.forEach(movie => {
    const item = document.createElement('div');
    item.className = 'watch-item';
    item.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}" />
      <div>
        <h4>${movie.title} (${movie.year})</h4>
        <p style="font-size: 0.9rem; color: #aaa;">🎬 ${movie.genre}</p>
      </div>
      <button class="remove-sm-btn">X</button>
    `;

    const removeBtn = item.querySelector('.remove-sm-btn');
    removeBtn.addEventListener('click', () => onRemove(movie.id));

    watchlistContainer.appendChild(item);
  });
};