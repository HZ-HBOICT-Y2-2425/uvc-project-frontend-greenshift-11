/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        greenLight: "#C1E899",
        brownWarm: "#9A6735",
        greenPale: "#E6F0DC",
        greenDeep: "#55883B",
      },
    },
  },
  plugins: [],
};
