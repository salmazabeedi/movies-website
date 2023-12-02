function focusFunction() {
  document.getElementById("movieInput").style.background = "#e3d9cf";
}

function blurFunction() {
  document.getElementById("movieInput").style.background = "#48b0a9";
}

function hoverFunction() {
  document.getElementById("movieInput").style.background = "#5a5a5a";
}

function getMovieInfo() {
  const apiKey = '62ab4ef8';
  const movieTitle = document.getElementById('movieInput').value;
  const movieInfoDiv = document.getElementById('movieInfo');

  if (movieTitle.trim() === '') {
      movieInfoDiv.innerHTML = '<p class="error-message">Please enter a movie name.</p>';
      return;
  }

  const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', apiUrl, true);

  xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
          if (xhr.status == 200) {
              var data = JSON.parse(xhr.responseText);
              handleApiResponse(data);
          } else {
              console.error('Error fetching movie information:', xhr.statusText);
          }
      }
  };

  xhr.send();
}

function handleApiResponse(data) {
  const movieInfoDiv = document.getElementById('movieInfo');
  movieInfoDiv.innerHTML = '';

  if (data.Response === 'True') {
      const infoHTML = `
          <div class="movie-info text-center" ">
              <img src="${data.Poster}" alt="${data.Title}" class="movie-poster">
              <div class="details">
                  <h2>${data.Title}</h2>
                  <p><strong>Plot:</strong> ${data.Plot}</p>
                  <p><strong>Year of Release:</strong> ${data.Year}</p>
                  <p><strong>Actors:</strong> ${data.Actors}</p>
                  <p><strong>Ratings:</strong> ${data.imdbRating}</p>
              </div>
          </div>
      `;
      movieInfoDiv.innerHTML = infoHTML;
  } else {
      movieInfoDiv.innerHTML = '<p class="error-message">Movie not found.</p>';
  }
}

function clearMovieInfo() {
  const movieInfoDiv = document.getElementById('movieInfo');
  movieInfoDiv.innerHTML = '';
}
