/**
 * Week 4: Client-Side JavaScript Form Validation Engine
 * Validates fields of the Student / Gamer Registration Page
 */

// Regular Expression Patterns
const PATTERNS = {
  name: /^[a-zA-Z\s]{3,35}$/,
  studentId: /^[a-zA-Z0-9\-_]{4,15}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^[0-9]{10}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,20}$/
};

// Error Display Utility
function displayFeedback(inputElement, errorElement, message) {
  if (message) {
    inputElement.style.borderColor = "#ef4444";
    inputElement.style.boxShadow = "0 0 8px rgba(239, 68, 68, 0.4)";
    errorElement.style.color = "#f87171";
    errorElement.style.display = "block";
    errorElement.innerHTML = `⚠️ ${message}`;
    return false;
  } else {
    inputElement.style.borderColor = "#10b981";
    inputElement.style.boxShadow = "0 0 8px rgba(16, 185, 129, 0.4)";
    errorElement.style.color = "#34d399";
    errorElement.style.display = "block";
    errorElement.innerHTML = `✓ Valid`;
    return true;
  }
}

// Individual Validator Functions
function validateFullName() {
  const el = document.getElementById("w4_name");
  const err = document.getElementById("err_name");
  const val = el.value.trim();

  if (!val) return displayFeedback(el, err, "Full Name is required.");
  if (!PATTERNS.name.test(val)) return displayFeedback(el, err, "Must contain 3-35 alphabetic characters only.");
  return displayFeedback(el, err, "");
}

function validateEmail() {
  const el = document.getElementById("w4_email");
  const err = document.getElementById("err_email");
  const val = el.value.trim();

  if (!val) return displayFeedback(el, err, "Email address is required.");
  if (!PATTERNS.email.test(val)) return displayFeedback(el, err, "Please enter a valid email format (e.g., student@domain.edu).");
  return displayFeedback(el, err, "");
}

function validatePhone() {
  const el = document.getElementById("w4_phone");
  const err = document.getElementById("err_phone");
  const val = el.value.trim();

  if (!val) return displayFeedback(el, err, "Mobile phone number is required.");
  if (!PATTERNS.phone.test(val)) return displayFeedback(el, err, "Phone number must be exactly 10 digits.");
  return displayFeedback(el, err, "");
}

function validateDob() {
  const el = document.getElementById("w4_dob");
  const err = document.getElementById("err_dob");
  const val = el.value;

  if (!val) return displayFeedback(el, err, "Date of birth is required.");
  const birthDate = new Date(val);
  const ageDiff = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDiff);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  if (age < 12) return displayFeedback(el, err, "Student/Gamer must be at least 12 years of age.");
  return displayFeedback(el, err, "");
}

function validatePassword() {
  const el = document.getElementById("w4_pass");
  const err = document.getElementById("err_pass");
  const val = el.value;

  if (!val) return displayFeedback(el, err, "Password is required.");
  if (!PATTERNS.password.test(val)) return displayFeedback(el, err, "Must be 6+ chars with at least 1 uppercase letter, 1 lowercase letter, and 1 number.");
  return displayFeedback(el, err, "");
}

function validateConfirmPassword() {
  const passEl = document.getElementById("w4_pass");
  const el = document.getElementById("w4_confirm_pass");
  const err = document.getElementById("err_confirm_pass");

  if (!el.value) return displayFeedback(el, err, "Please confirm your password.");
  if (el.value !== passEl.value) return displayFeedback(el, err, "Passwords do not match.");
  return displayFeedback(el, err, "");
}

function validateForm(e) {
  e.preventDefault();

  const isNameValid = validateFullName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isDobValid = validateDob();
  const isPassValid = validatePassword();
  const isConfirmValid = validateConfirmPassword();

  const deptEl = document.getElementById("w4_dept");
  const deptErr = document.getElementById("err_dept");
  const isDeptValid = deptEl.value !== "" 
    ? displayFeedback(deptEl, deptErr, "") 
    : displayFeedback(deptEl, deptErr, "Please select an academic department.");

  const termsEl = document.getElementById("w4_terms");
  const termsErr = document.getElementById("err_terms");
  let isTermsValid = true;
  if (!termsEl.checked) {
    termsErr.style.display = "block";
    termsErr.style.color = "#f87171";
    termsErr.innerText = "⚠️ You must agree to the university honor code & gamer rules.";
    isTermsValid = false;
  } else {
    termsErr.style.display = "none";
  }

  const resultBox = document.getElementById("w4_summary");
  if (isNameValid && isEmailValid && isPhoneValid && isDobValid && isPassValid && isConfirmValid && isDeptValid && isTermsValid) {
    resultBox.style.display = "block";
    resultBox.style.background = "rgba(16, 185, 129, 0.2)";
    resultBox.style.borderColor = "#10b981";
    resultBox.style.color = "#6ee7b7";
    resultBox.innerHTML = `
      <h3>🎉 All Validations Passed Successfully!</h3>
      <p>Gamer Record: <b>${document.getElementById("w4_name").value}</b></p>
      <p>Department: <b>${deptEl.value}</b> | Email: <b>${document.getElementById("w4_email").value}</b></p>
      <p>Form data is verified and ready for backend submission via AJAX/Fetch.</p>
    `;
    return true;
  } else {
    resultBox.style.display = "block";
    resultBox.style.background = "rgba(239, 68, 68, 0.2)";
    resultBox.style.borderColor = "#ef4444";
    resultBox.style.color = "#fca5a5";
    resultBox.innerHTML = `<h3>❌ Validation Failed</h3><p>Please correct the marked fields above before continuing.</p>`;
    return false;
  }
}

// Bind Real-Time Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("w4_name")?.addEventListener("input", validateFullName);
  document.getElementById("w4_email")?.addEventListener("input", validateEmail);
  document.getElementById("w4_phone")?.addEventListener("input", validatePhone);
  document.getElementById("w4_dob")?.addEventListener("change", validateDob);
  document.getElementById("w4_pass")?.addEventListener("input", validatePassword);
  document.getElementById("w4_confirm_pass")?.addEventListener("input", validateConfirmPassword);
  document.getElementById("w4_dept")?.addEventListener("change", () => {
    const el = document.getElementById("w4_dept");
    const err = document.getElementById("err_dept");
    if (el.value) displayFeedback(el, err, "");
  });
});
