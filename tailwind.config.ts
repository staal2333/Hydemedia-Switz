import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Blue Hour palette (canonical)
        dusk:      '#1f3a5f',
        'dusk-2':  '#2a4d7a',
        mid:       '#4a7bb5',
        sky:       '#8cb4dd',
        'sky-2':   '#b4cfe6',
        fog:       '#d9e7f1',
        cream:     '#f5ede1',
        'cream-2': '#faf3e6',
        glow:      '#ffecc8',
        'ink-soft':'#3a547a',
        ink:       '#0e1e33',
        accent:    '#ffb877',

        // Legacy aliases — kept so old pages don't break while we migrate
        'navy-primary':  '#0e1e33',
        'teal-accent':   '#00D9D9',
        'coral-accent':  '#FF6B6B',
        'hyde-navy':     '#0A2342',
        'nordic-blue':   '#2E5EAA',
        'stone-neutral': '#F5F3EF',
        muted:           '#6a7e9a',
        charcoal: {
          DEFAULT: '#2C3539',
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#d4d4d4',
          300: '#a3a3a3',
          400: '#737373',
          500: '#525252',
          600: '#404040',
          700: '#2C3539',
          800: '#1a1a1a',
          900: '#0a0a0a',
        },
        success: '#2D6A4F',
        warning: '#D97706',
        error:   '#DC2626',
        info:    '#0369A1',
        primary: {
          50: '#faf9f7',
          100: '#f5f3f0',
          200: '#e8e5e0',
          300: '#d6d1c8',
          400: '#b8b0a3',
          500: '#9c917f',
          600: '#7a6f5f',
          700: '#5d5448',
          800: '#3d3630',
          900: '#1f1c18',
        },
      },
      fontFamily: {
        display: ['"Funnel Display"', 'system-ui', 'sans-serif'],
        ui:      ['"Funnel Display"', 'system-ui', 'sans-serif'], // labels, buttons, menu — same family as display
        body:    ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'body-lg': ['20px', { lineHeight: '1.6', fontWeight: '400' }],
        'body':    ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-xs': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        'shell': '1440px',
      },
    },
  },
  plugins: [],
};
export default config;
