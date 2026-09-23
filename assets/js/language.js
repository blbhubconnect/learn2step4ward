(() => {
  const STORAGE_KEY = 'learn2step4ward-language';
  const DEFAULT_LANGUAGE = 'bm';
  const supported = new Set(['bm', 'en']);

  function getSiteRoot() {
    const script = document.currentScript || [...document.scripts].find((s) => s.src.includes('/assets/js/language.js'));
    return script ? new URL('../../', script.src) : new URL('./', window.location.href);
  }

  const siteRoot = getSiteRoot();

  function getStoredLanguage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return supported.has(saved) ? saved : DEFAULT_LANGUAGE;
    } catch {
      return DEFAULT_LANGUAGE;
    }
  }

  async function loadLocale(language) {
    const url = new URL(`locales/${language}.json`, siteRoot);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Locale load failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      // Home-only fallback for direct file:// previews. Hosted versions continue
      // to use the JSON locale files as the normal source of interface strings.
      const fallback = window.L2S_HOME_LOCALES?.[language];
      if (fallback) return fallback;
      throw error;
    }
  }

  function applyTranslations(strings) {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.dataset.i18n;
      if (Object.prototype.hasOwnProperty.call(strings, key)) {
        element.textContent = strings[key];
      }
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
      const key = element.dataset.i18nAriaLabel;
      if (Object.prototype.hasOwnProperty.call(strings, key)) {
        element.setAttribute('aria-label', strings[key]);
      }
    });

    document.querySelectorAll('[data-i18n-content]').forEach((element) => {
      const key = element.dataset.i18nContent;
      if (Object.prototype.hasOwnProperty.call(strings, key)) {
        element.setAttribute('content', strings[key]);
      }
    });
  }

  function updateButtons(language) {
    document.querySelectorAll('[data-language]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
  }

  async function setLanguage(language, persist = true) {
    if (!supported.has(language)) language = DEFAULT_LANGUAGE;
    try {
      const strings = await loadLocale(language);
      applyTranslations(strings);
      document.documentElement.lang = language === 'bm' ? 'ms' : 'en';
      document.documentElement.dataset.language = language;
      updateButtons(language);
      if (persist) {
        try { localStorage.setItem(STORAGE_KEY, language); } catch { /* readable fallback remains */ }
      }
    } catch (error) {
      console.warn('Learn2Step4ward locale fallback active.', error);
      document.documentElement.lang = 'ms';
      document.documentElement.dataset.language = DEFAULT_LANGUAGE;
      updateButtons(DEFAULT_LANGUAGE);
    }
  }

  document.querySelectorAll('[data-language]').forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.language));
  });

  setLanguage(getStoredLanguage(), false);
})();
