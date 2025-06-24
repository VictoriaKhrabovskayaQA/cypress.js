const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.noSandbox = true; // Отключение песочницы Chrome
      return config;
    },
    chromeWebSecurity: false, // Отключение безопасности CORS
    defaultCommandTimeout: 10000, // Таймаут для команд
    viewportHeight: 1080, // Высота viewport
    viewportWidth: 1920, // Ширина viewport
    baseUrl: "https://login.qa.studio", // Базовый URL
  },
});

