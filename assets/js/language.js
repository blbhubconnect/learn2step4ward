(() => {
  'use strict';

  const STORAGE_KEY = 'learn2step4ward-language';
  const DEFAULT_LANGUAGE = 'bm';
  const SUPPORTED_LANGUAGES = new Set(['bm', 'en']);

  const localeCache = new Map();
  let latestRequest = 0;

  function getLanguageButtons() {
    // PENTING:
    // hanya pilih button BM / ENG.
    return document.querySelectorAll('button[data-language]');
  }

  function findThisScript() {
    return document.currentScript || [...document.scripts].find((script) => {
      try {
        return new URL(script.src, window.location.href)
          .pathname
          .endsWith('/assets/js/language.js');
      } catch {
        return false;
      }
    });
  }

  function getSiteRoot() {
    const script = findThisScript();

    if (script?.src) {
      return new URL('../../', script.src);
    }

    return new URL('./', window.location.href);
  }

  const siteRoot = getSiteRoot();

  function normaliseLanguage(language) {
    return SUPPORTED_LANGUAGES.has(language)
      ? language
      : DEFAULT_LANGUAGE;
  }

  function getStoredLanguage() {
    try {
      return normaliseLanguage(
        localStorage.getItem(STORAGE_KEY)
      );
    } catch {
      return DEFAULT_LANGUAGE;
    }
  }

  function saveLanguage(language) {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Website masih boleh berfungsi walaupun localStorage gagal.
    }
  }

  async function loadLocale(language) {
    if (localeCache.has(language)) {
      return localeCache.get(language);
    }

    const localeUrl = new URL(
      `locales/${language}.json`,
      siteRoot
    );

    try {
      const response = await fetch(localeUrl, {
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(
          `Locale gagal dimuatkan: ${response.status}`
        );
      }

      const strings = await response.json();

      localeCache.set(language, strings);

      return strings;
    } catch (error) {
      /*
        Fallback untuk testing menggunakan file://
        home-locales.js mesti dimuatkan sebelum language.js
      */
      const fallback =
        window.L2S_HOME_LOCALES?.[language];

      if (fallback) {
        localeCache.set(language, fallback);

        return fallback;
      }

      throw error;
    }
  }

  function applyTranslations(strings) {
    /*
      Tukar text biasa
    */
    document
      .querySelectorAll('[data-i18n]')
      .forEach((element) => {
        const key = element.dataset.i18n;

        if (
          Object.prototype.hasOwnProperty.call(
            strings,
            key
          )
        ) {
          element.textContent = strings[key];
        }
      });

    /*
      Tukar aria-label
    */
    document
      .querySelectorAll('[data-i18n-aria-label]')
      .forEach((element) => {
        const key =
          element.dataset.i18nAriaLabel;

        if (
          Object.prototype.hasOwnProperty.call(
            strings,
            key
          )
        ) {
          element.setAttribute(
            'aria-label',
            strings[key]
          );
        }
      });

    /*
      Tukar meta content
    */
    document
      .querySelectorAll('[data-i18n-content]')
      .forEach((element) => {
        const key =
          element.dataset.i18nContent;

        if (
          Object.prototype.hasOwnProperty.call(
            strings,
            key
          )
        ) {
          element.setAttribute(
            'content',
            strings[key]
          );
        }
      });
  }

  function updateLanguageButtons(
    language,
    loading = false
  ) {
    getLanguageButtons().forEach((button) => {
      const active =
        button.dataset.language === language;

      button.setAttribute(
        'aria-pressed',
        String(active)
      );

      button.disabled = loading;

      button.setAttribute(
        'aria-busy',
        String(loading)
      );
    });
  }

  async function setLanguage(
    requestedLanguage,
    { persist = true } = {}
  ) {
    const language =
      normaliseLanguage(requestedLanguage);

    const requestId = ++latestRequest;

    updateLanguageButtons(
      language,
      true
    );

    try {
      const strings =
        await loadLocale(language);

      /*
        Jika user tekan BM/ENG dengan cepat,
        hanya click paling terbaru digunakan.
      */
      if (requestId !== latestRequest) {
        return;
      }

      applyTranslations(strings);

      document.documentElement.lang =
        language === 'bm'
          ? 'ms'
          : 'en';

      document.documentElement.dataset.language =
        language;

      document.documentElement.dataset.languageReady =
        'true';

      if (persist) {
        saveLanguage(language);
      }

      updateLanguageButtons(
        language,
        false
      );

      document.dispatchEvent(
        new CustomEvent(
          'l2s:languagechange',
          {
            detail: {
              language
            }
          }
        )
      );
    } catch (error) {
      if (requestId !== latestRequest) {
        return;
      }

      console.warn(
        'Learn2Step4ward: locale gagal dimuatkan.',
        error
      );

      document.documentElement.dataset.languageReady =
        'error';

      updateLanguageButtons(
        getStoredLanguage(),
        false
      );
    }
  }

  /*
    PENTING:
    listener hanya dipasang pada button.
  */
  getLanguageButtons().forEach((button) => {
    button.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        setLanguage(
          button.dataset.language,
          {
            persist: true
          }
        );
      }
    );
  });

  /*
    Load bahasa terakhir yang user pilih.
  */
  setLanguage(
    getStoredLanguage(),
    {
      persist: false
    }
  );
})();
