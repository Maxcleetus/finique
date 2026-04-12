/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#2e1065', // Dark violet-950 to perfectly match the logo
          slate: '#F4F6FA',
          border: '#D9DEE8',
          ink: '#1A1F2F'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      boxShadow: {
        panel: '0 10px 25px rgba(10, 31, 92, 0.08)'
      }
    }
  },
  plugins: []
};
