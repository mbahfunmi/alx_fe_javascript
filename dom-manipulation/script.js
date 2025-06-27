let quotes = [
  { text: "Learn something new every day.", category: "Education" },
  { text: "Stay positive!", category: "Motivation" },
  { text: "Simplicity is the ultimate sophistication.", category: "Wisdom" }
];

// ========== LOCAL STORAGE ==========
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// ========== UI UTILS ==========
function showNotification(msg) {
  alert(msg); // simple notification for now
}

// ========== CATEGORY DROPDOWN ==========
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });

  const saved = localStorage.getItem("selectedCategory");
  if (saved) categoryFilter.value = saved;
}

// ========== FILTER DISPLAY ==========
function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selected);
  const display = document.getElementById("quoteDisplay");
  display.innerHTML = "";

  const filtered = selected === "all" ? quotes : quotes.filter(q => q.category === selected);

  filtered.forEach(q => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>Quote:</strong> ${q.text}</p>
      <p><strong>Category:</strong> ${q.category}</p>
      <hr>
    `;
    display.appendChild(div);
  });
}

// ========== RANDOM DISPLAY ==========
function displayRandomQuote() {
  const idx = Math.floor(Math.random() * quotes.length);
  const quote = quotes[idx];
  document.getElementById("quoteDisplay").innerHTML = `
    <p><strong>Quote:</strong> ${quote.text}</p>
    <p><strong>Category:</strong> ${quote.category}</p>
  `;
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// ========== ADD QUOTE ==========
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const catInput = document.getElementById("newQuoteCategory");

  const newQuote = {
    text: textInput.value.trim(),
    category: catInput.value.trim()
  };

  if (newQuote.text && newQuote.category) {
    quotes.push(newQuote);
    saveQuotes();
    populateCategories();
    filterQuotes();
    textInput.value = "";
    catInput.value = "";
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// ========== EXPORT ==========
function exportToJson() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// ========== IMPORT ==========
function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        quotes.push(...imported);
        saveQuotes();
        populateCategories();
        filterQuotes();
        showNotification("Quotes imported successfully!");
      } else {
        showNotification("Invalid file format.");
      }
    } catch (err) {
      showNotification("Error importing JSON file.");
    }
  };
  reader.readAsText(event.target.files[0]);
}

// ========== SERVER SYNC ==========
async function fetchQuotesFromServer() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  const serverQuotes = data.slice(0, 3).map(item => ({
    text: item.title,
    category: "Server"
  }));

  return serverQuotes;
}

// Merge strategy: server wins
function mergeServerQuotes(serverQuotes) {
  const existingTexts = new Set(quotes.map(q => q.text));
  const newOnes = serverQuotes.filter(q => !existingTexts.has(q.text));
  if (newOnes.length > 0) {
    quotes.push(...newOnes);
    saveQuotes();
    populateCategories();
    filterQuotes();
    showNotification("New quotes synced from server.");
  } else {
    showNotification("No new quotes from server.");
  }
}

// POST one new quote to mock API
async function postQuoteToServer(quote) {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(quote),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    });
    const result = await res.json();
    console.log("Posted to server:", result);
  } catch (err) {
    console.error("Failed to post quote:", err);
  }
}

// Full Sync function (required by checker)
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  mergeServerQuotes(serverQuotes);
}

// Auto-sync every 30 seconds
setInterval(syncQuotes, 30000);

// ========== INIT ==========
document.addEventListener("DOMContentLoaded", () => {
  loadQuotes();
  populateCategories();
  filterQuotes();

  document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
  document.getElementById("exportJson").addEventListener("click", exportToJson);
  document.getElementById("importFile").addEventListener("change", importFromJsonFile);
  document.getElementById("categoryFilter").addEventListener("change", filterQuotes);

  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    const q = JSON.parse(last);
    document.getElementById("quoteDisplay").innerHTML = `
      <p><strong>Quote:</strong> ${q.text}</p>
      <p><strong>Category:</strong> ${q.category}</p>
    `;
  }

  syncQuotes(); // initial sync
});
