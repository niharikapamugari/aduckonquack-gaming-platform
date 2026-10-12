# 🦆 ADuckOnQuack - Multi-Gaming Website & Web Programming Lab Portfolio

An interactive, responsive multi-gaming web platform and academic lab portfolio built strictly in accordance with the **Enterprise Web Programming (EWP) List of Experiments (Weeks 1 to 14)**.

---

## 📸 Visual Design & Fidelity
The final web application faithfully recreates the visual design from the project specification screenshot:
- **Header Branding:** `🦆 ADuckOnQuack`
- **Navigation Links:** `🏠 Home`, `🎮 Games`, `📝 Register`, `🔑 Login`, `🧪 Lab Experiments (1-14)`
- **Header Title:** `🎮 Duck Game Collection` with glowing neon purple styling (`text-shadow: 0 0 15px #c084fc, 0 0 30px #9333ea`)
- **Subtitle:** `Choose your favorite game!`
- **Top Row (5 Game Cards):**
  1. `🎯 Target Shooter` - Click moving targets before the timer expires.
  2. `🧩 Puzzle Quest` - Memory glyph tile matching game.
  3. `🏎️ Speed Racer` - High-speed obstacle dodging retro racing game.
  4. `🧟 Zombie Attack` - Fortress clicker defense game against zombie waves.
  5. `🚀 Space Adventure` - Spaceship asteroid shooting and dodging game.
- **Centered Bottom Row (6th Game Card):**
  6. `🏰 Castle Quest` - Dungeon gem retrieval game dodging spiked walls.
- **Redirection Flow:**
  - Clicking **Login** navigates to `login.html` (or `#/login` in SPA mode).
  - Clicking **Register** navigates to `register.html` (or `#/register` in SPA mode).
  - Submitting Registration stores the user profile and redirects to Login.
  - Submitting Login authenticates the gamer and redirects back to the Duck Game Collection.

---

## 🗂️ Lab Experiments Curriculum Breakdown (Weeks 1 to 14)

