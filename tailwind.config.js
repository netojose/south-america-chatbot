module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        royalblue: {
          50: '#f7fafb',
          100: '#e4f0fd',
          200: '#c6d9fb',
          300: '#9eb5f3',
          400: '#7b8deb',
          500: '#6468e4',
          600: '#4d4cd3',
          700: '#3e39b7',
          800: '#2b2788',
          900: '#181856',
        },
        danger: '#B91C1C',
        primary: '#007bff',
      },
      animation: {
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
};
