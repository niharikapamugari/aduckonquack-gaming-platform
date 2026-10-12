/**
 * Week 7: Review & Skill Test-1 Evaluation Engine
 * Tests competency over Experiments 1 to 6 (HTML, Forms, CSS, JS, XML/DTD)
 */

const TEST_QUESTIONS = [
  {
    q: "1. Which HTML5 attribute enforces an input field to be mandatory before form submission?",
    options: ["validate", "required", "mandatory", "enforce"],
    answer: 1,
    explanation: "The 'required' attribute specifies that an input field must be filled out before submitting."
  },
  {
    q: "2. Which CSS method carries the highest specificity precedence order?",
    options: ["External stylesheet (<link>)", "Internal stylesheet (<style>)", "Inline CSS (style attribute)", "Browser user-agent default"],
    answer: 2,
    explanation: "Inline CSS applied directly on an element overrides internal, external, and browser default styles."
  },
  {
    q: "3. What regular expression test correctly validates an Indian 10-digit mobile number?",
    options: ["/^[0-9]{10}$/", "/^\\d{5}$/", "/^[A-Z]{10}$/", "/^[0-9]+$/"],
    answer: 0,
    explanation: "/^[0-9]{10}$/ ensures exactly 10 consecutive numerical digits from start (^) to end ($)."
  },
  {
    q: "4. In XML Document Type Definition (DTD), what does '#PCDATA' stand for?",
    options: ["Processed Code Data", "Parsed Character Data", "Program Computer Data", "Plain Constant Data"],
    answer: 1,
    explanation: "PCDATA stands for Parsed Character Data — text that will be parsed by the XML parser."
  },
  {
    q: "5. In JavaScript, which DOM API is used to parse raw XML strings into an XML Document object?",
    options: ["JSON.parse()", "DOMParser.parseFromString()", "document.createXML()", "XMLHttpRequest.parse()"],
    answer: 1,
    explanation: "DOMParser's parseFromString(xmlString, 'application/xml') parses XML text into an XML DOM document."
  }
];

let userAnswers = {};

function renderQuiz() {
  const container = document.getElementById("quizQuestions");
  if (!container) return;

  container.innerHTML = TEST_QUESTIONS.map((item, qIdx) => `
    <div class="question-card" style="background:#140b30; border:1px solid #7c3aed; border-radius:12px; padding:20px; margin-bottom:20px;">
      <h3 style="color:#ffffff; margin-bottom:12px; font-size:1.1rem;">${item.q}</h3>
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${item.options.map((opt, oIdx) => `
          <label style="display:flex; align-items:center; gap:8px; cursor:pointer; color:#c4b5fd; padding:6px; border-radius:6px; background:rgba(22,12,55,0.6);">
            <input type="radio" name="q_${qIdx}" value="${oIdx}" onchange="recordAnswer(${qIdx}, ${oIdx})">
            <span>${opt}</span>
          </label>
        `).join("")}
      </div>
      <div id="feedback_${qIdx}" style="margin-top:10px; display:none; font-size:0.9rem; padding:8px; border-radius:6px;"></div>
    </div>
  `).join("");
}

function recordAnswer(questionIndex, selectedOptionIndex) {
  userAnswers[questionIndex] = selectedOptionIndex;
}

function submitSkillTest() {
  const total = TEST_QUESTIONS.length;
  let score = 0;

  TEST_QUESTIONS.forEach((q, idx) => {
    const feedbackBox = document.getElementById(`feedback_${idx}`);
    feedbackBox.style.display = "block";

    if (userAnswers[idx] === q.answer) {
      score++;
      feedbackBox.style.background = "rgba(16, 185, 129, 0.2)";
      feedbackBox.style.color = "#34d399";
      feedbackBox.innerHTML = `✓ Correct! ${q.explanation}`;
    } else {
      feedbackBox.style.background = "rgba(239, 68, 68, 0.2)";
      feedbackBox.style.color = "#f87171";
      feedbackBox.innerHTML = `❌ Incorrect. Correct answer: <b>${q.options[q.answer]}</b>. ${q.explanation}`;
    }
  });

  const percentage = Math.round((score / total) * 100);
  const resultContainer = document.getElementById("testResults");
  resultContainer.style.display = "block";

  const studentName = document.getElementById("studentTestName")?.value || "Student Gamer";

  resultContainer.innerHTML = `
    <div style="text-align:center; padding:24px; background:linear-gradient(135deg, #2e1065, #1e0b4a); border:2px solid #a855f7; border-radius:16px; box-shadow:0 0 25px rgba(168,85,247,0.4);">
      <h2 style="color:#ffffff; margin-bottom:8px;">🎯 Skill Test-1 Result</h2>
      <p style="color:#c4b5fd; font-size:1.1rem; margin-bottom:14px;">Candidate: <b>${studentName}</b></p>
      <div style="font-size:3rem; font-weight:800; color:${percentage >= 60 ? '#34d399' : '#f87171'}; text-shadow:0 0 15px currentColor;">
        ${score} / ${total} (${percentage}%)
      </div>
      <p style="margin-top:12px; color:#e9d5ff;">
        ${percentage >= 60 ? "🎉 Congratulations! You have successfully cleared Skill Test-1 (Weeks 1-6)." : "📚 Review Weeks 1-6 concepts and attempt again."}
      </p>
    </div>
  `;

  resultContainer.scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", renderQuiz);
