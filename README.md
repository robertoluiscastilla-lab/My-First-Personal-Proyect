# The Searcher

**The Searcher** is a dynamic, single-page movie search application built with pure Vanilla JavaScript. It allows users to search for movies, view popular top-rated titles, and navigate between different interface states seamlessly without needing a page refresh.

##  Features

*   **Real-time Movie Search:** Search for any movie using the integrated search bar with Enter-key functionality.
*   **Dynamic Rendering:** Seamless transition between the home screen (showing popular movies) and the search results page.
*   **Popular Movies Showcase:** Automatically fetches and displays the top 3 popular movies upon loading the home screen.
*   **Persistent Navigation:** A robust UI architecture that maintains functionality (search, clear, return) regardless of DOM updates.

##  Technical Highlights

This project focuses on clean, efficient DOM manipulation and modern JavaScript practices:

*   **Vanilla JavaScript:** Developed without frameworks, ensuring full control over DOM manipulation and application logic.
*   **Event Delegation:** Implemented event delegation on the `body` element to handle dynamic elements. This ensures that event listeners remain active even after elements are destroyed and re-rendered.
*   **Asynchronous Programming:** Utilizes `async/await` and the `Fetch API` to handle external data requests smoothly without blocking the main thread.
*   **State Management:** Efficiently cleans and injects HTML to handle different application states and user navigation.

##  Technologies Used

*   **HTML5**
*   **CSS3**
*   **JavaScript (ES6+)**
*   **TMDB API** (The Movie Database)

##  How to Run

1.  Clone this repository to your local machine.
2.  Obtain your API Key from [TMDB](https://www.themoviedb.org/).
3.  Add your `API_KEY` to the constant variable in your JavaScript file.
4.  Open the `index.html` file in your preferred web browser.
