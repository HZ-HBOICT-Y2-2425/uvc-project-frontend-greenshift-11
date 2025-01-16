/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      keyframes: {
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
      },
      animation: {
        fadeOut: 'fadeOut 0.5s ease-out forwards',
        fadeIn: 'fadeIn 0.5s ease-out',
        scaleOut: 'scaleOut 0.5s ease-out forwards',
      },
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
        aside: '#5a734f'
      },
    },
  },
  plugins: [],
};

