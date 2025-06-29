// Quotes array
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don't let yesterday take up too much of today.", category: "Inspiration" },
  { text: "Whether you think you can or think you can’t, you’re right.", category: "Mindset" }
];

// Display a quote in the DOM
function renderQuote(quote) {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `
    <p><strong>Quote:</strong> ${quote.text}</p>
    <p><strong>Category:</strong> ${quote.category}</p>
  `;
}

// Show random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  renderQuote(quotes[randomIndex]);
}

// Add new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (!newText || !newCategory) {
    alert("Please enter both a quote and category.");
    return;
  }

  const newQuote = { text: newText, category: newCategory };
  quotes.push(newQuote);         // Add to array
  renderQuote(newQuote);         // Update DOM

  textInput.value = "";
  categoryInput.value = "";

  alert("Quote added successfully!");
}

// ✅ Attach both event listeners using JavaScript
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("addQuote").addEventListener("click", addQuote);
