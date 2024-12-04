// jest.config.js or jest.config.cjs
module.exports = {
  moduleFileExtensions: ["js", "svelte"],
  transform: {
    "^.+\\.svelte$": "svelte-jester", // Transform Svelte files
    "^.+\\.[jt]sx?$": "babel-jest",     // Transform JavaScript and TypeScript
  },
  transformIgnorePatterns: [
    "/node_modules/(?!@testing-library|svelte)", // Transform specific packages
  ],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: "jsdom", // Use jsdom for testing environment
};