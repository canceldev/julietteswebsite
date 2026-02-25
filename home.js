/* ---------- Timer for Home (Frozen at Jan 14, 2026, 12:00 PM PST) ---------- */

// Relationship start
const startDate = new Date("2025-09-22T02:28:00Z");

// Frozen moment
const frozenNow = new Date("2026-01-14T20:00:00Z"); // UTC equivalent of Jan 14, 12 PM PST

// Utility to update element with animation
function setValue(id, value) {
  const el = document.getElementById(id);
  if (!el) return;

  if (el.textContent !== String(value)) {
    el.textContent = value;
    el.style.animation = "none";
    el.offsetHeight; // force reflow
    el.style.animation = "pop 0.3s ease";
  }
}

// Calculate months, days, hours, minutes
function updateTimer() {
  const now = frozenNow;

  // Total months difference
  let months = (now.getFullYear() - startDate.getFullYear()) * 12 +
               (now.getMonth() - startDate.getMonth());

  // Anchor date for months
  let anchor = new Date(startDate);
  anchor.setMonth(startDate.getMonth() + months);

  if (anchor > now) {
    months--;
    anchor.setMonth(anchor.getMonth() - 1);
  }

  // Remaining difference after full months
  const diffMs = now - anchor;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diffMs / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(diffMs / (1000 * 60)) % 60;

  setValue("months", months);
  setValue("days", days);
  setValue("hours", hours);
  setValue("minutes", minutes);
}

// Render once, frozen
if (document.body.classList.contains("home")) {
  updateTimer();
}