// 1. Our quotes array
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don't let yesterday take up too much of today.", category: "Inspiration" },
  { text: "we do hard things.", category: "Alx" }
];

// 2. Function to render any given quote object into the #quoteDisplay div
function renderQuote(quote) {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `
    <p><strong>Quote:</strong> ${quote.text}</p>
    <p><strong>Category:</strong> ${quote.category}</p>
  `;
}

// 3. Show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  renderQuote(quotes[randomIndex]);
}

// 4. Add event listener on “Show New Quote”
document
  .getElementById("newQuote")
  .addEventListener("click", showRandomQuote);

// 5. Function to add a new quote AND immediately update the DOM
function addQuote() {
  const newTextEl = document.getElementById("newQuoteText");
  const newCatEl = document.getElementById("newQuoteCategory");
  const newText = newTextEl.value.trim();
  const newCategory = newCatEl.value.trim();

  if (!newText || !newCategory) {
    alert("Please fill in both fields.");
    return;
  }

  // Push into our array
  const newQuoteObj = { text: newText, category: newCategory };
  quotes.push(newQuoteObj);

  // Immediately show it on the page
  renderQuote(newQuoteObj);

  // Clear inputs
  newTextEl.value = "";
  newCatEl.value = "";

  alert("New quote added and displayed!");
}
