// === Global Variables ===
let quotes = [];
let selectedCategory = "all"; // for future filtering if needed

// === Initial Custom Quotes ===
const defaultQuotes = [
  { text: "Success doesn’t come from what you do occasionally, it comes from what you do consistently.", category: "Motivation" },
  { text: "You are never too old to set another goal or to dream a new dream.", category: "Inspiration" },
  { text: "Wealth is the ability to fully experience life.", category: "Finance" }
];

// === Load from localStorage or use default ===
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  quotes = storedQuotes ? JSON.parse(storedQuotes) : defaultQuotes;
}

// === Save to localStorage ===
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// === Show a random quote ===
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  displayQuote(quote);
}

// === Display a specific quote object ===
function displayQuote(quote) {
  const display = document.getElementById("quoteDisplay");
  display.innerHTML = `
    <p><strong>Quote:</strong> ${quote.text}</p>
    <p><strong>Category:</strong> ${quote.category}</p>
  `;
}

// === Add a new quote ===
function addQuote() {
  const textInput = document.getElementById("newQuoteText").value.trim();
  const categoryInput = document.getElementById("newQuoteCategory").value.trim();

  if (textInput && categoryInput) {
    const newQuote = {
      text: textInput,
      category: categoryInput
    };

    quotes.push(newQuote);
    saveQuotes();
    displayQuote(newQuote);

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please provide both a quote and a category.");
  }
}

// === Initialization ===
function initQuoteApp() {
  loadQuotes();
  displayRandomQuote();

  document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
}

// === Run the app ===
initQuoteApp();
