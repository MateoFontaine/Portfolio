import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#0C1120',
        foreground: '#FFFFFF',
        card: {
          DEFAULT: '#1E293B',
          foreground: '#FFFFFF'
        },
        popover: {
          DEFAULT: '#1E293B',
          foreground: '#FFFFFF'
        },
        primary: {
          DEFAULT: '#3A82FF',
          foreground: '#FFFFFF'
        },
        secondary: {
          DEFAULT: '#1E293B',
          foreground: '#FFFFFF'
        },
        muted: {
          DEFAULT: '#1E293B',
          foreground: '#A1A1AA'
        },
        accent: {
          DEFAULT: '#1E293B',
          foreground: '#FFFFFF'
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF'
        },
        border: '#1E293B',
        input: '#1E293B',
        ring: '#3A82FF',
        "text-primary": '#FFFFFF',
        "text-muted": '#A1A1AA',
        "text-subtle": '#64748B',
        surface: '#1E293B',
        chart: {
          '1': '#3A82FF',
          '2': '#60A5FA',
          '3': '#93C5FD',
          '4': '#BFDBFE',
          '5': '#DBEAFE'
        },
        sidebar: {
          DEFAULT: '#1E293B',
          foreground: '#FFFFFF',
          primary: '#3A82FF',
          'primary-foreground': '#FFFFFF',
          accent: '#1E293B',
          'accent-foreground': '#FFFFFF',
          border: '#334155',
          ring: '#3A82FF'
        }
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
