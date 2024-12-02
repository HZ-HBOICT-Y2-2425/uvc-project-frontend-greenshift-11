const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173/home",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
  },

  component: {
    devServer: {
      framework: "svelte",
      bundler: "vite",
    },
  },
});
