(() => {
  const menuButton = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-site-nav]');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.dataset.open === 'true';
      nav.dataset.open = String(!isOpen);
      menuButton.setAttribute('aria-expanded', String(!isOpen));
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a') && window.matchMedia('(max-width: 899px)').matches) {
        nav.dataset.open = 'false';
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const themeButtons = document.querySelectorAll('[data-theme-choice]');

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme));
    });
  }

  // V1 foundation intentionally does not persist theme choice because persistence
  // has not yet been approved as a project requirement.
  setTheme(document.documentElement.dataset.theme || 'light');

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => setTheme(button.dataset.themeChoice));
  });
})();
