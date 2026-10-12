/**
 * ADuckOnQuack - Master Multi-Gaming Platform Engine
 * Handles Playable Mini-Games, Dynamic Catalog, Form Validations & Auth
 */

// ============================================================================
// GAME DEFINITIONS & METADATA
// ============================================================================
const GAMES_DATA = [
  {
    id: "target-shooter",
    title: "Target Shooter",
    icon: "🎯",
    genre: "Arcade / Aim",
    desc: "Test your reflexes! Click the glowing targets before they vanish.",
    init: initTargetShooter
  },
  {
    id: "puzzle-quest",
    title: "Puzzle Quest",
    icon: "🧩",
    genre: "Memory / Puzzle",
    desc: "Match the hidden mythical duck glyphs in fewer moves.",
    init: initPuzzleQuest
  },
  {
    id: "speed-racer",
    title: "Speed Racer",
    icon: "🏎️",
    genre: "Racing / Dodge",
    desc: "Speed down the neon cyberway and dodge the obstacle traffic.",
    init: initSpeedRacer
  },
  {
    id: "zombie-attack",
    title: "Zombie Attack",
    icon: "🧟",
    genre: "Survival / Defense",
    desc: "Defend your fortress! Click incoming zombies before they breach.",
    init: initZombieAttack
  },
  {
    id: "space-adventure",
    title: "Space Adventure",
    icon: "🚀",
    genre: "Shooter / Sci-Fi",
    desc: "Pilot the Duck Starship! Shoot space asteroids and dodge cosmic debris.",
    init: initSpaceAdventure
  },
  {
    id: "castle-quest",
    title: "Castle Quest",
    icon: "🏰",
    genre: "Adventure / RPG",
    desc: "Explore the dark dungeons, collect duck gold, and dodge spiked traps.",
    init: initCastleQuest
  }
];

let activeGameLoop = null;

// ============================================================================
// MODAL & GAME LAUNCHER
// ============================================================================
function launchGame(gameId) {
  const game = GAMES_DATA.find(g => g.id === gameId);
  if (!game) return;

  const modal = document.getElementById("gameModal");
  const modalTitle = document.getElementById("modalGameTitle");
  const modalBody = document.getElementById("modalGameBody");

  if (!modal || !modalTitle || !modalBody) return;

  modalTitle.innerHTML = `${game.icon} ${game.title} <span class="game-badge">${game.genre}</span>`;
  modalBody.innerHTML = "";

  modal.style.display = "flex";

  // Stop any previous game loop
  if (activeGameLoop) {
    cancelAnimationFrame(activeGameLoop);
    clearInterval(activeGameLoop);
    activeGameLoop = null;
  }

  // Initialize selected game
  game.init(modalBody);
}

function closeGameModal() {
  const modal = document.getElementById("gameModal");
  if (modal) {
    modal.style.display = "none";
  }
  if (activeGameLoop) {
    cancelAnimationFrame(activeGameLoop);
    clearInterval(activeGameLoop);
    activeGameLoop = null;
  }
}

// ============================================================================
// GAME 1: 🎯 TARGET SHOOTER
// ============================================================================
function initTargetShooter(container) {
  let score = 0;
  let timeLeft = 25;

  container.innerHTML = `
    <div class="game-arena">
      <div class="game-hud">
        <span>Score: <b id="ts-score">0</b></span>
        <span>Time Left: <b id="ts-time">25s</b></span>
      </div>
      <div class="game-canvas-wrapper" style="width: 500px; height: 320px; position: relative; background: #070314; overflow: hidden; cursor: crosshair;">
        <div id="target-box" style="position: absolute; width: 55px; height: 55px; border-radius: 50%; background: radial-gradient(circle, #f43f5e 30%, #be123c 70%); border: 3px solid #ffffff; box-shadow: 0 0 15px #f43f5e; display: flex; align-items: center; justify-content: center; font-size: 24px; user-select: none; transition: transform 0.1s ease;">
          🎯
        </div>
      </div>
      <p style="margin-top: 12px; color: #c4b5fd; font-size: 0.9rem;">Click the target as fast as possible before time runs out!</p>
    </div>
  `;

  const target = document.getElementById("target-box");
  const scoreDisplay = document.getElementById("ts-score");
  const timeDisplay = document.getElementById("ts-time");

  function moveTarget() {
    const maxX = 500 - 65;
    const maxY = 320 - 65;
    const nextX = Math.floor(Math.random() * maxX);
    const nextY = Math.floor(Math.random() * maxY);
    target.style.left = nextX + "px";
    target.style.top = nextY + "px";
  }

  target.addEventListener("click", () => {
    score += 10;
    scoreDisplay.innerText = score;
    target.style.transform = "scale(0.85)";
    setTimeout(() => {
      target.style.transform = "scale(1)";
    }, 80);
    moveTarget();
  });

  moveTarget();

  const timer = setInterval(() => {
    timeLeft--;
    timeDisplay.innerText = timeLeft + "s";
    if (timeLeft <= 0) {
      clearInterval(timer);
      container.innerHTML = `
        <div style="text-align: center; padding: 30px;">
          <h2 style="color: #c084fc; font-size: 2rem; margin-bottom: 12px;">🎉 Game Over!</h2>
          <p style="font-size: 1.25rem; color: #f3e8ff; margin-bottom: 20px;">Final Score: <b>${score} Points</b></p>
          <button class="btn-play" onclick="launchGame('target-shooter')">🔄 Play Again</button>
        </div>
      `;
    }
  }, 1000);

  activeGameLoop = timer;
}

