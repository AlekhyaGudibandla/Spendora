/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-canvas)',
        panel: 'var(--color-panel)',
        edge: 'var(--color-edge)',
        ink: 'var(--color-ink)',
        muted: 'var(--color-muted)',
        highlight: 'var(--color-highlight)',
        sage: 'var(--color-sage)',
        moss: 'var(--color-moss)',
        glow: 'var(--color-glow)',
        expense: 'var(--color-expense)',
        accent: 'var(--color-accent)',
        primary: 'var(--color-primary)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        float: '0 18px 48px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.04)',
        lift: '0 28px 64px -16px rgba(0, 0, 0, 0.55), 0 0 40px -8px rgba(111, 127, 114, 0.12)',
        insetGlow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
      },
      backgroundImage: {
        'glass-dark':
          'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
        'glass-light':
          'linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(243,245,241,0.6) 100%)',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.85' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        shimmer: 'shimmer 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
