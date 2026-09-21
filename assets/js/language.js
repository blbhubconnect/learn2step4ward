document.addEventListener("DOMContentLoaded", () => {
  const rootPath = document.body.getAttribute("data-root") || "";
  const langToggleBtns = document.querySelectorAll(".lang-btn");
  const defaultLang = "bm";
  let currentLang = localStorage.getItem("l2s4w_lang") || defaultLang;

  function updateActiveButton(lang) {
    langToggleBtns.forEach(btn => {
      if (btn.getAttribute("data-lang") === lang) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  function applyTranslations(translations) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[key]) {
        el.innerHTML = translations[key];
      }
    });
  }

  function loadLanguage(lang) {
    fetch(`${rootPath}locales/${lang}.json`)
      .then(response => {
        if (!response.ok) throw new Error("Locale not found");
        return response.json();
      })
      .then(translations => {
        applyTranslations(translations);
        document.documentElement.lang = lang; // Update HTML lang tag
      })
      .catch(err => {
        console.error("Language translation error:", err);
      });
  }

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("l2s4w_lang", lang);
    updateActiveButton(lang);
    loadLanguage(lang);
  }

  langToggleBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      setLanguage(btn.getAttribute("data-lang"));
    });
  });

  // Initial load
  setLanguage(currentLang);
});
