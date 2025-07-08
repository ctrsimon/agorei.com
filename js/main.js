document.addEventListener('DOMContentLoaded', () => {
  setupCard();
  setupMosaic();
  setupScavenger();
});

// --- Animated "Open-Me" Card ---
function setupCard() {
  const envelopeBtn = document.getElementById('envelopeBtn');
  const flap = envelopeBtn.querySelector('.flap');
  const letter = document.querySelector('.letter');
  let opened = false;

  function openCard() {
    if (opened) return;
    opened = true;
    envelopeBtn.classList.add('open');
    setTimeout(() => {
      if (window.confetti) confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.3 }
      });
      letter.hidden = false;
      setTimeout(() => letter.classList.add('visible'), 50);
    }, 600);
  }

  envelopeBtn.addEventListener('click', openCard);
  envelopeBtn.addEventListener('keydown', e => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      openCard();
    }
  });
}

// --- Memory Mosaic Reveal ---
function setupMosaic() {
  const tiles = document.querySelectorAll('.tile');
  const overlay = document.getElementById('mosaicOverlay');
  let flippedCount = 0;

  function flipTile(tile) {
    if (tile.dataset.flipped === 'true') return;
    tile.dataset.flipped = 'true';
    tile.classList.add('flipped');
    flippedCount++;
    if (flippedCount === tiles.length) {
      setTimeout(() => {
        overlay.hidden = false;
        overlay.classList.add('visible');
        overlay.setAttribute('aria-hidden', 'false');
      }, 400);
    }
  }

  tiles.forEach(tile => {
    tile.addEventListener('click', () => flipTile(tile));
    tile.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        flipTile(tile);
      }
    });
  });
}

// --- Inside-Joke Scavenger Hunt ---
function setupScavenger() {
  const huntItems = document.querySelectorAll('.hunt-item');
  const dialogs = [
    document.getElementById('clue1'),
    document.getElementById('clue2'),
    document.getElementById('clue3'),
    document.getElementById('clue4'),
    document.getElementById('clue5')
  ];
  const coupons = document.getElementById('coupons');
  let currentStep = 0;

  // Polyfill for <dialog> on Safari
  if (typeof HTMLDialogElement === 'undefined' || !('showModal' in document.createElement('dialog'))) {
    dialogs.forEach(dialog => {
      dialog.showModal = function() {
        this.setAttribute('open', '');
        this.style.display = 'block';
      };
      dialog.close = function() {
        this.removeAttribute('open');
        this.style.display = 'none';
      };
    });
  }

  function highlightStep(step) {
    huntItems.forEach((icon, i) => {
      icon.classList.toggle('pulse', i === step);
    });
  }

  function openDialog(step) {
    if (dialogs[step]) {
      dialogs[step].showModal();
      highlightStep(step);
    }
  }

  function closeDialog(step) {
    if (dialogs[step]) dialogs[step].close();
  }

  huntItems.forEach((icon, i) => {
    icon.addEventListener('click', () => {
      openDialog(i);
      currentStep = i;
    });
    icon.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        openDialog(i);
        currentStep = i;
      }
    });
  });

  dialogs.forEach((dialog, i) => {
    dialog.querySelector('.next-clue').addEventListener('click', e => {
      closeDialog(i);
      if (e.target.dataset.next === 'final') {
        coupons.hidden = false;
        coupons.scrollIntoView({ behavior: 'smooth', block: 'center' });
        highlightStep(-1);
      } else {
        const next = parseInt(e.target.dataset.next, 10) - 1;
        setTimeout(() => {
          openDialog(next);
          huntItems[next].focus();
        }, 300);
      }
    });
  });

  // Start with first icon pulsing
  highlightStep(0);
}
