export default {
  state: {
    darkMode: false,
  },
  getters: {
    getDarkMode: (state) => state.darkMode,
  },
  mutations: {
    // set darkMode value
    setDarkMode(state, isEnable) {
      state.darkMode = isEnable;
      const htmlElement = document.documentElement;
      let theme = 'light';
      if (isEnable) {
        theme = 'dark';
      }
      localStorage.setItem('theme', theme);
      htmlElement.setAttribute('theme', theme);
    },
  },
};
