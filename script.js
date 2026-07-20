//Declarations from the html

const clearBtn = document.querySelector(".clear-button");
const searchBar = document.querySelector(".search-bar");
const top_images = document.querySelector(".top-images");
const img1 = document.querySelector(".img1");
const img2 = document.querySelector(".img2");
const img3 = document.querySelector(".img3");
const header = document.querySelector(".header");
const main = document.querySelector("main");
const third_container = document.querySelector(".third-container");
const body = document.querySelector("body");

//Other declaration

let base_url = "https://image.tmdb.org/t/p/w780";
let originalLanguage = "";
let originalTitle = "";
let overview = "";
let popularity = "";
let releaseDate = "";
let title = "";
let voteAvarage = "";
let voteCount = "";
let finalPosterPath = "";

//Clearing function

function clearingScreen() {
  body.innerHTML = "";
}

//Fetching the API
import { API_KEY } from "./config.js";

const options = {
  method: "GET",
  headers: { accept: "application/json" },
};

async function getTopMovies() {
  try {
    const fetched = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      options,
    );

    if (!fetched.ok) {
      throw new Error(`Error in the petition: ${fetched.status}`);
    }

    const data = await fetched.json();

    console.log(data);

    img1.src = base_url + data.results[0].poster_path;
    img2.src = base_url + data.results[1].poster_path;
    img3.src = base_url + data.results[2].poster_path;

    return data.results;
  } catch (error) {
    console.error("Problems during the launch fase: ", error.message);
  }
}

getTopMovies();

async function findMovies(movieName) {
  try {
    const fetched = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieName)}`,
      options,
    );

    if (!fetched.ok) {
      throw new Error(`Error in the petition: ${fetched.status}`);
    }

    const allMovieData = await fetched.json();

    console.log(allMovieData);

    //allMovieData.results.original_title

    return allMovieData.results;
  } catch (error) {
    console.error("Problems during the launch fase: ", error.message);
  }
}

findMovies("Obs");

//Event Listeners

clearBtn.addEventListener("click", () => {
  searchBar.value = "";
  searchBar.focus();
});

searchBar.addEventListener("keydown", async (e) => {
  if (e.key == "Enter") {
    let typed = e.target.value;

    clearingScreen();

    const movies = await findMovies(typed);

    body.classList.add("after-searched");

    body.innerHTML = `

    <header class="header">
    <h1 class="title">Results</h1>
    </header>

    <div class="results-container"> </div>
    `;

    const results_container = document.querySelector(".results-container");

    movies.forEach((movie) => {
      const movieTitle = movie.title;
      const movieImg = base_url + movie.poster_path;
      const movieDiv = document.createElement("div");

      movieDiv.classList.add("movie-data");

      movieDiv.innerHTML = `
      <img class="final-img" src=${movieImg}><span class="moved">${movieTitle}</span>
      `;

      results_container.appendChild(movieDiv);

      movieDiv.addEventListener("click", () => {
        originalLanguage = movie.original_language;
        originalTitle = movie.original_title;
        overview = movie.overview;
        popularity = movie.popularity;
        releaseDate = movie.release_date;
        title = movieTitle;
        voteAvarage = movie.vote_average;
        voteCount = movie.vote_count;
        finalPosterPath = movie.poster_path;

        clearingScreen();

        body.classList.remove("after-searched");
        body.classList.add("finalDisplay");

        body.innerHTML = `
        <img class="lastDisplay" src="${base_url + finalPosterPath}">
        <div class="final-container">

          <div class="info-div">
          <h1 class="info-title">Movie Info</h1>
          </div>

          <div>
          <h2>Original Languaje</h2>
          <span>${originalLanguage}</span>
          </div>

          <div>
          <h2>Original Title</h2>
          <span>${originalTitle}</span>
          </div>

          <div>
          <h2>Overview</h2>
          <span>${overview}</span>
          </div>

          <div>
          <h2>Popularity</h2>
          <span>${popularity}</span>
          </div>

          <div>
          <h2>Release Date</h2>
          <span>${releaseDate}</span>
          </div>

          <div>
          <h2>Title</h2>
          <span>${title}</span>
          </div>

          <div>
          <h2>Vote Avarage</h2>
          <span>${voteAvarage}</span>
          </div>

          <div>
          <h2>Vote Count</h2>
          <span>${voteCount}</span>
          </div>

        </div>
        `;
      });
    });
  }
});

/*



*/
