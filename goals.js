let exploded = false;

function initGoals() {
  const goals = document.querySelectorAll(".goal input");
  const fill = document.getElementById("progressFill");
  const text = document.getElementById("progressText");
  if (!goals.length) return;

  goals.forEach((box, index) => {
    const saved = localStorage.getItem("goal-" + index);
    if (saved === "true") box.checked = true;

    box.addEventListener("change", () => {
      localStorage.setItem("goal-" + index, box.checked);
      updateProgress();
    });
  });

  updateProgress();

  function updateProgress() {
    const checked = [...goals].filter(b => b.checked).length;
    const total = goals.length;
    const percent = Math.round((checked / total) * 100);

    if (fill) fill.style.width = percent + "%";
    if (text) text.textContent = `${checked} / ${total} completed`;

    if (checked === total && !exploded) {
      exploded = true;
      heartExplosion();
    }
  }
}

function heartExplosion() {
  const heart = document.getElementById("goalHeart");
  if (!heart) return;

  const rect = heart.getBoundingClientRect();
  const container = document.createElement("div");
  container.className = "heart-burst";
  container.style.left = rect.left + rect.width / 2 + "px";
  container.style.top = rect.top + rect.height / 2 + "px";
  document.body.appendChild(container);

  for (let i = 0; i < 30; i++) {
    const h = document.createElement("div");
    h.className = "burst-heart";
    h.textContent = "❤️";

    const angle = Math.random() * Math.PI * 2;
    const distance = 120 + Math.random() * 80;

    h.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    h.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

    container.appendChild(h);
  }

  setTimeout(() => container.remove(), 1400);
}

if (document.body.classList.contains("goals")) {
  initGoals();
}