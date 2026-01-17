/* ---------- Timer for Home ---------- */
/*
  Start date:
  Sept 21, 2025 — 7:28 PM PST
  (UTC: Sept 22, 02:28)

  Paused at:
  Jan 14, 2026 — 12:00 PM PST
  (UTC: Jan 14, 20:00)
*/

// relationship start
const startDate = new Date("2025-09-22T02:28:00Z");

// frozen pause moment
let frozenNow = new Date("2026-01-14T20:00:00Z");

// timer state
let paused = true;
let intervalId = null;

function setValue(id, value) {
  const el = document.getElementById(id);
  if (!el) return;

  if (el.textContent !== String(value)) {
    el.textContent = value;
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = "pop 0.3s ease";
  }
}

function updateTimer() {
  const now = paused ? frozenNow : new Date();

  let months =
    (now.getFullYear() - startDate.getFullYear()) * 12 +
    (now.getMonth() - startDate.getMonth());

  let anchor = new Date(startDate);
  anchor.setMonth(startDate.getMonth() + months);

  if (anchor > now) {
    months--;
    anchor.setMonth(anchor.getMonth() - 1);
  }

  const diff = now - anchor;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;

  setValue("months", months);
  setValue("days", days);
  setValue("hours", hours);
  setValue("minutes", minutes);
}

function startTimer() {
  updateTimer(); // render once, paused
}

/* ---------- Controls ---------- */
function resumeTimer() {
  if (!paused) return;

  paused = false;

  const resumeBase = frozenNow.getTime();
  const resumeStart = Date.now();

  intervalId = setInterval(() => {
    frozenNow = new Date(resumeBase + (Date.now() - resumeStart));
    updateTimer();
  }, 1000);
}

function pauseTimer() {
  if (paused) return;

  paused = true;
  clearInterval(intervalId);
}

if (document.body.classList.contains("home")) {
  startTimer();
}