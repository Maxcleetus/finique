/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0A1F5C',
          slate: '#F4F6FA',
          border: '#D9DEE8',
          ink: '#1A1F2F'
        }
      },
      fontFamily: {
        sans: ['Gilroy', 'sans-serif']
      },
      boxShadow: {
        panel: '0 10px 25px rgba(10, 31, 92, 0.08)'
      }
    }
  },
  plugins: []
};
