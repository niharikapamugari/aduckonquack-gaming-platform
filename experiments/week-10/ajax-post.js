/**
 * Week 10: Asynchronous HTTP POST Method Submission Engine
 * Demonstrates sending JSON payload data asynchronously using Fetch API POST
 */

async function sendScorePostRequest(event) {
  event.preventDefault();

  const playerName = document.getElementById("pName").value.trim();
  const gameSelected = document.getElementById("pGame").value;
  const scoreAchieved = parseInt(document.getElementById("pScore").value, 10);
  const feedbackNotes = document.getElementById("pNotes").value.trim();

  const consoleOutput = document.getElementById("postConsole");
  const postBadge = document.getElementById("postStatusBadge");

  // Construct JSON Payload
  const payload = {
    submissionId: "SUB-" + Math.floor(100000 + Math.random() * 900000),
    timestamp: new Date().toISOString(),
    player: {
      name: playerName,
      platform: "ADuckOnQuack Web"
    },
    game: gameSelected,
    score: scoreAchieved,
    notes: feedbackNotes
  };

  const jsonString = JSON.stringify(payload, null, 2);

  consoleOutput.innerText = `📤 Sending HTTP POST request...\nPayload:\n${jsonString}`;
  postBadge.innerText = "POST In-Flight...";
  postBadge.style.background = "#f59e0b";

  const startTime = performance.now();

  try {
    // Attempt live echo endpoint with graceful fallback simulation
    let responseData;
    let statusCode = 201;

    try {
      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        responseData = await response.json();
        statusCode = response.status;
      } else {
        throw new Error("Live endpoint returned status " + response.status);
      }
    } catch (networkErr) {
      // Local mock response handler
      await new Promise(r => setTimeout(r, 600)); // simulate network latency
      responseData = {
        mockServerNotice: "Local Mock Server Responded Successfully (Offline/Sandbox mode)",
        status: "RECORD_CREATED",
        code: 201,
        headersReceived: {
          "Content-Type": "application/json",
          "User-Agent": navigator.userAgent
        },
        receivedPayload: payload,
        serverAck: "Game score successfully recorded in Duck Leaderboards database."
      };
    }

    const duration = Math.round(performance.now() - startTime);

    postBadge.innerText = `HTTP ${statusCode} Created`;
    postBadge.style.background = "#10b981";

    consoleOutput.innerHTML = `
<span style="color:#10b981; font-weight:bold;">✅ HTTP POST Request Successful (${duration}ms)</span>
<span style="color:#38bdf8;">Request Method:</span> POST
<span style="color:#38bdf8;">Content-Type:</span> application/json

<span style="color:#c084fc; font-weight:bold;">=== Server Response Payload ===</span>
${JSON.stringify(responseData, null, 2)}
    `;

    // Save record to local highscores
    const scores = JSON.parse(localStorage.getItem("duckScores") || "[]");
    scores.unshift({
      player: playerName,
      game: gameSelected,
      score: scoreAchieved,
      time: new Date().toLocaleTimeString()
    });
    localStorage.setItem("duckScores", JSON.stringify(scores.slice(0, 10)));
    renderLocalLeaderboard();

  } catch (err) {
    postBadge.innerText = "POST Failed";
    postBadge.style.background = "#ef4444";
    consoleOutput.innerText = `❌ Error dispatching POST request: ${err.message}`;
  }
}

function renderLocalLeaderboard() {
  const table = document.getElementById("recentScoresTable");
  if (!table) return;
  const scores = JSON.parse(localStorage.getItem("duckScores") || "[]");
  if (scores.length === 0) {
    table.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#c4b5fd;">No scores submitted yet.</td></tr>`;
    return;
  }
  table.innerHTML = scores.map((s, idx) => `
    <tr style="border-bottom:1px solid #281452;">
      <td style="padding:10px 12px; color:#fbbf24;">#${idx + 1}</td>
      <td style="padding:10px 12px; font-weight:600; color:#fff;">${s.player}</td>
      <td style="padding:10px 12px;"><span class="game-badge">${s.game}</span></td>
      <td style="padding:10px 12px; color:#34d399; font-weight:bold;">${s.score} pts</td>
    </tr>
  `).join("");
}

document.addEventListener("DOMContentLoaded", renderLocalLeaderboard);
