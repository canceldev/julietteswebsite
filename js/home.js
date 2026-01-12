/* ---------- Timer for Home ---------- */
const startDate = new Date("2025-09-21T02:28:00Z");

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

function startTimer() {
  updateTimer();
  setInterval(updateTimer, 60000);
}

function updateTimer() {
  const now = new Date();
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

if (document.body.classList.contains("home")) {
  startTimer();
}