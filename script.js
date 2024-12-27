// Select the toggle button and navigation links
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// Add event listener for toggle button
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show"); // Toggle the 'show' class
});
const API_KEY = "aabdf765f82342968810c869cfe3aa27"; // Replace with your TMDB API key
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const backgroundContainer = document.getElementById("background-container");
const details = document.getElementById("details");
const detailsTitle = document.getElementById("details-title");
const detailsOverview = document.getElementById("details-overview");

let currentIndex = 0;
let movies = [];

async function fetchMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
  const data = await response.json();
  movies = data.results;
  setupBackgrounds(movies);
  updateContent(movies[0]);
  startAutoSlide();
}

function setupBackgrounds(movies) {
  movies.forEach((movie, index) => {
    const bgDiv = document.createElement("div");
    bgDiv.classList.add("background");
    bgDiv.style.backgroundImage = `url('${
      IMAGE_BASE_URL + movie.backdrop_path
    }')`;
    bgDiv.dataset.index = index;
    backgroundContainer.appendChild(bgDiv);
  });
}

function updateContent(movie) {
  const backgrounds = document.querySelectorAll(".background");
  backgrounds.forEach((bg) => {
    bg.style.opacity = "0";
  });

  const currentBg = document.querySelector(
    `.background[data-index="${currentIndex}"]`
  );
  if (currentBg) {
    currentBg.style.opacity = "1";
  }

  details.classList.remove("visible");
  setTimeout(() => {
    detailsTitle.textContent = movie.title;
    detailsOverview.textContent = movie.overview;
    details.classList.add("visible");
  }, 500);
}

function startAutoSlide() {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % movies.length;
    updateContent(movies[currentIndex]);
  }, 5000);
}

fetchMovies();
