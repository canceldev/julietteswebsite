
document.querySelectorAll(".accomplishment-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.boxShadow = "0 0 40px rgba(255,255,255,0.15)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "";
  });
});