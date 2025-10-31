// HEADER FETCH + SETUP
fetch('header.html')
  .then(response => response.text())
  .then(html => {
    // Insert header HTML into placeholder
    document.getElementById('header-container').innerHTML = html;

    // Setup header elements
    setupThemeToggle();
    setupHeartsAndBomb();
  })
  .catch(err => console.error('Header failed to load:', err));


// =====================
// THEME TOGGLE
// =====================
function setupThemeToggle() {
  const toggleNight = document.querySelector(".toggleNight");
  const toggleDay = document.querySelector(".toggleDay");
  const body = document.body;

  // load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") body.classList.add("light-mode");

  // add listeners
  toggleNight.addEventListener("click", () => {
    body.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
  });

  toggleDay.addEventListener("click", () => {
    body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  });
}


// =====================
// HEARTS + BOMB
// =====================
function setupHeartsAndBomb() {
  let lives = parseInt(localStorage.getItem('lives')) || 3;

  const hearts = [
    document.getElementById('heart1'),
    document.getElementById('heart2'),
    document.getElementById('heart3')
  ];

  const bomb = document.getElementById('bomb');
  const explosionOverlay = document.getElementById('explosion-overlay');
  const deathScreen = document.getElementById('death-screen');
  const respawnBtn = document.getElementById('respawn-btn');

  updateHeartsDisplay();

  // BOMB click handler
  bomb.addEventListener('click', () => {
    if (lives <= 0) return;

    explosionOverlay.style.display = 'flex';

    setTimeout(() => {
      explosionOverlay.style.display = 'none';
      loseHeart();
    }, 1000);
  });

  function loseHeart() {
    if (lives <= 0) return;

    lives--;
    localStorage.setItem('lives', lives);

    const heart = hearts[lives];
    heart.src = 'images/heart-empty.png';
    heart.classList.add('lose-heart');

    heart.addEventListener('animationend', () => {
      heart.classList.remove('lose-heart');
    }, { once: true });

    updateHeartsDisplay();

    if (lives === 0) {
      setTimeout(() => {
        deathScreen.style.display = 'flex';
      }, 500);
    }
  }

  respawnBtn.addEventListener('click', () => {
    lives = 3;
    localStorage.setItem('lives', lives);
    hearts.forEach(heart => {
      heart.src = 'images/heart.png';
      heart.classList.remove('lose-heart');
    });
    deathScreen.style.display = 'none';
    updateHeartsDisplay();
  });

  function updateHeartsDisplay() {
    hearts.forEach((heart, index) => {
      if (index < lives) {
        heart.src = 'images/heart.png';
      } else {
        heart.src = 'images/heart-empty.png';
      }
    });
  }
}


// =====================
// HALLOWEEN FADE (works independently)
// =====================
document.addEventListener("scroll", () => {
  const hat = document.getElementById("halloween");
  if (!hat) return; // avoid errors on pages without the element

  const maxScroll = 100;
  const scrollY = window.scrollY;
  const opacity = Math.max(0, 1 - scrollY / maxScroll);
  hat.style.opacity = opacity;
});


/* ====== Smart Content Protection ====== */

document.addEventListener("contextmenu", event => {
  // Allow right-click on links, text inputs, and videos
  if (
    event.target.closest("a, input, textarea, video") ||
    event.target.isContentEditable
  ) {
    return;
  }
  event.preventDefault();
});

// Disable image dragging
document.querySelectorAll("img").forEach(img => {
  img.setAttribute("draggable", "false");
  img.addEventListener("mousedown", e => e.preventDefault());
});

