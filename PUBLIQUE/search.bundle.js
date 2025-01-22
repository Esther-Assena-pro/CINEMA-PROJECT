document.addEventListener('DOMContentLoaded', () => {
    console.log('search.bundle.js loaded');

    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const loadMoreButton = document.getElementById('load-more-button');
    let currentPage = 1;
    let currentQuery = '';
    let isSearching = false;
    let searchTimeout;

    // Clear the search input when the page loads
    searchInput.value = '';

    // Restore search state from localStorage
    const savedQuery = localStorage.getItem('currentQuery');
    const savedPage = localStorage.getItem('currentPage');
    const savedResults = localStorage.getItem('searchResults');
    if (savedQuery && savedPage && savedResults) {
        currentQuery = savedQuery;
        currentPage = parseInt(savedPage, 10);
        searchResults.innerHTML = savedResults;
        searchInput.value = currentQuery;
    }

    window.addEventListener('beforeunload', (event) => {
        if (isSearching) {
            event.preventDefault();
            event.returnValue = '';
        }
    });

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // enpeche le rechargement de la page
        if (isSearching) return;
        isSearching = true;
        toggleSearchState(true);
        currentQuery = searchInput.value;
        currentPage = 1;
        const movies = await searchMovies(currentQuery, currentPage);
        displayMovies(movies, false);
        isSearching = false;
        toggleSearchState(false);
    });

    searchInput.addEventListener('input', () => {
        if (isSearching) return;
        currentQuery = searchInput.value;
        if (currentQuery.length > 0 ) {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(async () => {
                isSearching = true;
                toggleSearchState(true);
                currentPage = 1;
                const movies = await searchMovies(currentQuery, currentPage);
                displayMovies(movies, false);
                isSearching = false;
                toggleSearchState(false);
            }, 0); // evite de faire une requete a chaque lettre tapée et donne plus de temps pour taper et faire une recherche et de contexte pour la recherche
        }
    });

    loadMoreButton.addEventListener('click', async () => {
        if (isSearching) return;
        isSearching = true;
        toggleSearchState(true);
        currentPage++;
        const movies = await searchMovies(currentQuery, currentPage);
        displayMovies(movies, true);
        isSearching = false;
        toggleSearchState(false);
    });

    async function searchMovies(query, page) {
        const response = await fetch(`https://www.omdbapi.com/?apikey=aff6b636&s=${query}&page=${page}`);
        const data = await response.json();
        return data.Search ? data.Search : []; // Get the search results
    }

    function displayMovies(movies, append = false) {
        if (!append) {
            searchResults.innerHTML = '';
        }
        if (movies.length > 0) {
            const fragment = document.createDocumentFragment();
            movies.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.className = 'movie-card';
                movieElement.innerHTML = `
                    <h3>${movie.Title}</h3>
                    <p>${movie.Year}</p>
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <button onclick="window.location.href='movie.html?id=${movie.imdbID}'">Voir les détails</button>
                `;
                fragment.appendChild(movieElement);
            });
            searchResults.appendChild(fragment);
        } else if (!append) {
            searchResults.innerHTML = '<p>Aucun film trouvé.</p>';
        }
        // Save search state to localStorage
        localStorage.setItem('currentQuery', currentQuery);
        localStorage.setItem('currentPage', currentPage);
        localStorage.setItem('searchResults', searchResults.innerHTML);
    }

    function toggleSearchState(isSearching) {
        searchInput.disabled = isSearching;
        loadMoreButton.disabled = isSearching;
    }
});