/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ec-black': '#0A0A0A',
        'ec-dark': '#141414',
        'ec-card': '#1A1A1A',
        'ec-gold': '#C9A84C',
        'ec-gold-dim': '#9B7D38',
        'ec-white': '#F5F5F0',
        'ec-muted': '#8A8A8A',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.3em',
        widest3: '0.5em',
      },
    },
  },
  plugins: [],
}
