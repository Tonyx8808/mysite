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
        navy: '#060914',
        'navy-light': '#0D1225',
        'navy-card': '#0A1020',
        blue: {
          electric: '#0066FF',
          bright: '#2D8FFF',
          glow: '#0044CC',
          neon: '#00A3FF',
        },
        chrome: '#C0C8D8',
        'chrome-dark': '#6B7A99',
        'chrome-light': '#E8EDF8',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
