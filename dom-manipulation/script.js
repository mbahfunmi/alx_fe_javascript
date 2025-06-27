// Initial list of quotes
let quotes = [
  { text: "Learn something new every day.", category: "Education" },
  { text: "Stay positive!", category: "Motivation" },
  { text: "Simplicity is the ultimate sophistication.", category: "Wisdom" }
];

// ✅ Function to display a random quote
function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    <p><strong>Quote:</strong> ${quote.text}</p>
    <p><strong>Category:</strong> ${quote.category}</p>
  `;
}

// Attach event to "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// ✅ Function to add a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newQuote = {
    text: textInput.value.trim(),
    category: categoryInput.value.trim()
  };

  if (newQuote.text && newQuote.category) {
    quotes.push(newQuote);
    textInput.value = "";
    categoryInput.value = "";

    // ✅ Optional: Show newly added quote immediately
    displayRandomQuote();
  } else {
    alert("Please enter both quote and category.");
  }
}
