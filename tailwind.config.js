module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // School Color Palette
        school: {
          navy: '#1E3A5F',      // Dark Navy Blue
          blue: '#3B6FB6',      // Medium Blue
          gold: '#F5C518',      // Golden Yellow
          yellow: '#FFE066',    // Light Yellow
          cream: '#FFF9E6',     // Cream/Light Background
          gray: '#5C5C5C',      // Professional Gray
          lightGray: '#F5F5F0', // Light Gray Background
        },
        primary: {
          50: '#FFF9E6',        // Cream
          100: '#FFE066',       // Light Yellow
          200: '#F5C518',       // Gold
          500: '#3B6FB6',       // Medium Blue
          600: '#2D5A9E',       // Darker Blue
          700: '#1E3A5F',       // Navy
          800: '#152C4A',       // Darker Navy
          900: '#0D1B2A',       // Darkest Navy
        },
        secondary: {
          100: '#FFE066',
          200: '#F5C518',
          500: '#F5C518',
          600: '#E0B000',
        },
        accent: {
          gold: '#F5C518',
          yellow: '#FFE066',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundColor: {
        'page': '#FFF9E6',      // Light cream background for pages
        'card': '#FFFFFF',      // White cards
      }
    },
  },
  plugins: [],
}