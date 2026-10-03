/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FDFBF7',
          100: '#F9F4E8',
          200: '#F2E4C4',
          300: '#E8D098',
          400: '#DCB962',
          500: '#C29B1A', // Primary Gold Ochre from Logo
          600: '#A68212',
          700: '#84660B',
          800: '#5F4805',
          900: '#3D2F03',
        },
        bronze: {
          50: '#FBF9F7',
          100: '#F4EFEA',
          200: '#E5DCD2',
          300: '#CCBDB0',
          400: '#9E8B7A',
          500: '#6E5D4E',
          600: '#524538',
          700: '#3D3329',
          800: '#2A231C', // Dark Coffee from Logo Text
          900: '#1C1712',
          950: '#0E0B09',
        },
        navy: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#3B82F6',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E293B',
          950: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Cabinet Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(194, 155, 26, 0.3)',
        'premium': '0 20px 40px -15px rgba(42, 35, 28, 0.08), 0 0 10px rgba(0,0,0,0.02)',
      }
    },
  },
  plugins: [],
}
