/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        greenLight: "#C1E899",
        brownWarm: "#9A6735",
        greenPale: "#E6F0DC",
        greenDeep: "#55883B",
        customGreen: '#95D78E',
        customerWhite: '#82AA72',
        customerWhiteContrast: '#AA728A',
      },
    },
  },
  plugins: [], 
}

