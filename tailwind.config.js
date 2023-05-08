/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        login: '',
      },
      colors: {
        brand: '#338E03',
      },
    },
    screens: {
      xs: { max: '425px' },
      sm: { min: '426px' },
      md: { min: '769px' },
      lg: { min: '1440px' },
      xl: { min: '2560px' },
    },
  },
  plugins: [],
};
