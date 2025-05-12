const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter-btn");
const quoteBtn = document.getElementById("quote-btn");
const loader = document.getElementById("loader");

const showLoadingSpinner = function () {
  loader.style.display = "block";
  quoteContainer.style.display = "none";
};

const removeLoadingSpinner = function () {
  loader.style.display = "none";
  quoteContainer.style.display = "block";
};

let apiQuotes = [];

// Get Quotes from API
const getQuotes = async function () {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const respond = await fetch(apiUrl);
    apiQuotes = await respond.json();
    newQuote();
  } catch (error) {
  } finally {
    removeLoadingSpinner();
  }
};

// Getting Quote Data
const newQuote = function () {
  showLoadingSpinner();

  // Picking a Random Quote
  const { text, author } =
    apiQuotes[Math.floor(Math.random() * apiQuotes.length) + 1];

  // Manipulation DOM
  quoteText.textContent = text;
  !author
    ? (authorText.textContent = "Unknown")
    : (authorText.textContent = author);

  // Check Quote Length to Determine Styling
  text.length > 120
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  // Set Quote, Hide Loader
  setTimeout(() => {
    removeLoadingSpinner();
  }, (Math.floor(Math.random() * 3) + 1) * 500);
};

const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

// Handlers
quoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// Inits
getQuotes();
