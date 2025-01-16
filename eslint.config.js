import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import globals from "globals";
import sveltePlugin from "eslint-plugin-svelte3";

const compat = new FlatCompat({
  baseDirectory: new URL(".", import.meta.url).pathname,
});

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.svelte"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    processor: "svelte3/svelte3",
    plugins: {
      svelte3: sveltePlugin,
    },
    settings: {
      "svelte3/ignore-warnings": () => true, // Ignore irrelevant warnings
      "svelte3/compiler-options": {
        dev: true, // Enable development mode
      },
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
