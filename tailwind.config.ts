import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#064E3B',
          deep: '#032B20',
          hover: '#08634B',
          light: '#0A7A5C',
        },
        mint: {
          DEFAULT: '#10B981',
          light: '#ECFDF5',
          subtle: '#D1FAE5',
          hover: '#059669',
        },
        lime: {
          DEFAULT: '#D4FF00',
          hover: '#BCE500',
          glow: 'rgba(212, 255, 0, 0.35)',
        },
        charcoal: {
          DEFAULT: '#0F172A',
          card: '#1E293B',
          muted: '#64748B',
          border: '#E2E8F0',
        },
        cream: {
          DEFAULT: '#F8FAFC',
          subtle: '#F1F5F9',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        'card': '0 10px 25px -5px rgba(6, 78, 59, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 20px 30px -10px rgba(6, 78, 59, 0.15), 0 10px 15px -5px rgba(0, 0, 0, 0.05)',
        'lime-glow': '0 0 25px rgba(212, 255, 0, 0.4)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
};
export default config;
