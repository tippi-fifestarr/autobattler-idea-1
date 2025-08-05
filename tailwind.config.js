/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dev-blue': '#0066cc',
        'dev-dark': '#1a1a1a',
        'dev-gray': '#f5f5f5',
      },
    },
  },
  plugins: [],
} 