// ============================================================================
// GAME 2: 🧩 PUZZLE QUEST (Memory Card Matching)
// ============================================================================
function initPuzzleQuest(container) {
  const icons = ["🦆", "⭐", "💎", "🎮", "⚡", "🔥"];
  let deck = [...icons, ...icons].sort(() => 0.5 - Math.random());
  let flipped = [];
  let matched = [];
  let moves = 0;

  container.innerHTML = `
    <div class="game-arena">
      <div class="game-hud">
        <span>Pairs Matched: <b id="pq-matched">0 / 6</b></span>
        <span>Moves: <b id="pq-moves">0</b></span>
      </div>
      <div id="pq-grid" style="display: grid; grid-template-columns: repeat(4, 80px); gap: 12px; margin-top: 10px;"></div>
    </div>
  `;

  const grid = document.getElementById("pq-grid");
  const matchedEl = document.getElementById("pq-matched");
  const movesEl = document.getElementById("pq-moves");

  deck.forEach((symbol, index) => {
    const card = document.createElement("div");
    card.dataset.index = index;
    card.dataset.symbol = symbol;
    card.style.cssText = `
      width: 80px; height: 80px; background: #1a0f3d; border: 2px solid #a855f7;
      border-radius: 12px; display: flex; align-items: center; justify-content: center;
      font-size: 2rem; cursor: pointer; user-select: none; box-shadow: 0 0 10px rgba(168,85,247,0.3);
      transition: all 0.25s ease;
    `;
    card.innerText = "❓";

    card.addEventListener("click", () => {
      if (flipped.length >= 2 || flipped.some(c => c.index === index) || matched.includes(index)) {
        return;
      }

      card.innerText = symbol;
      card.style.background = "#3b176d";
      card.style.borderColor = "#c084fc";
      flipped.push({ index, symbol, card });

      if (flipped.length === 2) {
        moves++;
        movesEl.innerText = moves;
        const [c1, c2] = flipped;

        if (c1.symbol === c2.symbol) {
          matched.push(c1.index, c2.index);
          matchedEl.innerText = `${matched.length / 2} / 6`;
          c1.card.style.borderColor = "#10b981";
          c2.card.style.borderColor = "#10b981";
          c1.card.style.boxShadow = "0 0 15px #10b981";
          c2.card.style.boxShadow = "0 0 15px #10b981";
          flipped = [];

          if (matched.length === deck.length) {
            setTimeout(() => {
              container.innerHTML = `
                <div style="text-align: center; padding: 30px;">
                  <h2 style="color: #10b981; font-size: 2rem; margin-bottom: 12px;">🏆 Puzzle Solved!</h2>
                  <p style="font-size: 1.25rem; color: #f3e8ff; margin-bottom: 20px;">Completed in <b>${moves}</b> moves!</p>
                  <button class="btn-play" onclick="launchGame('puzzle-quest')">🔄 Play Again</button>
                </div>
              `;
            }, 500);
          }
        } else {
          setTimeout(() => {
            c1.card.innerText = "❓";
            c2.card.innerText = "❓";
            c1.card.style.background = "#1a0f3d";
            c2.card.style.background = "#1a0f3d";
            c1.card.style.borderColor = "#a855f7";
            c2.card.style.borderColor = "#a855f7";
            flipped = [];
          }, 800);
        }
      }
    });

    grid.appendChild(card);
  });
}

