import js from "@eslint/js";
import globals from "globals";
import svelte from "eslint-plugin-svelte";

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
    ignores: [
      ".svelte-kit/**", // Ignore generated Svelte files
      "node_modules/**", // Ignore dependencies
    ],
  },
];
