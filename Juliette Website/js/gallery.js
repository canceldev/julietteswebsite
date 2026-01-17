const lightbox = document.getElementById("lightbox");

if (lightbox) {
  const lightboxImg = lightbox.querySelector("img");

  /* ---------- Lightbox ---------- */
  document.querySelectorAll(".photo-card img").forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.add("active");
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
    lightboxImg.src = "";
  });
}

/* ---------- Heart Particles ---------- */
document.querySelectorAll(".photo-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    if (card.dataset.hearts) return;

    card.dataset.hearts = "true";
    createHeartParticles(card);

    setTimeout(() => {
      delete card.dataset.hearts;
    }, 700);
  });
});

function createHeartParticles(card) {
  const rect = card.getBoundingClientRect();
  const HEART_COUNT = 10;

  for (let i = 0; i < HEART_COUNT; i++) {
    const heart = document.createElement("div");
    heart.className = "heart-particle";
    heart.textContent = "❤️";

    const x = rect.left + Math.random() * rect.width;
    const y = rect.top + Math.random() * rect.height;

    heart.style.left = x + "px";
    heart.style.top = y + "px";

    heart.style.setProperty("--x", `${(Math.random() - 0.5) * 120}px`);
    heart.style.setProperty("--y", `${-80 - Math.random() * 80}px`);

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1600);
  }
}