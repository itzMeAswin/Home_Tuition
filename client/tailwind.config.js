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
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#BAE0FD',
          300: '#7DC4FC',
          400: '#38A7F8',
          500: '#2563EB', // Primary Vibrant Royal Blue
          600: '#1D4ED8',
          700: '#1E40AF',
          800: '#1E3A8A',
          900: '#172554',
          950: '#0B132B',
        },
        bronze: {
          50: '#F8FAFC',  // Crisp slate surface
          100: '#F1F5F9', // Soft light slate
          200: '#E2E8F0', // Border slate
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155', // Rich slate text
          800: '#1E293B', // Dark slate contrast
          900: '#0F172A', // Midnight slate
          950: '#020617', // Obsidian deep black
        },
        navy: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#3B82F6',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#0F172A',
          950: '#020617',
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
