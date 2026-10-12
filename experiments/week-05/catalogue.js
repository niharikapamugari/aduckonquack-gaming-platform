/**
 * Week 5: Catalogue Management JavaScript Engine
 * Provides live search, category filtering, and modal game launcher
 */

const CATALOGUE_ITEMS = [
  { id: "target-shooter", title: "Target Shooter", icon: "🎯", genre: "Arcade", rating: 4.8, players: "12.4k" },
  { id: "puzzle-quest", title: "Puzzle Quest", icon: "🧩", genre: "Puzzle", rating: 4.9, players: "18.2k" },
  { id: "speed-racer", title: "Speed Racer", icon: "🏎️", genre: "Racing", rating: 4.7, players: "22.1k" },
  { id: "zombie-attack", title: "Zombie Attack", icon: "🧟", genre: "Action", rating: 4.6, players: "15.8k" },
  { id: "space-adventure", title: "Space Adventure", icon: "🚀", genre: "Sci-Fi", rating: 4.9, players: "30.5k" },
  { id: "castle-quest", title: "Castle Quest", icon: "🏰", genre: "RPG", rating: 4.8, players: "14.0k" }
];

let activeFilter = "All";
let searchQuery = "";

function renderCatalogue() {
  const container = document.getElementById("catalogGrid");
  const countDisplay = document.getElementById("resultCount");
  if (!container) return;

  const filtered = CATALOGUE_ITEMS.filter(item => {
    const matchesFilter = activeFilter === "All" || item.genre === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.genre.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (countDisplay) {
    countDisplay.innerText = `Displaying ${filtered.length} of ${CATALOGUE_ITEMS.length} games`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #c4b5fd;">
        <h3>No games found matching your search.</h3>
        <p>Try searching for "Puzzle", "Racer", "Space", or "Shooter".</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(game => `
    <div class="game-card">
      <div class="game-title-wrapper">
        <span class="game-icon">${game.icon}</span>
        <span>${game.title}</span>
      </div>
      <div style="display: flex; gap: 8px; font-size: 0.8rem; color: #c4b5fd;">
        <span class="game-badge">${game.genre}</span>
        <span style="color: #fbbf24;">★ ${game.rating}</span>
      </div>
      <button class="btn-play" onclick="launchGame('${game.id}')">Play Game</button>
    </div>
  `).join("");
}

function setFilter(genre, btnElement) {
  activeFilter = genre;
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  btnElement.classList.add("active");
  renderCatalogue();
}

function handleSearch(query) {
  searchQuery = query;
  renderCatalogue();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCatalogue();
  const searchInput = document.getElementById("catalogSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => handleSearch(e.target.value));
  }
});
