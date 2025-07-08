const pics = [
  "IMG_8956.jpg","IMG_8957.jpg","IMG_8958.jpg",
  "IMG_8959.jpg","IMG_8960.jpg","IMG_8961.jpg","IMG_8962.jpg",
  "IMG_8963.jpg","IMG_8964.jpg","IMG_8965.jpg","IMG_8966.jpg",
  "IMG_8967.jpg","IMG_8968.jpg","IMG_8969.jpg","IMG_8970.jpg",
  "IMG_8971.jpg","IMG_8972.jpg","IMG_8973.jpg","IMG_8974.jpg",
  "IMG_8975.jpg","IMG_8976.jpg","IMG_8955.jpg"
];
let idx = 0;

function show(n) {
  idx = (n + pics.length) % pics.length;
  document.getElementById("frame").src = `assets/img/photos/${pics[idx]}`;
  // optional: preload next
  new Image().src = `assets/img/photos/${pics[(idx+1)%pics.length]}`;
}

document.addEventListener("DOMContentLoaded", () => {
  setupPresent();
  show(0);
  document.querySelector(".arrow.left").onclick  = () => show(idx-1);
  document.querySelector(".arrow.right").onclick = () => show(idx+1);
});

// --- Animated "Open-Me" Card ---
function setupPresent() {
  // First present
  const btn1 = document.getElementById('presentBtn');
  btn1.addEventListener('click', () => {
    if (btn1.classList.contains('open')) return;
    btn1.classList.add('open');
    document.querySelector('.letter').hidden = false;
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
  });
  // Second present
  const btn2 = document.getElementById('presentBtn2');
  if (btn2) {
    btn2.addEventListener('click', () => {
      if (btn2.classList.contains('open')) return;
      btn2.classList.add('open');
      document.querySelector('.letter.marshes-letter').hidden = false;
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    });
  }
}