// ============================================================================
// GAME 3: 🏎️ SPEED RACER
// ============================================================================
function initSpeedRacer(container) {
  container.innerHTML = `
    <div class="game-arena">
      <div class="game-hud">
        <span>Score: <b id="sr-score">0</b></span>
        <span>Controls: <b>⬅️ ➡️ Keys or Buttons</b></span>
      </div>
      <div class="game-canvas-wrapper">
        <canvas id="sr-canvas" width="400" height="320"></canvas>
      </div>
      <div style="display: flex; gap: 20px; margin-top: 12px;">
        <button class="btn-play" id="btn-left">⬅️ Steer Left</button>
        <button class="btn-play" id="btn-right">Steer Right ➡️</button>
      </div>
    </div>
  `;

  const canvas = document.getElementById("sr-canvas");
  const ctx = canvas.getContext("2d");
  const scoreEl = document.getElementById("sr-score");

  let playerX = 180;
  let playerY = 260;
  let score = 0;
  let obstacles = [];
  let gameOver = false;

  function spawnObstacle() {
    const lane = Math.floor(Math.random() * 4);
    obstacles.push({
      x: 50 + lane * 75,
      y: -40,
      width: 40,
      height: 40,
      color: "#ef4444"
    });
  }

  function handleKey(e) {
    if (e.key === "ArrowLeft" && playerX > 50) playerX -= 30;
    if (e.key === "ArrowRight" && playerX < 310) playerX += 30;
  }

  window.addEventListener("keydown", handleKey);
  document.getElementById("btn-left").onclick = () => { if (playerX > 50) playerX -= 30; };
  document.getElementById("btn-right").onclick = () => { if (playerX < 310) playerX += 30; };

  let spawnTimer = setInterval(spawnObstacle, 1100);

  function loop() {
    if (gameOver) return;

    ctx.fillStyle = "#0c0620";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Road markings
    ctx.strokeStyle = "rgba(168, 85, 247, 0.4)";
    ctx.lineWidth = 3;
    ctx.setLineDash([15, 15]);
    ctx.beginPath();
    ctx.moveTo(133, 0); ctx.lineTo(133, 320);
    ctx.moveTo(266, 0); ctx.lineTo(266, 320);
    ctx.stroke();
    ctx.setLineDash([]);

    // Player Duck Racer
    ctx.font = "32px Segoe UI Emoji";
    ctx.fillText("🏎️", playerX - 5, playerY + 25);

    // Obstacles
    for (let i = 0; i < obstacles.length; i++) {
      const ob = obstacles[i];
      ob.y += 4;
      ctx.font = "28px Segoe UI Emoji";
      ctx.fillText("🚧", ob.x - 4, ob.y + 25);

      // Collision check
      if (
        playerX < ob.x + ob.width &&
        playerX + 35 > ob.x &&
        playerY < ob.y + ob.height &&
        playerY + 35 > ob.y
      ) {
        gameOver = true;
        clearInterval(spawnTimer);
        window.removeEventListener("keydown", handleKey);
        ctx.fillStyle = "rgba(0,0,0,0.75)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#f87171";
        ctx.font = "bold 26px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("CRASH! GAME OVER", canvas.width / 2, 140);
        ctx.fillStyle = "#ffffff";
        ctx.font = "18px sans-serif";
        ctx.fillText(`Distance: ${score}m`, canvas.width / 2, 180);
        return;
      }
    }

    obstacles = obstacles.filter(o => o.y < 350);
    score += 1;
    scoreEl.innerText = score + "m";

    activeGameLoop = requestAnimationFrame(loop);
  }

  loop();
}

