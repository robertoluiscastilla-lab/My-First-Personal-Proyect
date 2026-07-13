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

//Other declaration

const base_url = "https://image.tmdb.org/t/p/w780";

//Clearing function

function clearingScreen() {
  const containers = [header, main, third_container];

  containers.forEach((container) => {
    container.innerHTML = "";
    container.style.display = "none";
  });
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

findMovies("Obsession");

//Event Listeners

clearBtn.addEventListener("click", () => {
  searchBar.value = "";
  searchBar.focus();
});

searchBar.addEventListener("keydown", async (e) => {
  if (e.key == "Enter") {
    clearingScreen();

    let typed = e.target.value;

    const movies = await findMovies(typed);
  }
});
