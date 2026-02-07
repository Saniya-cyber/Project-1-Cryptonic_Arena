/***********************
 * SHIELD AUTH SYSTEM *
 ***********************/

// ===== Simulated Secure User Database (hashed passwords) =====
// Password hashes generated using SHA-256
const users = {
  admin: {
    passwordHash: "240be518fabd2724ddb6f04eeb1da596", // md5("admin123") demo
    role: "admin",
    failedAttempts: 0,
    lockedUntil: null
  },
  user: {
    passwordHash: "ee11cbb19052e40b07aac0ca060c23ee", // md5("user123") demo
    role: "user",
    failedAttempts: 0,
    lockedUntil: null
  }
};

// ===== Security Settings =====
const MAX_ATTEMPTS = 3;
const LOCK_TIME = 60 * 1000; // 1 minute

// ===== DOM Elements =====
const loginBox = document.getElementById("loginBox");
const dashboardBox = document.getElementById("dashboardBox");
const logsBox = document.getElementById("logsBox");
const message = document.getElementById("message");
const userDisplay = document.getElementById("userDisplay");
const roleDisplay = document.getElementById("roleDisplay");
const adminPanel = document.getElementById("adminPanel");
const logsList = document.getElementById("logsList");

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

// ===== In-Memory Session =====
let currentSession = null;
let securityLogs = [];

// ===== Utility: Log Security Events =====
function logEvent(text) {
  const time = new Date().toLocaleTimeString();
  securityLogs.unshift(`[${time}] ${text}`);
  renderLogs();
}

function renderLogs() {
  logsList.innerHTML = "";
  securityLogs.slice(0, 5).forEach(log => {
    const li = document.createElement("li");
    li.textContent = log;
    logsList.appendChild(li);
  });
}

// ===== Utility: Input Sanitization =====
function sanitize(input) {
  return input.replace(/[<>]/g, "");
}

// ===== Simple Hash Function (Demo Only) =====
// In real systems: bcrypt/argon2 on backend
function hash(text) {
  // very basic hash (for demo)
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString();
}

// ===== Login Logic =====
loginBtn.addEventListener("click", () => {
  let username = sanitize(document.getElementById("username").value.trim());
  let password = document.getElementById("password").value;

  if (!username || !password) {
    message.textContent = "⚠ Please enter username and password";
    message.style.color = "orange";
    return;
  }

  const user = users[username];

  if (!user) {
    message.textContent = "❌ Invalid username or password";
    message.style.color = "red";
    logEvent(`Failed login attempt for unknown user "${username}"`);
    return;
  }

  // ===== Account Lockout Check =====
  if (user.lockedUntil && Date.now() < user.lockedUntil) {
    const secondsLeft = Math.ceil((user.lockedUntil - Date.now()) / 1000);
    message.textContent = `🔒 Account locked. Try again in ${secondsLeft}s`;
    message.style.color = "orange";
    logEvent(`Blocked login attempt on locked account "${username}"`);
    return;
  }

  // ===== Password Verification =====
  if (hash(password) !== hash("admin123") && username === "admin") {
    user.failedAttempts++;
    logEvent(`Wrong password for "${username}"`);

    if (user.failedAttempts >= MAX_ATTEMPTS) {
      user.lockedUntil = Date.now() + LOCK_TIME;
      user.failedAttempts = 0;
      message.textContent = "🔒 Too many attempts. Account locked for 1 minute.";
      message.style.color = "red";
      logEvent(`Account "${username}" locked due to brute-force attempts`);
    } else {
      message.textContent = "❌ Invalid username or password";
      message.style.color = "red";
    }
    return;
  }

  if (username === "user" && hash(password) !== hash("user123")) {
    user.failedAttempts++;
    message.textContent = "❌ Invalid username or password";
    message.style.color = "red";
    logEvent(`Wrong password for "${username}"`);
    return;
  }

  // ===== Successful Login =====
  user.failedAttempts = 0;
  user.lockedUntil = null;

  currentSession = {
    username: username,
    role: user.role,
    loginTime: Date.now()
  };

  sessionStorage.setItem("session", JSON.stringify(currentSession));

  logEvent(`User "${username}" logged in successfully`);

  showDashboard();
});

// ===== Logout =====
logoutBtn.addEventListener("click", () => {
  logEvent(`User "${currentSession.username}" logged out`);
  sessionStorage.removeItem("session");
  currentSession = null;
  dashboardBox.classList.add("hidden");
  logsBox.classList.add("hidden");
  loginBox.classList.remove("hidden");
  message.textContent = "✅ Logged out successfully";
  message.style.color = "lightgreen";
});

// ===== Dashboard Rendering =====
function showDashboard() {
  loginBox.classList.add("hidden");
  dashboardBox.classList.remove("hidden");
  logsBox.classList.remove("hidden");

  userDisplay.textContent = currentSession.username;
  roleDisplay.textContent = currentSession.role;

  // ===== Role-Based Access Control =====
  if (currentSession.role === "admin") {
    adminPanel.classList.remove("hidden");
  } else {
    adminPanel.classList.add("hidden");
  }
}

// ===== Auto Session Restore =====
const savedSession = sessionStorage.getItem("session");
if (savedSession) {
  currentSession = JSON.parse(savedSession);
  showDashboard();
}
