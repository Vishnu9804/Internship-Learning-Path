const searchInput = document.getElementById("searchInput");
const movieGrid = document.getElementById("movieGrid");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const loading = document.getElementById("loading");

const movieModal = document.getElementById("movieModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalImg = document.getElementById("modalImg");

let allMovies = [];
let filteredMovies = [];
let currentPage = 1;
const itemsPerPage = 4;
let debounceTimer;

function init() {
    const storedData = localStorage.getItem("movieDatabase");
    if (storedData) {
        allMovies = JSON.parse(storedData);
    }

    const lastSearch = sessionStorage.getItem("lastSearchTerm");
    if (lastSearch) {
        searchInput.value = lastSearch;
        performSearch(lastSearch);
    } else {
        filteredMovies = [...allMovies];
        renderMovies();
    }
}

searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    sessionStorage.setItem("lastSearchTerm", searchTerm);

    movieGrid.innerHTML = "";
    loading.style.display = "block";

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        performSearch(searchTerm);
    }, 500);
});

// --- 3. SEARCH LOGIC ---
function performSearch(term) {
    loading.style.display = "none";
    
    if (term === "") {
        filteredMovies = [...allMovies];
    } else {
        filteredMovies = allMovies.filter(movie => 
            movie.title.toLowerCase().includes(term) || 
            movie.description.toLowerCase().includes(term)
        );
    }

    currentPage = 1; 
    renderMovies();
}

// --- 4. PAGINATION & RENDERING ---
function renderMovies() {
    movieGrid.innerHTML = "";

    if (filteredMovies.length === 0) {
        movieGrid.innerHTML = "<p style='grid-column: 1 / -1; text-align: center;'>No movies found. Add some in the Admin panel!</p>";
        updatePaginationButtons();
        return;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const moviesToDisplay = filteredMovies.slice(startIndex, endIndex);

    moviesToDisplay.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";
        card.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/300x400?text=No+Image'">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.description}</p>
            </div>
        `;
        
        // --- NEW: CLICK EVENT TO OPEN MODAL ---
        card.addEventListener("click", () => {
            openModal(movie);
        });

        movieGrid.appendChild(card);
    });

    updatePaginationButtons();
}

function updatePaginationButtons() {
    const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
    pageInfo.innerText = `Page ${currentPage} of ${totalPages || 1}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

// Pagination Event Listeners
prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderMovies();
    }
});

nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderMovies();
    }
});

// --- 5. MODAL LOGIC ---
function openModal(movie) {
    // Fill the modal with the specific movie's data
    modalTitle.innerText = movie.title;
    modalDesc.innerText = movie.description;
    modalImg.src = movie.image;
    
    // Show the modal
    movieModal.style.display = "flex";
}

// Close modal when clicking the "X"
closeModal.addEventListener("click", () => {
    movieModal.style.display = "none";
});

// Close modal when clicking outside of the box (on the dark background)
window.addEventListener("click", (e) => {
    if (e.target === movieModal) {
        movieModal.style.display = "none";
    }
});

// Run app
init();