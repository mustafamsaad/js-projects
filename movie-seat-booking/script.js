const container = document.querySelector(".container");
const movie = document.getElementById("movie");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
let count = document.getElementById("count");
let total = document.getElementById("total");

let ticketPrice = +movie.value;

populateUI();

// Save selected movie index and price
const setMovieData = function (movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
};

// Update total and count
const updateSelectedCount = function () {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  count.innerHTML = selectedSeatsCount;
  total.innerHTML = `${selectedSeatsCount * ticketPrice}$`;
};

// Get data from localStorage and populate UI
function populateUI() {
  // Seats population
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats && selectedSeats.length > 0)
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) seat.classList.add("selected");
    });

  // Movie population
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");

  if (selectedMovieIndex) {
    movie.selectedIndex = selectedMovieIndex;
    ticketPrice = selectedMoviePrice;
  }
}

// Changing movie event
movie.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;

  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Choosing seat event
container.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("seat") ||
    e.target.classList.contains("occupied")
  )
    return;

  e.target.classList.toggle("selected");
  updateSelectedCount();
});

// Initial UI updating
updateSelectedCount();
