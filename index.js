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
