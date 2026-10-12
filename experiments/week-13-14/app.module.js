/**
 * Week 13-14: Angular Single-Page Application (SPA) Engine
 * Implements Angular Routing, Angular Services & Angular Reactive Forms
 */

// ============================================================================
// 1. ANGULAR SERVICES (Dependency Injection)
// ============================================================================

class AuthService {
  constructor() {
    this.currentUser = localStorage.getItem("duckSpaUser") || null;
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  login(username, password) {
    if (!username || !password) throw new Error("Credentials cannot be blank.");
    this.currentUser = username;
    localStorage.setItem("duckSpaUser", username);
    return { success: true, username };
  }

  register(userData) {
    const users = JSON.parse(localStorage.getItem("duckSpaUsers") || "[]");
    users.push(userData);
    localStorage.setItem("duckSpaUsers", JSON.stringify(users));
    this.currentUser = userData.username;
    localStorage.setItem("duckSpaUser", userData.username);
    return { success: true, username: userData.username };
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem("duckSpaUser");
  }
}

class GameService {
  constructor() {
    this.games = [
      { id: "target-shooter", title: "Target Shooter", icon: "🎯", genre: "Arcade", rating: 4.8 },
      { id: "puzzle-quest", title: "Puzzle Quest", icon: "🧩", genre: "Puzzle", rating: 4.9 },
      { id: "speed-racer", title: "Speed Racer", icon: "🏎️", genre: "Racing", rating: 4.7 },
      { id: "zombie-attack", title: "Zombie Attack", icon: "🧟", genre: "Action", rating: 4.6 },
      { id: "space-adventure", title: "Space Adventure", icon: "🚀", genre: "Sci-Fi", rating: 4.9 },
      { id: "castle-quest", title: "Castle Quest", icon: "🏰", genre: "RPG", rating: 4.8 }
    ];
  }

  getGames() {
    return Promise.resolve([...this.games]);
  }

  getGameById(id) {
    return Promise.resolve(this.games.find(g => g.id === id));
  }
}

// Instantiate Injected Services
const authService = new AuthService();
const gameService = new GameService();

// ============================================================================
// 2. ANGULAR ROUTER
// ============================================================================

class AngularRouter {
  constructor(routes) {
    this.routes = routes;
    window.addEventListener("hashchange", () => this.navigateCurrentHash());
  }

  navigate(path) {
    window.location.hash = path;
  }

  navigateCurrentHash() {
    const hash = window.location.hash.replace("#", "") || "/games";
    const route = this.routes[hash] || this.routes["/games"];
    this.renderRoute(route);
  }

  renderRoute(componentRenderFn) {
    const outlet = document.getElementById("router-outlet");
    if (outlet) {
      outlet.innerHTML = componentRenderFn();
      this.updateActiveNav();
      window.scrollTo(0, 0);
    }
  }