// ============================================================================
// GAME 4: 🧟 ZOMBIE ATTACK (Click Defense)
// ============================================================================
function initZombieAttack(container) {
  let score = 0;
  let duckHealth = 100;
  let zombies = [];
  let gameOver = false;

  container.innerHTML = `
    <div class="game-arena">
      <div class="game-hud">
        <span>Zombies Slain: <b id="za-score">0</b></span>
        <span>Duck Fortress HP: <b id="za-hp" style="color: #34d399;">100%</b></span>
      </div>
      <div class="game-canvas-wrapper" style="width: 500px; height: 320px; position: relative; background: radial-gradient(#150c33, #070312); overflow: hidden; cursor: crosshair;" id="za-arena">
        <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); font-size: 32px;">🦆🏰</div>
      </div>
      <p style="margin-top: 12px; color: #c4b5fd; font-size: 0.9rem;">Click the descending zombies before they attack your castle!</p>
    </div>
  `;

  const arena = document.getElementById("za-arena");
  const scoreEl = document.getElementById("za-score");
  const hpEl = document.getElementById("za-hp");

  function spawnZombie() {
    if (gameOver) return;
    const z = document.createElement("div");
    z.innerText = "🧟";
    z.style.cssText = `
      position: absolute;
      top: -30px;
      left: ${Math.floor(Math.random() * 440) + 10}px;
      font-size: 30px;
      cursor: pointer;
      user-select: none;
      transition: top 3s linear;
    `;
    arena.appendChild(z);

    z.onclick = () => {
      score++;
      scoreEl.innerText = score;
      z.innerText = "💥";
      setTimeout(() => { if (z.parentNode) z.parentNode.removeChild(z); }, 150);
    };

    setTimeout(() => {
      z.style.top = "240px";
    }, 50);

    setTimeout(() => {
      if (z.parentNode && z.innerText === "🧟") {
        z.parentNode.removeChild(z);
        duckHealth = Math.max(0, duckHealth - 20);
        hpEl.innerText = duckHealth + "%";
        if (duckHealth <= 40) hpEl.style.color = "#f87171";
        if (duckHealth <= 0) {
          gameOver = true;
          arena.innerHTML = `
            <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:100%; color: #ef4444;">
              <h2 style="font-size: 2rem;">💀 Fortress Overrun!</h2>
              <p style="color: #e9d5ff; margin: 12px 0;">Zombies Defeated: <b>${score}</b></p>
              <button class="btn-play" onclick="launchGame('zombie-attack')">🔄 Play Again</button>
            </div>
          `;
        }
      }
    }, 3100);
  }

  const spawnInterval = setInterval(spawnZombie, 900);
  activeGameLoop = spawnInterval;
}

// ============================================================================
// GAME 5: 🚀 SPACE ADVENTURE
// ============================================================================
function initSpaceAdventure(container) {
  container.innerHTML = `
    <div class="game-arena">
      <div class="game-hud">
        <span>Stardust: <b id="sa-score">0</b></span>
        <span>Steer: <b>Move Mouse / Touch</b></span>
      </div>
      <div class="game-canvas-wrapper">
        <canvas id="sa-canvas" width="460" height="300"></canvas>
      </div>
    </div>
  `;

  const canvas = document.getElementById("sa-canvas");
  const ctx = canvas.getContext("2d");
  const scoreEl = document.getElementById("sa-score");

  let shipX = 230;
  let shipY = 250;
  let score = 0;
  let stars = Array.from({ length: 40 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed: Math.random() * 3 + 1
  }));
  let meteors = [];
  let gameOver = false;

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    shipX = e.clientX - rect.left;
  });

  function loop() {
    if (gameOver) return;

    ctx.fillStyle = "#060310";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Moving stars
    ctx.fillStyle = "#ffffff";
    stars.forEach(star => {
      ctx.fillRect(star.x, star.y, 2, 2);
      star.y += star.speed;
      if (star.y > canvas.height) star.y = 0;
    });

    // Ship
    ctx.font = "30px Segoe UI Emoji";
    ctx.textAlign = "center";
    ctx.fillText("🚀", shipX, shipY);

    // Meteors
    if (Math.random() < 0.05) {
      meteors.push({
        x: Math.random() * (canvas.width - 40) + 20,
        y: -20,
        speed: Math.random() * 3 + 2.5
      });
    }

    for (let i = 0; i < meteors.length; i++) {
      const m = meteors[i];
      m.y += m.speed;
      ctx.font = "24px Segoe UI Emoji";
      ctx.fillText("☄️", m.x, m.y);

      // Collision
      const dist = Math.hypot(shipX - m.x, shipY - m.y);
      if (dist < 28) {
        gameOver = true;
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#c084fc";
        ctx.font = "bold 26px sans-serif";
        ctx.fillText("💥 SHIP HIT!", canvas.width / 2, 130);
        ctx.fillStyle = "#ffffff";
        ctx.font = "18px sans-serif";
        ctx.fillText(`Stardust Collected: ${score}`, canvas.width / 2, 170);
        return;
      }
    }

    meteors = meteors.filter(m => m.y < 340);
    score += 2;
    scoreEl.innerText = score;

    activeGameLoop = requestAnimationFrame(loop);
  }

  loop();
}

