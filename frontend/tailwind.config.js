/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#000745', 
          slate: '#F4F6FA',
          border: '#D9DEE8',
          ink: '#1A1F2F'
        }
      },
      fontFamily: {
        gilroy: ['Gilroy', 'sans-serif'],
        nanami: ['Nanami', 'Outfit', 'sans-serif'],
        sans: ['Nanami', 'Outfit', 'Inter', 'sans-serif']
      },
      boxShadow: {
        panel: '0 10px 25px rgba(10, 31, 92, 0.08)'
      }
    }
  },
  plugins: []
};