| Week | Experiment Description | Implementation Path | Key Concepts Covered |
| :--- | :--- | :--- | :--- |
| **Week 1** | Develop static web pages required for a website: Home Page, Login Page. | [`experiments/week-01/`](file:///c:/Users/USER/OneDrive/Desktop/ewp%20website/experiments/week-01/) | Semantic HTML5 structure, `<header>`, `<nav>`, `<main>`, `<section>`, `<form>`, `<fieldset>`, `<table>` |
| **Week 2** | Create student Registration Page using HTML forms with basic input validations. | [`experiments/week-02/`](file:///c:/Users/USER/OneDrive/Desktop/ewp%20website/experiments/week-02/) | Form attributes: `required`, `pattern`, `minlength`, `type="email"`, `type="tel"`, `type="date"`, radio buttons, select dropdowns |
| **Week 3** | Apply internal, external, and inline CSS for week 1 and week 2 pages. | [`experiments/week-03/`](file:///c:/Users/USER/OneDrive/Desktop/ewp%20website/experiments/week-03/) | External CSS via `<link>`, Internal CSS via `<style>`, Inline CSS via `style="..."`, specificity hierarchy |
| **Week 4** | Write JavaScript programs to validate the fields of the student registration page. | [`experiments/week-04/`](file:///c:/Users/USER/OneDrive/Desktop/ewp%20website/experiments/week-04/) | Regex pattern matching (`/^[a-zA-Z\s]{3,35}$/`, `/^[0-9]{10}$/`), age calculation, live error feedback, DOM styling |
| **Week 5** | Design the catalogue page for the website using HTML, CSS, and JavaScript. | [`experiments/week-05/`](file:///c:/Users/USER/OneDrive/Desktop/ewp%20website/experiments/week-05/) | Responsive game grid, dynamic search filter, category pill filtering, rating indicators, interactive game modal |
| **Week 6** | Write an XML file to display Game information. Write a DTD to validate the XML file. | [`experiments/week-06/`](file:///c:/Users/USER/OneDrive/Desktop/ewp%20website/experiments/week-06/) | `games.dtd` schema definition (`<!ELEMENT>`, `<!ATTLIST>`, `#PCDATA`, IDs), `games.xml` well-formed XML, `DOMParser` |
| **Week 7** | Review and Skill Test-1. | [`experiments/week-07/`](file:///c:/Users/USER/OneDrive/Desktop/ewp%20website/experiments/week-07/) | Interactive 5-question comprehensive quiz covering Weeks 1-6 with instant scoring, explanations, and certificate |
| **Week 8** | Write an Ajax / Fetch API program to load text data asynchronously. | [`experiments/week-08/`](file:///c:/Users/USER/OneDrive/Desktop/ewp%20website/experiments/week-08/) | Fetch API (async/await, promises) and traditional `XMLHttpRequest`, HTTP response codes, latency timing |
| **Week 9** | Write an Ajax / Fetch API program to parse JSON/XML response data. | [`experiments/week-09/`](file:///c:/Users/USER/OneDrive/Desktop/ewp%20website/experiments/week-09/) | `response.json()` parsing into cards, XML `response.text()` + `DOMParser` node extraction into tables |
| **Week 10** | Write an Ajax / Fetch program to send data using POST method. | [`experiments/week-10/`](file:///c:/Users/USER/OneDrive/Desktop/ewp%20website/experiments/week-10/) | HTTP POST with custom headers (`Content-Type: application/json`), payload serialization, response handling |
| **Week 11** | Develop TypeScript programs using classes, interfaces, and functions. | [`experiments/week-11/`](file:///c:/Users/USER/OneDrive/Desktop/ewp%20website/experiments/week-11/) | `game_system.ts`: Interfaces (`IGame`, `IPlayer`), Abstract classes, Inheritance, Generics, typed arrow functions |
| **Week 12** | Create Angular components and implement data binding, directives. | [`experiments/week-12/`](file:///c:/Users/USER/OneDrive/Desktop/ewp%20website/experiments/week-12/) | Interpolation `{{}}`, Property binding `[]`, Event binding `()`, Two-way binding `[()]`, `*ngIf`, `*ngFor`, `ngSwitch`, `ngClass`, `ngStyle` |
| **Week 13-14** | Develop Angular forms, routing, and services for a sample single-page application. | [`experiments/week-13-14/`](file:///c:/Users/USER/OneDrive/Desktop/ewp%20website/experiments/week-13-14/) | Angular SPA architecture: Angular Router (`/home`, `/games`, `/login`, `/register`), `AuthService`, `GameService`, Reactive Forms |

---

## 🚀 How to Run the Website
Because this project is built using native web standards:
1. Simply double-click **[`index.html`](file:///c:/Users/USER/OneDrive/Desktop/ewp%20website/index.html)** or **[`games.html`](file:///c:/Users/USER/OneDrive/Desktop/ewp%20website/games.html)** to launch the site in Google Chrome, Microsoft Edge, or Mozilla Firefox.
2. Or use VS Code Live Server / any local web server.
3. Access **[`experiments/index.html`](file:///c:/Users/USER/OneDrive/Desktop/ewp%20website/experiments/index.html)** to inspect or demonstrate any specific week's lab experiment to faculty or evaluators.

---

## 🎮 Playable Games Built-In
Clicking **"Play Game"** on any card opens an interactive gaming modal:
1. **Target Shooter:** Click moving glowing duck targets within 25 seconds.
2. **Puzzle Quest:** Flip and match pairs of hidden duck runes.
3. **Speed Racer:** Dodge oncoming highway traffic using arrow keys or steering buttons.
4. **Zombie Attack:** Click descending zombies before they damage your castle fortress.
5. **Space Adventure:** Steer the duck starship to dodge celestial asteroids.
6. **Castle Quest:** Move the duck knight across the dungeon grid to collect all 4 gems.
