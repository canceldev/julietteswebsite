/* ---------- Page Fade + Page Init ---------- */
function fadeInBody() {
  document.body.classList.add("loaded");
}

// Fade in on load (including back/forward)
window.addEventListener("DOMContentLoaded", fadeInBody);
window.addEventListener("pageshow", (e) => {
  if (e.persisted) fadeInBody(); // handles bfcache/back button
});

/* ---------- Fade Out on Link Click ---------- */
document.querySelectorAll('a[href]').forEach(link => {
  if (link.hostname !== location.hostname || link.target === "_blank") return; // skip external links

  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.href;

    document.body.classList.add("fade-out");

    setTimeout(() => {
      window.location.href = href;
    }, 500); // match CSS transition duration
  });
});

/* ---------- Navigation Active Link ---------- */
const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

/* ---------- Secret Cat ---------- */
const secretCat = document.getElementById("secretCat");

if (secretCat) {
  secretCat.addEventListener("click", () => {
    let count = 0;

    const flood = setInterval(() => {
      for (let i = 0; i < 12; i++) {
        const cat = document.createElement("div");
        cat.className = "flood-cat";
        cat.textContent = "🐱";

        cat.style.left = Math.random() * 100 + "vw";
        cat.style.top = Math.random() * -20 + "vh";
        cat.style.fontSize = 22 + Math.random() * 30 + "px";
        cat.style.animationDuration = 3 + Math.random() * 2 + "s";

        document.body.appendChild(cat);
        setTimeout(() => cat.remove(), 6000);
      }

      count++;
      if (count > 25) clearInterval(flood);
    }, 120);
  });
}