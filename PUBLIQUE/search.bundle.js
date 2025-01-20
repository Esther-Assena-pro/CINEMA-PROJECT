document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const loadMoreButton = document.getElementById('load-more-button');
    let currentPage = 1;
    let currentQuery = '';

    // Restore search state from localStorage
    if (localStorage.getItem('currentQuery')) {
        currentQuery = localStorage.getItem('currentQuery');
        currentPage = parseInt(localStorage.getItem('currentPage'), 10) || 1;
        searchInput.value = currentQuery;
        const storedResults = localStorage.getItem('searchResults');
        if (storedResults) {
            displayMovies(JSON.parse(storedResults), searchResults);
        }
    }

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page
        currentQuery = searchInput.value;
        currentPage = 1;
        const movies = await searchMovies(currentQuery, currentPage);
        localStorage.setItem('currentQuery', currentQuery);
        localStorage.setItem('currentPage', currentPage);
        localStorage.setItem('searchResults', JSON.stringify(movies));
        displayMovies(movies, searchResults);
    });

    searchInput.addEventListener('input', async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page
        currentQuery = searchInput.value;
        if (currentQuery.length > 2) {
            const suggestions = await searchMovies(currentQuery, 1);
            displayMovies(suggestions, searchResults);
        } else if (currentQuery.length === 0) {
            searchResults.innerHTML = '';
        }
    });

    loadMoreButton.addEventListener('click', async () => {
        currentPage++;
        const movies = await searchMovies(currentQuery, currentPage);
        const storedResults = JSON.parse(localStorage.getItem('searchResults')) || [];
        const updatedResults = storedResults.concat(movies);
        localStorage.setItem('currentPage', currentPage);
        localStorage.setItem('searchResults', JSON.stringify(updatedResults));
        displayMovies(updatedResults, searchResults);
    });

    async function searchMovies(query, page) {
        console.log(`Searching for movies: ${query}, page: ${page}`);
        const response = await fetch(`https://www.omdbapi.com/?apikey=aff6b636&s=${query}&page=${page}`);
        const data = await response.json();
        console.log('API response:', data);
        return data.Search;
    }

    function displayMovies(movies, container) {
        console.log('Displaying movies:', movies);
        if (currentPage === 1) {
            container.innerHTML = '';
        }
        if (movies) {
            movies.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.className = 'movie-card';
                movieElement.innerHTML = `
                    <h3>${movie.Title}</h3>
                    <p>${movie.Year}</p>
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <button onclick="window.location.href='movie.html?id=${movie.imdbID}'">Voir les détails</button>
                `;
                container.appendChild(movieElement);
            });
        } else {
            container.innerHTML = '<p>Aucun film trouvé.</p>';
        }
    }
});