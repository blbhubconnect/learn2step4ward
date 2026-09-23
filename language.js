(() => {
  'use strict';

  const STORAGE_KEY = 'learn2step4ward-language';
  const DEFAULT_LANGUAGE = 'bm';
  const SUPPORTED_LANGUAGES = new Set(['bm', 'en']);
  const localeCache = new Map();
  let latestRequest = 0;

  function findThisScript() {
    return document.currentScript || [...document.scripts].find((script) => {
      try {
        return new URL(script.src, window.location.href).pathname.endsWith('/assets/js/language.js');
      } catch {
        return false;
      }
    });
  }

  function getSiteRoot() {
    const script = findThisScript();
    if (script?.src) return new URL('../../', script.src);
    return new URL('./', window.location.href);
  }

  const siteRoot = getSiteRoot();

  function normaliseLanguage(language) {
    return SUPPORTED_LANGUAGES.has(language) ? language : DEFAULT_LANGUAGE;
  }

  function getStoredLanguage() {
    try {
      return normaliseLanguage(localStorage.getItem(STORAGE_KEY));
    } catch {
      return DEFAULT_LANGUAGE;
    }
  }

  function saveLanguage(language) {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // The interface still works if browser storage is unavailable.
    }
  }

  async function loadLocale(language) {
    if (localeCache.has(language)) return localeCache.get(language);

    const localeUrl = new URL(`locales/${language}.json`, siteRoot);

    try {
      const response = await fetch(localeUrl, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Locale request failed (${response.status}) for ${localeUrl}`);
      }

      const strings = await response.json();
      localeCache.set(language, strings);
      return strings;
    } catch (error) {
      // Direct file:// previews cannot reliably fetch JSON in all browsers.
      // Home has an exact JS fallback generated from the same locale content.
      const fallback = window.L2S_HOME_LOCALES?.[language];
      if (fallback) {
        localeCache.set(language, fallback);
        return fallback;
      }
      throw error;
    }
  }

  function setTextTranslations(strings) {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.dataset.i18n;
      if (Object.prototype.hasOwnProperty.call(strings, key)) {
        element.textContent = strings[key];
      }
    });
  }

  function setAriaTranslations(strings) {
    document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
      const key = element.dataset.i18nAriaLabel;
      if (Object.prototype.hasOwnProperty.call(strings, key)) {
        element.setAttribute('aria-label', strings[key]);
      }
    });
  }

  function setContentTranslations(strings) {
    document.querySelectorAll('[data-i18n-content]').forEach((element) => {
      const key = element.dataset.i18nContent;
      if (Object.prototype.hasOwnProperty.call(strings, key)) {
        element.setAttribute('content', strings[key]);
      }
    });
  }

  function applyTranslations(strings) {
    setTextTranslations(strings);
    setAriaTranslations(strings);
    setContentTranslations(strings);
  }

  function updateLanguageButtons(language, loading = false) {
    document.querySelectorAll('[data-language]').forEach((button) => {
      const active = button.dataset.language === language;
      button.setAttribute('aria-pressed', String(active));
      button.disabled = loading;
      button.setAttribute('aria-busy', String(loading));
    });
  }

  async function setLanguage(requestedLanguage, { persist = true } = {}) {
    const language = normaliseLanguage(requestedLanguage);
    const requestId = ++latestRequest;

    // Reflect the user's latest choice immediately while locale data loads.
    updateLanguageButtons(language, true);

    try {
      const strings = await loadLocale(language);

      // Prevent an older/slower fetch from overwriting a newer language click.
      if (requestId !== latestRequest) return;

      applyTranslations(strings);
      document.documentElement.lang = language === 'bm' ? 'ms' : 'en';
      document.documentElement.dataset.language = language;
      document.documentElement.dataset.languageReady = 'true';

      if (persist) saveLanguage(language);
      updateLanguageButtons(language, false);

      document.dispatchEvent(new CustomEvent('l2s:languagechange', {
        detail: { language }
      }));
    } catch (error) {
      if (requestId !== latestRequest) return;

      console.warn('Learn2Step4ward: locale could not be loaded.', error);
      document.documentElement.dataset.languageReady = 'error';

      // Keep the readable HTML fallback and restore the last successfully
      // stored language state instead of leaving mismatched button states.
      const fallbackLanguage = getStoredLanguage();
      updateLanguageButtons(fallbackLanguage, false);
    }
  }

  document.querySelectorAll('[data-language]').forEach((button) => {
    button.addEventListener('click', () => {
      setLanguage(button.dataset.language, { persist: true });
    });
  });

  // Start from the stored preference. This call is also guarded against races
  // if a user taps BM/ENG before the initial locale request completes.
  setLanguage(getStoredLanguage(), { persist: false });
})();
