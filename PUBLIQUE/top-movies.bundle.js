document.addEventListener('DOMContentLoaded', () => {
    console.log('top-movies.bundle.js loaded');

    const topMoviesContainer = document.getElementById('top-movies-container');
    const loadMoreButton = document.getElementById('load-more-button');
    let currentPage = 1;

    
    fetchTopMovies();

    loadMoreButton.addEventListener('click', async () => {
        currentPage++;
        const movies = await getTopMovies(currentPage);
        displayMovies(movies);
    });

    async function fetchTopMovies() {
        const topMovies = await getTopMovies(currentPage);
        displayMovies(topMovies);
    }

    async function getTopMovies(page) {
        const response = await fetch(`https://www.omdbapi.com/?apikey=aff6b636&s=top&page=${page}`);
        const data = await response.json();
        return data.Search ? data.Search : []; // les meilleur film
    }

    function displayMovies(movies) {
        if (currentPage === 1) {
            topMoviesContainer.innerHTML = '';
        }
        if (movies.length > 0) {
            movies.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.className = 'movie-card';
                movieElement.innerHTML = `
                    <h3>${movie.Title}</h3>
                    <p>${movie.Year}</p>
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <button onclick="window.location.href='movie.html?id=${movie.imdbID}'">Voir les détails</button>
                `;
                topMoviesContainer.appendChild(movieElement);
            });
        } else {
            topMoviesContainer.innerHTML = '<p>Aucun film trouvé.</p>';
        }
    }
});