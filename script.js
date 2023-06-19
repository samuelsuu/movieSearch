// API Key obtained from OMDb API
const apiKey = 'c929301e';

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const movieDetails = document.getElementById('movie-details');

// Add event listener to search button
searchButton.addEventListener('click', searchMovies);

function searchMovies() {
  const searchTerm = searchInput.value;
  // Clear previous search results
  searchResults.innerHTML = '';
  movieDetails.innerHTML = '';

  // Fetch movie data from OMDb API
  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True') {
        displayMovies(data.Search);
      } else {
        displayError(data.Error);
      }
    })
    .catch(error => {
      displayError('An error occurred. Please try again.');
    });
}

function displayMovies(movies) {
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const posterImg = document.createElement('img');
    posterImg.src = movie.Poster !== 'N/A' ? movie.Poster : 'no-poster.jpg';
    posterImg.alt = movie.Title;

    const title = document.createElement('h3');
    title.textContent = movie.Title;

    const year = document.createElement('p');
    year.textContent = movie.Year;

    const detailsButton = document.createElement('button');
    detailsButton.textContent = 'View Details';
    detailsButton.addEventListener('click', () => {
      getMovieDetails(movie.imdbID);
    });

    movieCard.appendChild(posterImg);
    movieCard.appendChild(title);
    movieCard.appendChild(year);
    movieCard.appendChild(detailsButton);

    searchResults.appendChild(movieCard);
  });
}

function getMovieDetails(imdbID) {
  // Fetch movie details from OMDb API
  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
    .then(response => response.json())
    .then(data => {
      displayMovieDetails(data);
    })
    .catch(error => {
      displayError('An error occurred. Please try again.');
    });
}

function displayMovieDetails(movie) {
  const detailsContainer = document.createElement('div');
  detailsContainer.classList.add('movie-details');

  const title = document.createElement('h2');
  title.textContent = movie.Title;

  const plot = document.createElement('p');
  plot.textContent = movie.Plot;

  const cast = document.createElement('p');
  cast.textContent = `Cast: ${movie.Actors}`;

  const genre = document.createElement('p');
  genre.textContent = `Genre: ${movie.Genre}`;

  detailsContainer.appendChild(title);
  detailsContainer.appendChild(plot);
  detailsContainer.appendChild(cast);
  detailsContainer.appendChild(genre);

  movieDetails.appendChild(detailsContainer);
}

function displayError(errorMessage) {
  const errorContainer = document.createElement('div');
  errorContainer.classList.add('error-message');
  errorContainer.textContent = errorMessage;

  searchResults.appendChild(errorContainer);
}
