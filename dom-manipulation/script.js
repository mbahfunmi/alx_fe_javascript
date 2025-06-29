// dom-manipulation/script.js

let quotes = [];
let selectedCategory = localStorage.getItem("selectedCategory") || "all";

const defaultQuotes = [
  { text: "Consistency is the key to success.", category: "Motivation" },
  { text: "You are never too old to dream again.", category: "Inspiration" },
  { text: "Financial freedom begins with smart habits.", category: "Finance" }
];

function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  quotes = storedQuotes ? JSON.parse(storedQuotes) : defaultQuotes;
  saveQuotes();
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function displayQuote(quote) {
  const display = document.getElementById("quoteDisplay");
  display.innerHTML = `
    <p><strong>Quote:</strong> ${quote.text}</p>
    <p><strong>Category:</strong> ${quote.category}</p>
  `;
}

function showRandomQuote() {
  let filtered = selectedCategory === "all" ? quotes : quotes.filter(q => q.category === selectedCategory);
  const random = filtered[Math.floor(Math.random() * filtered.length)];
  if (random) displayQuote(random);
  else document.getElementById("quoteDisplay").innerHTML = "<p>No quotes in this category.</p>";
}

function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    const newQuote = { text, category };
    quotes.push(newQuote);
    saveQuotes();
    displayQuote(newQuote);
    populateCategories();

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please enter both quote and category.");
  }
}

function populateCategories() {
  const categories = ["all", ...new Set(quotes.map(q => q.category))];
  const filter = document.getElementById("categoryFilter");

  filter.innerHTML = categories.map(cat => `<option value="${cat}" ${cat === selectedCategory ? "selected" : ""}>${cat}</option>`).join("");
}

function filterQuotes() {
  selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);
  showRandomQuote();
}

function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid file format.");
      }
    } catch (err) {
      alert("Failed to import: " + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

function init() {
  loadQuotes();
  populateCategories();
  showRandomQuote();

  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
  document.getElementById("categoryFilter").addEventListener("change", filterQuotes);
  document.getElementById("exportBtn").addEventListener("click", exportQuotes);
  document.getElementById("importFile").addEventListener("change", importFromJsonFile);
}

init();