// ============================================================================
// GAME 6: 🏰 CASTLE QUEST
// ============================================================================
function initCastleQuest(container) {
  let playerPos = { r: 1, c: 1 };
  let goldCollected = 0;
  const gridRows = 4;
  const gridCols = 5;

  let gems = [
    { r: 0, c: 3 },
    { r: 2, c: 4 },
    { r: 3, c: 1 },
    { r: 1, c: 3 }
  ];

  container.innerHTML = `
    <div class="game-arena">
      <div class="game-hud">
        <span>Gems: <b id="cq-gold">0 / 4</b></span>
        <span>Move: <b>Arrow Keys or Buttons</b></span>
      </div>
      <div id="cq-dungeon" style="display: grid; grid-template-columns: repeat(5, 70px); gap: 8px;"></div>
      <div style="display: flex; gap: 10px; margin-top: 14px;">
        <button class="btn-play" onclick="moveCastlePlayer(-1, 0)">⬆️ Up</button>
        <button class="btn-play" onclick="moveCastlePlayer(1, 0)">⬇️ Down</button>
        <button class="btn-play" onclick="moveCastlePlayer(0, -1)">⬅️ Left</button>
        <button class="btn-play" onclick="moveCastlePlayer(0, 1)">➡️ Right</button>
      </div>
    </div>
  `;

  function renderGrid() {
    const dungeon = document.getElementById("cq-dungeon");
    if (!dungeon) return;
    dungeon.innerHTML = "";

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const tile = document.createElement("div");
        tile.style.cssText = `
          width: 70px; height: 70px; background: #140b2e; border: 1.5px solid #6b21a8;
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
          font-size: 26px; box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
        `;

        if (playerPos.r === r && playerPos.c === c) {
          tile.innerText = "🦆";
          tile.style.background = "#3b176d";
          tile.style.borderColor = "#c084fc";
        } else if (gems.some(g => g.r === r && g.c === c)) {
          tile.innerText = "💎";
        } else {
          tile.innerText = "🧱";
          tile.style.opacity = "0.35";
        }

        dungeon.appendChild(tile);
      }
    }
  }

  window.moveCastlePlayer = (dr, dc) => {
    const nr = playerPos.r + dr;
    const nc = playerPos.c + dc;
    if (nr >= 0 && nr < gridRows && nc >= 0 && nc < gridCols) {
      playerPos.r = nr;
      playerPos.c = nc;

      const gemIdx = gems.findIndex(g => g.r === nr && g.c === nc);
      if (gemIdx !== -1) {
        gems.splice(gemIdx, 1);
        goldCollected++;
        document.getElementById("cq-gold").innerText = `${goldCollected} / 4`;
        if (gems.length === 0) {
          setTimeout(() => {
            container.innerHTML = `
              <div style="text-align: center; padding: 30px;">
                <h2 style="color: #fbbf24; font-size: 2rem; margin-bottom: 12px;">👑 Castle Cleared!</h2>
                <p style="font-size: 1.25rem; color: #f3e8ff; margin-bottom: 20px;">You retrieved all mythical dungeon gems!</p>
                <button class="btn-play" onclick="launchGame('castle-quest')">🔄 Play Again</button>
              </div>
            `;
          }, 300);
          return;
        }
      }
      renderGrid();
    }
  };

  const keyHandler = (e) => {
    if (e.key === "ArrowUp") window.moveCastlePlayer(-1, 0);
    if (e.key === "ArrowDown") window.moveCastlePlayer(1, 0);
    if (e.key === "ArrowLeft") window.moveCastlePlayer(0, -1);
    if (e.key === "ArrowRight") window.moveCastlePlayer(0, 1);
  };

  window.addEventListener("keydown", keyHandler);
  renderGrid();
}

// ============================================================================
// MODAL CLOSE LISTENERS
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("gameModal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeGameModal();
      }
    });
  }

  // Display logged in gamer state if available
  const activeUser = localStorage.getItem("duckUser");
  if (activeUser) {
    const userDisplay = document.getElementById("navUserDisplay");
    if (userDisplay) {
      userDisplay.innerHTML = `👋 Hello, <b>${activeUser}</b> | <a href="#" id="btnLogout" style="color:#f87171; text-decoration:none;">Logout</a>`;
      document.getElementById("btnLogout")?.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("duckUser");
        window.location.reload();
      });
    }
  }
});
