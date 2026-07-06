import { API_KEY } from "./config.js";

console.log("Api key cargo ?", API_KEY);

if (!API_KEY) {
  console.error("¡ALERTA! La API_KEY está vacía o indefinida.");
}

const options = {
  method: "GET",
  headers: { accept: "application/json" },
};

const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Batman`;

fetch(url, options)
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
