import js from "@eslint/js";
import globals from "globals";
import svelte from "eslint-plugin-svelte";
import cypress from "eslint-plugin-cypress"; // Import Cypress plugin

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.svelte"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      svelte,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
  {
    files: ["src/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        jest: "readonly",
        describe: "readonly",
        test: "readonly",
        expect: "readonly",
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
  {
    files: ["cypress/**/*.js", "cypress/**/*.cy.js"], // Add Cypress test files
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...cypress.configs.recommended.env.globals, // Add Cypress globals
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      cypress, // Add Cypress plugin
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off", // Turn off no-undef for Cypress files
    },
  },
  {
    ignores: [
      ".svelte-kit/**", // Ignore generated Svelte files
      "node_modules/**", // Ignore dependencies
    ],
  },
];
