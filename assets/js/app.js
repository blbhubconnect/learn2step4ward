document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isExpanded);
    });
  }

  // Theme Toggle Logic
  const themeToggleBtn = document.getElementById("theme-toggle");
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";

  if (themeToggleBtn) {
    // Update button text based on initial theme
    themeToggleBtn.innerHTML = currentTheme === "dark" ? "☀️ Terang" : "🌙 Gelap";

    themeToggleBtn.addEventListener("click", () => {
      let theme = document.documentElement.getAttribute("data-theme");
      
      if (theme === "dark") {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("l2s4w_theme", "light");
        themeToggleBtn.innerHTML = "🌙 Gelap";
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("l2s4w_theme", "dark");
        themeToggleBtn.innerHTML = "☀️ Terang";
      }
    });
  }
});
