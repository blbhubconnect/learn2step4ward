(() => {
  const menuButton = document.querySelector('[data-menu-toggle]');
  const menuIcon = document.querySelector('[data-menu-icon]');
  const nav = document.querySelector('[data-site-nav]');
  const mobileMedia = window.matchMedia('(max-width: 899px)');

  function setMenu(open) {
    if (!menuButton || !nav) return;
    nav.dataset.open = String(open);
    menuButton.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open && mobileMedia.matches);
    if (menuIcon) menuIcon.textContent = open ? '✕' : '☰';
  }

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      setMenu(nav.dataset.open !== 'true');
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a') && mobileMedia.matches) setMenu(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.dataset.open === 'true') {
        setMenu(false);
        menuButton.focus();
      }
    });

    const handleViewportChange = () => {
      if (!mobileMedia.matches) setMenu(false);
    };

    if (mobileMedia.addEventListener) mobileMedia.addEventListener('change', handleViewportChange);
    else mobileMedia.addListener(handleViewportChange);
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
