/**
 * Week 8: Asynchronous Text Data Loading Engine
 * Demonstrates loading text data using both XMLHttpRequest and Fetch API
 */

// Method 1: Modern Fetch API (Promise & Async/Await)
async function loadTextUsingFetch() {
  const output = document.getElementById("textOutput");
  const statusBadge = document.getElementById("statusBadge");
  const metaInfo = document.getElementById("metaInfo");

  output.innerText = "⏳ Requesting game-patchnotes.txt using Fetch API...";
  statusBadge.innerText = "Connecting...";
  statusBadge.style.background = "#f59e0b";

  const startTime = performance.now();

  try {
    const response = await fetch("game-patchnotes.txt");
    const duration = Math.round(performance.now() - startTime);

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    const textContent = await response.text();

    output.innerText = textContent;
    statusBadge.innerText = `HTTP ${response.status} OK`;
    statusBadge.style.background = "#10b981";

    metaInfo.innerHTML = `
      <span>Method: <b>Fetch API (async/await)</b></span> | 
      <span>Response Time: <b>${duration} ms</b></span> | 
      <span>Size: <b>${textContent.length} bytes</b></span>
    `;
  } catch (error) {
    output.innerText = `❌ Error loading text file: ${error.message}`;
    statusBadge.innerText = "Failed";
    statusBadge.style.background = "#ef4444";
  }
}

// Method 2: Traditional AJAX (XMLHttpRequest)
function loadTextUsingXHR() {
  const output = document.getElementById("textOutput");
  const statusBadge = document.getElementById("statusBadge");
  const metaInfo = document.getElementById("metaInfo");

  output.innerText = "⏳ Initializing XMLHttpRequest object...";
  statusBadge.innerText = "XHR Sending...";
  statusBadge.style.background = "#3b82f6";

  const startTime = performance.now();
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "game-patchnotes.txt", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      const duration = Math.round(performance.now() - startTime);

      if (xhr.status === 200) {
        output.innerText = xhr.responseText;
        statusBadge.innerText = `HTTP ${xhr.status} OK`;
        statusBadge.style.background = "#10b981";

        metaInfo.innerHTML = `
          <span>Method: <b>XMLHttpRequest (AJAX)</b></span> | 
          <span>ReadyState: <b>4 (DONE)</b></span> | 
          <span>Response Time: <b>${duration} ms</b></span>
        `;
      } else {
        output.innerText = `❌ XHR Error! Status code: ${xhr.status}`;
        statusBadge.innerText = `Error ${xhr.status}`;
        statusBadge.style.background = "#ef4444";
      }
    }
  };

  xhr.onerror = function () {
    output.innerText = "❌ Network request failed in XMLHttpRequest.";
    statusBadge.innerText = "Network Error";
    statusBadge.style.background = "#ef4444";
  };

  xhr.send();
}

function clearDisplay() {
  document.getElementById("textOutput").innerText = "Click one of the buttons above to fetch text data asynchronously.";
  document.getElementById("statusBadge").innerText = "Idle";
  document.getElementById("statusBadge").style.background = "#6b7280";
  document.getElementById("metaInfo").innerHTML = "Awaiting request trigger...";
}
