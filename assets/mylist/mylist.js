const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '52c4202be8f44cf677f9d30d911e391b';

// Function to get favorited movies from localStorage
function getFavoriteMovies() {
  return JSON.parse(localStorage.getItem('favoriteMovies')) || [];
}

// Function to fetch movie details based on movie IDs
async function fetchFavoriteMovies() {
  const favoriteMovies = getFavoriteMovies();
  const favoriteMoviesContainer = document.getElementById('favoriteMoviesContainer');

  favoriteMoviesContainer.innerHTML = ''; // Clear existing content

  for (const movieId of favoriteMovies) {
    // Replace this with your API call to get movie details
    const movieDetails = await fetchMovieDetails(movieId);

    if (movieDetails) {
      // Create a container element for the movie
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');

      // Create an element for the movie title
      const movieTitle = document.createElement('h3');
      movieTitle.textContent = movieDetails.title; // Display movie title

      // Create an element for the movie poster
      const moviePoster = document.createElement('img');
      moviePoster.alt = `${movieDetails.title} Poster`;
      if (movieDetails.poster_path) {
        moviePoster.src = `https://image.tmdb.org/t/p/w200/${movieDetails.poster_path}`;
      } else {
        // Provide a placeholder image if no poster_path is available
        moviePoster.src = 'https://i.ebayimg.com/images/g/kykAAOSwpDdVGcih/s-l400.jpg';
      }

      // Create an element for the movie description
      const movieDescription = document.createElement('p');
      movieDescription.classList.add('movie-description');
      movieDescription.textContent = movieDetails.overview; // Display movie description

       // Create an "Unfavorite" button
       const unfavoriteButton = document.createElement('button');
       unfavoriteButton.classList.add('unfavorite-button');
       unfavoriteButton.textContent = 'Unfavorite';
 
       // Add an event listener to the "Unfavorite" button
       unfavoriteButton.addEventListener('click', () => {
         unfavoriteMovie(movieId);
         // Remove the movie container from the DOM
         movieContainer.remove();
       });
 
       // Append title, poster, description, and "Unfavorite" button elements to the movie container
       movieContainer.appendChild(movieTitle);
       movieContainer.appendChild(moviePoster);
       movieContainer.appendChild(movieDescription);
       movieContainer.appendChild(unfavoriteButton);
 
       // Append the movie container to the favoriteMoviesContainer
       favoriteMoviesContainer.appendChild(movieContainer);
     }
   }
 }

// Function to remove a movie from favorites and update the display
function unfavoriteMovie(movieId) {
  // Get the current list of favorite movies from localStorage
  let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

  // Check if the movie is in the favorites list
  const movieIndex = favoriteMovies.indexOf(movieId);
  if (movieIndex !== -1) {
    // If it's in the list, remove it
    favoriteMovies.splice(movieIndex, 1);

    // Update the favorite movies in localStorage
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  }
}

// Function to fetch movie details based on movie ID
async function fetchMovieDetails(movieId) {
  try {
    // Replace this with your API call to fetch movie details by ID
    const response = await fetch(`${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    const data = await response.json();
    return data; // Modify this to return the necessary movie details
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

// Load and display favorited movies when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  fetchFavoriteMovies();
});
