module.exports = {
  transform: {
    '^.+\\.svelte$': 'svelte-jester',
    '^.+\\.m?js$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'mjs', 'svelte'],
  testMatch: [
    '**/__tests__/**/*.test.(js|mjs)',
    '**/?(*.)(spec|test).(js|mjs)'
  ],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'svelte'],
  transformIgnorePatterns: ['node_modules/(?!@testing-library/svelte)'], // Modify if needed
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};