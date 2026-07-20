//Declarations from the html
const body = document.querySelector("body");

//Other declaration

let typed = "";
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
  document.body.className = "";
  window.scrollTo(0, 0);
}

//Bringing mi api key from the .gitignore
//If you wish to try my page you need to put yout own key from TMDB
import { API_KEY } from "./config.js";

const options = {
  method: "GET",
  headers: { accept: "application/json" },
};

//Functions that need to fetch

async function getTopMovies() {
  try {
    const img1 = document.querySelector(".img1");
    const img2 = document.querySelector(".img2");
    const img3 = document.querySelector(".img3");

    const fetched = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      options,
    );

    if (!fetched.ok) {
      throw new Error(`Error in the petition: ${fetched.status}`);
    }

    const data = await fetched.json();

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

    return allMovieData.results;
  } catch (error) {
    console.error("Problems during the launch fase: ", error.message);
  }
}

//Rendering functions and Other Functions

function renderingReturnBtn() {
  const returnBtn = document.createElement("button");
  returnBtn.className = "return-btn";
  returnBtn.innerHTML = "&#10094;";

  returnBtn.addEventListener("click", () => {
    const currentClass = body.className;
    clearingScreen();

    if (currentClass === "finalDisplay") {
      renderingSecondFace(typed);
    } else if (currentClass === "after-searched") {
      renderingFirstFase();
    } else {
      console.error("An error has ocurred with the return button");
    }
  });

  body.appendChild(returnBtn);
}

async function renderingFirstFase() {
  body.innerHTML = `
      <header class="header">
      <h1 class="title">The Searcher</h1>
    </header>

    <main class="main">
      <div class="search-n-x">
        <input
          class="search-bar"
          type="search"
          placeholder="Enter the movie name"
        /><span class="clear-button">&times;</span>
      </div>
    </main>

    <div class="third-container">
      <div class="just-space"></div>
      <div class="just-space"></div>

      <div class="top">
        TOP <br />
        POPULAR !!!
      </div>

      <div class="top1 tops">
        <span class="numbers one">1</span><img class="top-img img1" />
      </div>

      <div class="top2 tops">
        <span class="numbers two">2</span><img class="top-img img2" />
      </div>

      <div class="top3 tops">
        <span class="numbers three">3</span><img class="top-img img3" />
      </div>
    </div>
  `;
  document.body.className = "";

  await getTopMovies();
}

async function renderingSecondFace(typedFromTheSearchBar) {
  const movies = await findMovies(typedFromTheSearchBar);

  body.classList.add("after-searched");

  body.innerHTML = `

    <header class="header">
    <h1 class="title">Results</h1>
    </header>

    <div class="results-container"> </div>
    `;

  renderingReturnBtn();

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

      renderingReturnBtn();
    });
  });
}

//Aiso event listeners

document.body.addEventListener("keydown", (e) => {
  if (e.target.classList.contains("search-bar") && e.key === "Enter") {
    typed = e.target.value;

    clearingScreen();

    renderingSecondFace(typed);
  }
});

document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("clear-button")) {
    const currentSearchBar = document.querySelector(".search-bar");
    currentSearchBar.value = "";
    currentSearchBar.focus();
  }
});