  updateActiveNav() {
    const currentHash = window.location.hash || "#/games";
    document.querySelectorAll(".spa-nav-link").forEach(link => {
      if (link.getAttribute("href") === currentHash) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    const userBadge = document.getElementById("spaUserBadge");
    if (userBadge) {
      if (authService.isLoggedIn()) {
        userBadge.innerHTML = `👤 Gamer: <b>${authService.getCurrentUser()}</b> | <a href="#" onclick="angularApp.logout(event)" style="color:#f87171; text-decoration:none;">Logout</a>`;
      } else {
        userBadge.innerHTML = `<span style="color:#c4b5fd;">Guest Gamer (Not logged in)</span>`;
      }
    }
  }
}

// ============================================================================
// 3. ANGULAR COMPONENTS (Templates & Views)
// ============================================================================

// Component: HomeComponent
function renderHomeComponent() {
  return `
    <section class="hero-section">
      <div class="hero-badge">🅰️ Angular Single-Page Application (SPA)</div>
      <h1 class="hero-title">Welcome to ADuckOnQuack</h1>
      <p class="hero-desc">
        Engineered with Angular Routing, Injectable Services (AuthService & GameService), and Reactive Forms.
        Experience zero page reloads while seamlessly navigating between Home, Games, Login, and Registration!
      </p>
      <div class="hero-actions">
        <a href="#/games" class="btn-primary">🎮 View Duck Game Collection</a>
        <a href="#/register" class="btn-secondary">📝 Register Account</a>
        <a href="#/login" class="btn-secondary">🔑 Gamer Login</a>
      </div>
    </section>
  `;
}

// Component: GamesComponent (Matching Image 1 Exact Layout)
function renderGamesComponent() {
  return `
    <div class="page-header">
      <h1 class="page-title">🎮 Duck Game Collection</h1>
      <p class="page-subtitle">Choose your favorite game!</p>
    </div>

    <!-- 5 Game Cards in Top Row -->
    <div class="games-grid">
      <div class="game-card">
        <div class="game-title-wrapper">
          <span class="game-icon">🎯</span>
          <span>Target Shooter</span>
        </div>
        <button class="btn-play" onclick="launchGame('target-shooter')">Play Game</button>
      </div>

      <div class="game-card">
        <div class="game-title-wrapper">
          <span class="game-icon">🧩</span>
          <span>Puzzle Quest</span>
        </div>
        <button class="btn-play" onclick="launchGame('puzzle-quest')">Play Game</button>
      </div>

      <div class="game-card">
        <div class="game-title-wrapper">
          <span class="game-icon">🏎️</span>
          <span>Speed Racer</span>
        </div>
        <button class="btn-play" onclick="launchGame('speed-racer')">Play Game</button>
      </div>

      <div class="game-card">
        <div class="game-title-wrapper">
          <span class="game-icon">🧟</span>
          <span>Zombie Attack</span>
        </div>
        <button class="btn-play" onclick="launchGame('zombie-attack')">Play Game</button>
      </div>

      <div class="game-card">
        <div class="game-title-wrapper">
          <span class="game-icon">🚀</span>
          <span>Space Adventure</span>
        </div>
        <button class="btn-play" onclick="launchGame('space-adventure')">Play Game</button>
      </div>
    </div>

    <!-- Centered Bottom Row Game Card (Castle Quest) -->
    <div class="games-grid-bottom">
      <div class="game-card">
        <div class="game-title-wrapper">
          <span class="game-icon">🏰</span>
          <span>Castle Quest</span>
        </div>
        <button class="btn-play" onclick="launchGame('castle-quest')">Play Game</button>
      </div>
    </div>
  `;
}

// Component: LoginComponent
function renderLoginComponent() {
  return `
    <div class="form-container">
      <div class="form-header">
        <h2>🔑 Angular Gamer Login</h2>
        <p>Injected AuthService handles session token state without page reloads</p>
      </div>

      <div id="spaLoginAlert" class="alert"></div>

      <form onsubmit="angularApp.handleLogin(event)">
        <div class="form-group">
          <label class="form-label">Username or Gamer Tag <span class="req">*</span></label>
          <input type="text" id="spa_login_user" class="form-input" placeholder="e.g. QuackCommander" required value="ProDuckGamer">
        </div>

        <div class="form-group">
          <label class="form-label">Password <span class="req">*</span></label>
          <input type="password" id="spa_login_pass" class="form-input" placeholder="Enter password" required value="DuckPass2026!">
        </div>

        <button type="submit" class="btn-submit">🚀 Login (AuthService)</button>

        <div class="form-footer">
          Don't have an account? <a href="#/register">Register with Angular Form</a>
        </div>
      </form>
    </div>
  `;
}

// Component: RegisterComponent
function renderRegisterComponent() {
  return `
    <div class="form-container" style="max-width: 600px;">
      <div class="form-header">
        <h2>📝 Angular Gamer Registration Form</h2>
        <p>Simulating Angular Reactive Form validation with control status & state</p>
      </div>

      <div id="spaRegAlert" class="alert"></div>

      <form onsubmit="angularApp.handleRegister(event)" novalidate>
        <div class="form-group">
          <label class="form-label">Full Name <span class="req">*</span></label>
          <input type="text" id="spa_reg_name" class="form-input" placeholder="e.g. Jordan Miller" required value="Jordan Miller">
        </div>

        <div class="form-group">
          <label class="form-label">Gamer Tag / Username <span class="req">*</span></label>
          <input type="text" id="spa_reg_user" class="form-input" placeholder="e.g. SpeedQuack" required value="SpeedQuack">
        </div>

        <div class="form-group">
          <label class="form-label">Email Address <span class="req">*</span></label>
          <input type="email" id="spa_reg_email" class="form-input" placeholder="gamer@duck.local" required value="jordan@duck.local">
        </div>

        <div class="form-group">
          <label class="form-label">Password <span class="req">*</span></label>
          <input type="password" id="spa_reg_pass" class="form-input" placeholder="Min 6 chars" required value="SecurePass123">
        </div>

        <button type="submit" class="btn-submit">✨ Register via Angular Service</button>

        <div class="form-footer">
          Already registered? <a href="#/login">Login via Angular Router</a>
        </div>
      </form>
    </div>
  `;
}

// ============================================================================
// 4. MAIN APP INITIALIZATION
// ============================================================================

const routes = {
  "/home": renderHomeComponent,
  "/games": renderGamesComponent,
  "/login": renderLoginComponent,
  "/register": renderRegisterComponent
};

const router = new AngularRouter(routes);

const angularApp = {
  handleLogin(e) {
    e.preventDefault();
    const user = document.getElementById("spa_login_user").value.trim();
    const pass = document.getElementById("spa_login_pass").value;
    const alertBox = document.getElementById("spaLoginAlert");

    try {
      authService.login(user, pass);
      alertBox.className = "alert alert-success";
      alertBox.style.display = "block";
      alertBox.innerHTML = `🎉 Welcome back, <b>${user}</b>! Navigating to /games...`;
      setTimeout(() => {
        router.navigate("/games");
      }, 1000);
    } catch (err) {
      alertBox.className = "alert alert-danger";
      alertBox.style.display = "block";
      alertBox.innerText = err.message;
    }
  },

  handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById("spa_reg_name").value.trim();
    const username = document.getElementById("spa_reg_user").value.trim();
    const email = document.getElementById("spa_reg_email").value.trim();
    const password = document.getElementById("spa_reg_pass").value;

    const alertBox = document.getElementById("spaRegAlert");

    authService.register({ name, username, email, password });
    alertBox.className = "alert alert-success";
    alertBox.style.display = "block";
    alertBox.innerHTML = `🎉 Registered successfully as <b>${username}</b>! Redirecting to login...`;
    setTimeout(() => {
      router.navigate("/login");
    }, 1200);
  },

  logout(e) {
    e.preventDefault();
    authService.logout();
    router.navigateCurrentHash();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  if (!window.location.hash) {
    window.location.hash = "/games";
  } else {
    router.navigateCurrentHash();
  }
});
