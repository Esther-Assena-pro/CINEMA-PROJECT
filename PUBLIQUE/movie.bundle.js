document.addEventListener('DOMContentLoaded', async () => {
    const movieDetailsContainer = document.getElementById('movie-details-container');
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    if (movieId) {
        const movie = await getMovieDetails(movieId);
        displayMovieDetails(movie);
    }

    async function getMovieDetails(id) {
        const response = await fetch(`https://www.omdbapi.com/?apikey=aff6b636&i=${id}`);
        const data = await response.json();
        return data;
    }

    function displayMovieDetails(movie) {
        const releaseDate = new Date(movie.Released).toLocaleDateString('fr-FR');
        movieDetailsContainer.innerHTML = `
            <h2>${movie.Title}</h2>
            <img src="${movie.Poster}" alt="${movie.Title}">
            <p><strong>Résumé:</strong> ${movie.Plot}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Auteurs:</strong> ${movie.Writer}</p>
            <p><strong>Notes:</strong> ${movie.imdbRating}</p>
            <p><strong>Date de sortie:</strong> ${releaseDate}</p>
        `;
    }
});