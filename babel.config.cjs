// babel.config.cjs
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript', // If using TypeScript
  ],
  plugins: [
    '@babel/plugin-transform-runtime', // optional plugin
  ],
};