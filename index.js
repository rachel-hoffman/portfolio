//header fetch
fetch('header.html')
  .then(response => response.text())
  .then(html => {
    // insert the header HTML into the placeholder
    document.getElementById('header-container').innerHTML = html;

    // after it's inserted, load your hearts logic (if you have that file)
    const script = document.createElement('script');
    script.src = 'scripts/lives.js'; // adjust path if it's somewhere else
    document.body.appendChild(script);
  })
  .catch(err => console.error('Header failed to load:', err));


//light mode
document.addEventListener("DOMContentLoaded", () => {
  const toggleNight = document.querySelector(".toggleNight");
  const toggleDay = document.querySelector(".toggleDay");
  const body = document.body;

  // --- Load saved theme (optional)
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") body.classList.add("light-mode");

  // --- Dark mode
  toggleNight.addEventListener("click", () => {
    body.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
  });

  // --- Light mode
  toggleDay.addEventListener("click", () => {
    body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  });
});



//toggle animation
//const toggle = document.querySelector('#themeToggle');

//toggle.addEventListener('click', () => {
//  toggle.classList.toggle('active');
//});




//Halloween fade as user scrolls
document.addEventListener("scroll", () => {
  const hat = document.getElementById("halloween");
  const maxScroll = 100; // how far before it fully fades (px)
  const scrollY = window.scrollY;
  
  // Clamp opacity between 1 → 0
  const opacity = Math.max(0, 1 - scrollY / maxScroll);
  hat.style.opacity = opacity;
});






//Hearts and Bomb animations
// Load lives from localStorage or start fresh with 3
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

// Show correct hearts right when the page loads
updateHeartsDisplay();

bomb.addEventListener('click', () => {
  if (lives <= 0) return;

  explosionOverlay.style.display = 'flex';

  setTimeout(() => {
    explosionOverlay.style.display = 'none';
    loseHeart();
  }, 1000); // adjust to match your GIF timing
});

function loseHeart() {
  if (lives <= 0) return;

  lives--;
  localStorage.setItem('lives', lives); // save current lives

  const heart = hearts[lives];
  heart.src = 'images/heart-empty.png'; // swap to your grey/empty heart
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
  localStorage.setItem('lives', lives); // reset saved lives
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
