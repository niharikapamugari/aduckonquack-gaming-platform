/**
 * Week 11: Compiled Executable JavaScript equivalent of game_system.ts
 * Implements the classes, interfaces simulation, and typed functions
 */

const GameGenre = {
  ARCADE: "Arcade",
  PUZZLE: "Puzzle",
  RACING: "Racing",
  ACTION: "Action",
  SCIFI: "Sci-Fi",
  RPG: "RPG"
};

class BaseGame {
  constructor(id, title, genre, rating = 4.5, playCount = 0) {
    this.id = id;
    this.title = title;
    this.genre = genre;
    this.rating = rating;
    this.playCount = playCount;
  }

  incrementPlay() {
    this.playCount++;
  }
}

class ArcadeGame extends BaseGame {
  constructor(id, title, rating = 4.8) {
    super(id, title, GameGenre.ARCADE, rating);
  }

  calculateScore(baseScore, bonusMultiplier) {
    return Math.round(baseScore * bonusMultiplier * 1.5);
  }
}

class RacingGame extends BaseGame {
  constructor(id, title, rating = 4.7) {
    super(id, title, GameGenre.RACING, rating);
  }

  calculateScore(distanceTraveled, speedMultiplier) {
    return Math.round((distanceTraveled * 2) + (speedMultiplier * 100));
  }
}

class DuckPlayer {
  constructor(username, studentId, email) {
    this.username = username;
    this.studentId = studentId;
    this.email = email;
    this.level = 1;
    this.totalScore = 0;
  }

  addScore(points) {
    this.totalScore += points;
    this.level = Math.floor(this.totalScore / 500) + 1;
  }

  getProfileSummary() {
    return `Player [${this.username}] | Student ID: ${this.studentId} | Level: ${this.level} | Total Score: ${this.totalScore}`;
  }
}

class GameRepository {
  constructor() {
    this.items = new Map();
  }

  add(item) {
    this.items.set(item.id, item);
  }

  getById(id) {
    return this.items.get(id);
  }

  getAll() {
    return Array.from(this.items.values());
  }
}

function filterGamesByRating(games, minRating) {
  return games.filter(g => g.rating >= minRating);
}

function sortGamesByPopularity(games) {
  return [...games].sort((a, b) => b.playCount - a.playCount);
}

// Interactive Browser Runner
const repo = new GameRepository();
repo.add(new ArcadeGame("g1", "Target Shooter (TypeScript)", 4.8));
repo.add(new RacingGame("g2", "Speed Racer (TypeScript)", 4.7));

let currentPlayer = new DuckPlayer("TypeScriptMaster", "EWP-TS-2026", "ts@duck.local");

function runTypeScriptDemo() {
  const logBox = document.getElementById("tsConsole");
  let output = "";

  function log(msg) {
    output += msg + "\n";
  }

  log("==================================================");
  log("🚀 EXECUTING TYPESCRIPT COMPILED LOGIC");
  log("==================================================");
  log("1. Instantiating DuckPlayer class from IPlayer interface:");
  log("   -> " + currentPlayer.getProfileSummary());

  log("\n2. Simulating gameplay in ArcadeGame class:");
  const shooter = repo.getById("g1");
  shooter.incrementPlay();
  const arcadeScore = shooter.calculateScore(120, 2.5);
  currentPlayer.addScore(arcadeScore);
  log(`   -> Game: ${shooter.title} (Genre: ${shooter.genre}, Rating: ${shooter.rating})`);
  log(`   -> Calculated Score: ${arcadeScore} pts`);
  log(`   -> Updated Player State: ${currentPlayer.getProfileSummary()}`);

  log("\n3. Simulating gameplay in RacingGame class:");
  const racer = repo.getById("g2");
  racer.incrementPlay();
  const racerScore = racer.calculateScore(350, 4.0);
  currentPlayer.addScore(racerScore);
  log(`   -> Game: ${racer.title} (Genre: ${racer.genre})`);
  log(`   -> Calculated Score: ${racerScore} pts`);
  log(`   -> Updated Player State: ${currentPlayer.getProfileSummary()}`);

  log("\n4. Testing Generics & High-Order Functions:");
  const allGames = repo.getAll();
  log(`   -> Repository Total Items: ${allGames.length}`);
  const highRated = filterGamesByRating(allGames, 4.75);
  log(`   -> High-Rated Games (>= 4.75): ${highRated.map(g => g.title).join(", ")}`);
  log("==================================================");
  log("✅ TypeScript Classes, Interfaces & Functions Executed Successfully.");

  logBox.innerText = output;
}

document.addEventListener("DOMContentLoaded", runTypeScriptDemo);
