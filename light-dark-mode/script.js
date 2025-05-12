const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById("toggle-icon");
const textBox = document.getElementById("text-box");
const nav = document.getElementById("nav");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");

const toggleDarkLightMode = (isLight) => {
  document.documentElement.setAttribute(
    "data-theme",
    isLight ? "light" : "dark"
  );
  toggleIcon.innerHTML = `
  <span class="toggle-text">${isLight ? "Light" : "Dark"} Mode</span>
  <i class="fas fa-${isLight ? "sun" : "moon"}"></i>
  `;
  textBox.style.color = isLight ? "rgb(255 255 255)" : "rgb(0 0 0)";
  textBox.style.backgroundColor = isLight
    ? "rgb(0 0 0 / 50%)"
    : "rgb(255 255 255 / 50%)";
  nav.style.backgroundColor = isLight
    ? "rgb(255 255 255 / 50%)"
    : "rgb(0 0 0 / 50%)";
  img1.src = isLight ? "./img/backend_light.svg" : "./img/backend_dark.svg";
  img2.src = isLight ? "./img/frontend_light.svg" : "./img/frontend_dark.svg";

  localStorage.setItem("theme", isLight ? "light" : "dark");
};

const switchTheme = (e) => {
  toggleDarkLightMode(!e.target.checked);
};

toggleSwitch.addEventListener("change", switchTheme);

const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  toggleSwitch.checked = true;
  toggleDarkLightMode(false);
}
