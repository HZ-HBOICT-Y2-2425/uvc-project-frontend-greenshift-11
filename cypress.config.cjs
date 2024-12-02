const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // Change this to your actual base URL
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    // Other options
  },

  component: {
    devServer: {
      framework: "svelte",
      bundler: "vite",
    },
  },
});
