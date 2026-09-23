/*
 * Home-only locale fallback.
 *
 * The main language system still loads locales/bm.json or locales/en.json when
 * the site is served normally (for example on GitHub Pages). This fallback is
 * used only when JSON fetch is unavailable, such as when index.html is opened
 * directly with file:// during local testing.
 */
window.L2S_HOME_LOCALES = {
  bm: {
    skipContent: 'Langkau ke kandungan utama', menu: 'Menu', light: 'Cerah', dark: 'Gelap',
    home: 'Home', startHere: 'Mula Di Sini', subjects: 'Subjek', bahasaMelayu: 'Bahasa Melayu',
    english: 'English', mathematics: 'Matematik', science: 'Sains', practice: 'Latihan',
    resources: 'Resources', teachers: 'Teachers', parents: 'Ibu Bapa', about: 'Tentang Kami',
    startLearning: 'Mula Belajar', chooseSubject: 'Pilih Subjek', learnBM: 'Belajar Bahasa Melayu',
    learnEnglish: 'Learn English', learnMath: 'Belajar Matematik', learnScience: 'Belajar Sains',
    learn: 'Belajar', try: 'Cuba', hint: 'Petunjuk', check: 'Semak', tryAgain: 'Cuba Semula',
    moveForward: 'Maju', mistakesHeading: 'Salah Bukan Bermaksud Gagal', forAdults: 'Untuk Orang Dewasa',
    footerEducation: 'Bahan pembelajaran adalah untuk tujuan pendidikan dan pembelajaran kendiri.',
    footerSubjects: 'Bahasa Melayu • English • Matematik • Sains', homeExplore: 'Teroka & Belajar',
    homeChooseActivity: 'Apa yang mahu dibuat sekarang?',
    homeStartIntro: 'Ikut langkah mudah dan belajar satu perkara pada satu masa.',
    homeQuickAccess: 'Pilihan Pantas',
    homeQuickAccessIntro: 'Terus ke latihan, resources atau pilih subjek yang mahu dipelajari.',
    homeSubjectsIntro: 'Empat ruang pembelajaran. Pilih satu dan mula dengan topik yang sesuai.',
    homePageTitle: 'Home | Learn2Step4ward',
    homeMetaDescription: 'Bahan pembelajaran kendiri untuk membantu murid Tahun 4 memahami asas, mencuba latihan dan memperbaiki kesalahan langkah demi langkah.',
    sitePreferences: 'Keutamaan laman', languageLabel: 'Bahasa', displayTheme: 'Tema paparan',
    mainNavigation: 'Navigasi utama', languageUtility: 'Bahasa / Language', displayUtility: 'Paparan / Display',
    navStart: 'Mula', navLearn: 'Belajar', navSupport: 'Sokongan', subjectShortcuts: 'Pintasan subjek',
    homeEyebrow: 'Learning Hub untuk Murid Tahun 4',
    homeHeroDescription: 'Bahan pembelajaran kendiri untuk membantu murid Tahun 4 memahami asas, mencuba latihan dan memperbaiki kesalahan langkah demi langkah.',
    learningFlowLabel: 'Aliran pembelajaran', homeBmDescription: 'Bina ayat. Fahami petikan.',
    homeEnglishDescription: 'Read, understand and respond.', homeMathDescription: 'Faham konsep. Selesaikan langkah.',
    homeScienceDescription: 'Perhati, fikir dan terangkan.',
    homeMistakesDescription: 'Kesalahan membantu kita tahu apa yang perlu disemak. Kenal pasti Fakta, Konsep atau Kecuaian, kemudian cuba semula.'
  },
  en: {
    skipContent: 'Skip to main content', menu: 'Menu', light: 'Light', dark: 'Dark', home: 'Home',
    startHere: 'Start Here', subjects: 'Subjects', bahasaMelayu: 'Bahasa Melayu', english: 'English',
    mathematics: 'Mathematics', science: 'Science', practice: 'Practice', resources: 'Resources',
    teachers: 'Teachers', parents: 'Parents', about: 'About', startLearning: 'Start Learning',
    chooseSubject: 'Choose a Subject', learnBM: 'Learn Bahasa Melayu', learnEnglish: 'Learn English',
    learnMath: 'Learn Mathematics', learnScience: 'Learn Science', learn: 'Learn', try: 'Try', hint: 'Hint',
    check: 'Check', tryAgain: 'Try Again', moveForward: 'Move Forward',
    mistakesHeading: 'Mistakes Are Part of Learning', forAdults: 'For Adults',
    footerEducation: 'Learning materials are provided for education and self-directed learning.',
    footerSubjects: 'Bahasa Melayu • English • Mathematics • Science', homeExplore: 'Explore & Learn',
    homeChooseActivity: 'What would you like to do now?',
    homeStartIntro: 'Follow simple steps and learn one thing at a time.', homeQuickAccess: 'Quick Access',
    homeQuickAccessIntro: 'Go straight to practice, resources, or choose a subject to learn.',
    homeSubjectsIntro: 'Four learning spaces. Choose one and begin with a suitable topic.',
    homePageTitle: 'Home | Learn2Step4ward',
    homeMetaDescription: 'Self-directed learning materials to help Year 4 pupils understand the basics, practise, and learn from mistakes step by step.',
    sitePreferences: 'Site preferences', languageLabel: 'Language', displayTheme: 'Display theme',
    mainNavigation: 'Main navigation', languageUtility: 'Language', displayUtility: 'Display',
    navStart: 'Start', navLearn: 'Learn', navSupport: 'Support', subjectShortcuts: 'Subject shortcuts',
    homeEyebrow: 'Learning Hub for Year 4 Pupils',
    homeHeroDescription: 'Self-directed learning materials to help Year 4 pupils understand the basics, practise, and learn from mistakes step by step.',
    learningFlowLabel: 'Learning flow', homeBmDescription: 'Build sentences. Understand texts.',
    homeEnglishDescription: 'Read, understand and respond.',
    homeMathDescription: 'Understand concepts. Work through the steps.',
    homeScienceDescription: 'Observe, think and explain.',
    homeMistakesDescription: 'Mistakes help us see what needs to be checked. Identify whether it is a Fact, Concept or Careless Error, then try again.'
  }
};
