module.exports = {
  // mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/@zach.codes/react-calendar/dist/**/*.js ',
  ],
  
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
