const storageKey = "theme";

function getPreferredTheme() {
  const stored = localStorage.getItem(storageKey);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(storageKey, theme);
  const toggle = document.getElementById("themeToggle");
  if (toggle) toggle.setAttribute("aria-label", `Toggle theme (current: ${theme})`);
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme || getPreferredTheme();
  applyTheme(current === "dark" ? "light" : "dark");
}

function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());
}

function enableSmoothScroll() {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.documentElement.style.scrollBehavior = "smooth";
}

function init() {
  applyTheme(getPreferredTheme());
  setYear();
  enableSmoothScroll();
  const toggle = document.getElementById("themeToggle");
  if (toggle) toggle.addEventListener("click", toggleTheme);
}

document.addEventListener("DOMContentLoaded", init);
