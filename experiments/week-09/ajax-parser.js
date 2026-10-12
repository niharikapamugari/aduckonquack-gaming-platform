/**
 * Week 9: Asynchronous JSON and XML Response Parsing Engine
 * Demonstrates loading & parsing JSON (via response.json) and XML (via DOMParser)
 */

async function fetchAndParseJSON() {
  const container = document.getElementById("parserOutput");
  const metaBox = document.getElementById("parseMeta");
  container.innerHTML = "<div style='color:#c4b5fd; text-align:center;'>⏳ Fetching games-data.json...</div>";

  try {
    const res = await fetch("games-data.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

    const data = await res.json();

    metaBox.innerHTML = `
      <span class="game-badge" style="background:#10b981; color:#fff;">Format: JSON (JavaScript Object Notation)</span>
      <span>Platform: <b>${data.platform}</b></span> | 
      <span>Total Count: <b>${data.games.length} games</b></span>
    `;

    container.innerHTML = `
      <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px;">
        ${data.games.map(g => `
          <div style="background:#150d35; border:1px solid #a855f7; border-radius:12px; padding:18px; box-shadow:0 0 12px rgba(168,85,247,0.3);">
            <div style="font-size:1.8rem; margin-bottom:8px;">${g.icon}</div>
            <h3 style="color:#ffffff; font-size:1.15rem; margin-bottom:6px;">${g.title}</h3>
            <p style="color:#c4b5fd; font-size:0.85rem; margin-bottom:8px;">Category: <b>${g.category}</b> | Year: ${g.releaseYear}</p>
            <p style="color:#fbbf24; font-size:0.9rem; margin-bottom:10px;">★ Rating: ${g.rating} / 5.0</p>
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              ${g.tags.map(t => `<span style="background:rgba(124,58,237,0.3); border:1px solid #7c3aed; padding:2px 8px; border-radius:6px; font-size:0.75rem; color:#e9d5ff;">${t}</span>`).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  } catch (err) {
    container.innerHTML = `<div style="color:#ef4444;">❌ Failed to parse JSON: ${err.message}</div>`;
  }
}

async function fetchAndParseXML() {
  const container = document.getElementById("parserOutput");
  const metaBox = document.getElementById("parseMeta");
  container.innerHTML = "<div style='color:#c4b5fd; text-align:center;'>⏳ Fetching games-data.xml...</div>";

  try {
    const res = await fetch("games-data.xml");
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

    const xmlText = await res.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    // Check for XML parse errors
    const parseError = xmlDoc.getElementsByTagName("parsererror");
    if (parseError.length > 0) {
      throw new Error(parseError[0].textContent);
    }

    const platform = xmlDoc.documentElement.getAttribute("platform");
    const gameNodes = xmlDoc.getElementsByTagName("game");

    metaBox.innerHTML = `
      <span class="game-badge" style="background:#3b82f6; color:#fff;">Format: XML (Extensible Markup Language)</span>
      <span>Platform: <b>${platform}</b></span> | 
      <span>Nodes Parsed: <b>${gameNodes.length} nodes</b></span>
    `;

    let html = `
      <table style="width:100%; border-collapse:collapse; background:#140b30; border-radius:10px; overflow:hidden; border:1px solid #7c3aed;">
        <thead>
          <tr style="background:#1e0e47; color:#c084fc; text-align:left;">
            <th style="padding:12px 14px;">Icon</th>
            <th style="padding:12px 14px;">ID</th>
            <th style="padding:12px 14px;">Title</th>
            <th style="padding:12px 14px;">Category</th>
            <th style="padding:12px 14px;">Rating</th>
            <th style="padding:12px 14px;">Year</th>
            <th style="padding:12px 14px;">Developer</th>
          </tr>
        </thead>
        <tbody>
    `;

    for (let i = 0; i < gameNodes.length; i++) {
      const g = gameNodes[i];
      const id = g.getAttribute("id");
      const title = g.getElementsByTagName("title")[0]?.textContent;
      const icon = g.getElementsByTagName("icon")[0]?.textContent;
      const category = g.getElementsByTagName("category")[0]?.textContent;
      const rating = g.getElementsByTagName("rating")[0]?.textContent;
      const year = g.getElementsByTagName("releaseYear")[0]?.textContent;
      const dev = g.getElementsByTagName("developer")[0]?.textContent;

      html += `
        <tr style="border-bottom:1px solid #281452;">
          <td style="padding:12px 14px; font-size:1.4rem;">${icon}</td>
          <td style="padding:12px 14px; color:#38bdf8;"><code>${id}</code></td>
          <td style="padding:12px 14px; font-weight:600; color:#fff;">${title}</td>
          <td style="padding:12px 14px;"><span class="game-badge">${category}</span></td>
          <td style="padding:12px 14px; color:#fbbf24;">★ ${rating}</td>
          <td style="padding:12px 14px;">${year}</td>
          <td style="padding:12px 14px; color:#c4b5fd;">${dev}</td>
        </tr>
      `;
    }

    html += `</tbody></table>`;
    container.innerHTML = html;
  } catch (err) {
    container.innerHTML = `<div style="color:#ef4444;">❌ Failed to parse XML: ${err.message}</div>`;
  }
}
