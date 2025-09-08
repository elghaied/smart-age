import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [
    tailwindcssAnimate,
    typography,
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      })
    },
  ],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: 'clamp(1rem, 4vw, 2rem)',
        sm: 'clamp(1rem, 4vw, 2rem)',
        md: 'clamp(1rem, 4vw, 2rem)',
        lg: 'clamp(1rem, 4vw, 2rem)',
        xl: 'clamp(1rem, 4vw, 2rem)',
        '2xl': 'clamp(1rem, 4vw, 2rem)',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          DEFAULT: 'oklch(var(--accent))',
          foreground: 'oklch(var(--accent-foreground))',
        },
        background: 'oklch(var(--background))',
        border: 'oklch(var(--border))',
        card: {
          DEFAULT: 'oklch(var(--card))',
          foreground: 'oklch(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive))',
          foreground: 'oklch(var(--destructive-foreground))',
        },
        foreground: 'oklch(var(--foreground))',
        input: 'oklch(var(--input))',
        muted: {
          DEFAULT: 'oklch(var(--muted))',
          foreground: 'oklch(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'oklch(var(--popover))',
          foreground: 'oklch(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'oklch(var(--primary))',
          foreground: 'oklch(var(--primary-foreground))',
        },
        ring: 'oklch(var(--ring))',
        secondary: {
          DEFAULT: 'oklch(var(--secondary))',
          foreground: 'oklch(var(--secondary-foreground))',
        },
        success: 'oklch(var(--success))',
        error: 'oklch(var(--error))',
        warning: 'oklch(var(--warning))',
        // Smart Age Tech teal color palette for additional styling options
        teal: {
          50: 'oklch(0.98 0.01 200)',
          100: 'oklch(0.95 0.02 200)',
          200: 'oklch(0.90 0.04 200)',
          300: 'oklch(0.80 0.06 200)',
          400: 'oklch(0.70 0.08 200)',
          500: 'oklch(0.60 0.10 200)',
          600: 'oklch(0.50 0.12 200)',
          700: 'oklch(0.40 0.10 200)',
          800: 'oklch(0.30 0.08 200)',
          900: 'oklch(0.20 0.06 200)',
          950: 'oklch(0.10 0.04 200)',
        },
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-geist-sans)'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.4' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.6' }],
        lg: ['1.125rem', { lineHeight: '1.5' }],
        xl: ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.15' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.05' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        // Responsive typography sizes
        'display-sm': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.04em' }],
        'display-md': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.05em' }],
        'display-lg': ['clamp(3rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.06em' }],
        'display-xl': ['clamp(3.5rem, 7vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.07em' }],
        // Body text variants
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-lg': ['1.125rem', { lineHeight: '1.5' }],
        'body-xl': ['1.25rem', { lineHeight: '1.5' }],
        // Caption and small text
        caption: ['0.75rem', { lineHeight: '1.4' }],
        overline: [
          '0.75rem',
          { lineHeight: '1.4', letterSpacing: '0.1em', textTransform: 'uppercase' },
        ],
      },
      lineHeight: {
        none: '1',
        tight: '1.1',
        snug: '1.2',
        normal: '1.4',
        relaxed: '1.5',
        loose: '1.6',
        'extra-loose': '1.8',
      },
      letterSpacing: {
        tighter: '-0.07em',
        tight: '-0.05em',
        snug: '-0.03em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      spacing: {
        0: '0',
        px: '1px',
        0.5: '0.125rem',
        1: '0.25rem',
        1.5: '0.375rem',
        2: '0.5rem',
        2.5: '0.625rem',
        3: '0.75rem',
        3.5: '0.875rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        18: '4.5rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        44: '11rem',
        48: '12rem',
        52: '13rem',
        56: '14rem',
        60: '15rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
        96: '24rem',
        // Design system spacing scale
        xs: '0.5rem', // 8px
        sm: '0.75rem', // 12px
        md: '1rem', // 16px
        lg: '1.5rem', // 24px
        xl: '2rem', // 32px
        '2xl': '3rem', // 48px
        '3xl': '4rem', // 64px
        '4xl': '6rem', // 96px
        '5xl': '8rem', // 128px
        '6xl': '12rem', // 192px
        '7xl': '16rem', // 256px
        '8xl': '20rem', // 320px
        // Section spacing
        'section-sm': 'clamp(2rem, 5vw, 4rem)',
        'section-md': 'clamp(3rem, 8vw, 6rem)',
        'section-lg': 'clamp(4rem, 10vw, 8rem)',
        'section-xl': 'clamp(6rem, 12vw, 12rem)',
        // Component spacing
        'component-sm': 'clamp(1rem, 3vw, 2rem)',
        'component-md': 'clamp(1.5rem, 4vw, 3rem)',
        'component-lg': 'clamp(2rem, 5vw, 4rem)',
        // Content spacing
        'content-sm': 'clamp(0.75rem, 2vw, 1.5rem)',
        'content-md': 'clamp(1rem, 3vw, 2rem)',
        'content-lg': 'clamp(1.5rem, 4vw, 3rem)',
      },
      maxWidth: {
        none: 'none',
        0: '0rem',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        full: '100%',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',
        prose: '65ch',
        // Content width constraints
        content: '65ch',
        'content-sm': '45ch',
        'content-lg': '75ch',
        // Layout width constraints
        'layout-sm': '640px',
        'layout-md': '768px',
        'layout-lg': '1024px',
        'layout-xl': '1280px',
        'layout-2xl': '1536px',
        // Component width constraints
        'component-sm': '320px',
        'component-md': '480px',
        'component-lg': '640px',
        'component-xl': '800px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'oklch(var(--foreground))',
            '--tw-prose-headings': 'oklch(var(--foreground))',
            '--tw-prose-links': 'oklch(var(--primary))',
            '--tw-prose-bold': 'oklch(var(--foreground))',
            '--tw-prose-counters': 'oklch(var(--muted-foreground))',
            '--tw-prose-bullets': 'oklch(var(--muted-foreground))',
            '--tw-prose-hr': 'oklch(var(--border))',
            '--tw-prose-quotes': 'oklch(var(--muted-foreground))',
            '--tw-prose-quote-borders': 'oklch(var(--primary))',
            '--tw-prose-captions': 'oklch(var(--muted-foreground))',
            '--tw-prose-code': 'oklch(var(--foreground))',
            '--tw-prose-pre-code': 'oklch(var(--muted-foreground))',
            '--tw-prose-pre-bg': 'oklch(var(--muted))',
            '--tw-prose-th-borders': 'oklch(var(--border))',
            '--tw-prose-td-borders': 'oklch(var(--border))',
            maxWidth: 'none',
            color: 'var(--tw-prose-body)',
            lineHeight: '1.6',
            fontSize: '1rem',
            fontFamily: 'var(--font-geist-sans)',
            h1: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '700',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: '1.1',
              letterSpacing: '-0.05em',
              marginTop: '0',
              marginBottom: '0.5em',
              fontFamily: 'var(--font-geist-sans)',
            },
            h2: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: '1.15',
              letterSpacing: '-0.04em',
              marginTop: '2em',
              marginBottom: '0.5em',
              fontFamily: 'var(--font-geist-sans)',
            },
            h3: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              lineHeight: '1.2',
              letterSpacing: '-0.03em',
              marginTop: '1.6em',
              marginBottom: '0.5em',
              fontFamily: 'var(--font-geist-sans)',
            },
            h4: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
              fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
              lineHeight: '1.25',
              letterSpacing: '-0.02em',
              marginTop: '1.5em',
              marginBottom: '0.5em',
              fontFamily: 'var(--font-geist-sans)',
            },
            h5: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              lineHeight: '1.3',
              letterSpacing: '-0.01em',
              marginTop: '1.5em',
              marginBottom: '0.5em',
              fontFamily: 'var(--font-geist-sans)',
            },
            h6: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              lineHeight: '1.35',
              marginTop: '1.5em',
              marginBottom: '0.5em',
              fontFamily: 'var(--font-geist-sans)',
            },
            p: {
              marginTop: '1rem',
              marginBottom: '1rem',
              lineHeight: '1.6',
              fontFamily: 'var(--font-geist-sans)',
            },
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.2s ease-in-out',
              '&:hover': {
                color: 'oklch(var(--accent))',
                textDecoration: 'underline',
              },
            },
            strong: {
              color: 'var(--tw-prose-bold)',
              fontWeight: '600',
            },
            code: {
              color: 'var(--tw-prose-code)',
              fontWeight: '500',
              fontSize: '0.875em',
              fontFamily: 'var(--font-geist-mono)',
              backgroundColor: 'oklch(var(--muted))',
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              color: 'var(--tw-prose-pre-code)',
              backgroundColor: 'var(--tw-prose-pre-bg)',
              overflowX: 'auto',
              fontSize: '0.875em',
              lineHeight: '1.5',
              marginTop: '1.5em',
              marginBottom: '1.5em',
              borderRadius: '0.5rem',
              padding: '1rem',
              fontFamily: 'var(--font-geist-mono)',
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderWidth: '0',
              borderRadius: '0',
              padding: '0',
              fontWeight: '400',
              color: 'inherit',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              lineHeight: 'inherit',
            },
            blockquote: {
              fontWeight: '400',
              fontStyle: 'italic',
              color: 'var(--tw-prose-quotes)',
              borderLeftWidth: '0.25rem',
              borderLeftColor: 'var(--tw-prose-quote-borders)',
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
              marginTop: '1.5em',
              marginBottom: '1.5em',
              paddingLeft: '1em',
            },
            'blockquote p:first-of-type::before': {
              content: 'open-quote',
            },
            'blockquote p:last-of-type::after': {
              content: 'close-quote',
            },
            ul: {
              listStyleType: 'disc',
              marginTop: '1rem',
              marginBottom: '1rem',
              paddingLeft: '1.5rem',
            },
            ol: {
              listStyleType: 'decimal',
              marginTop: '1rem',
              marginBottom: '1rem',
              paddingLeft: '1.5rem',
            },
            li: {
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
              lineHeight: '1.6',
            },
            'li p': {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
          },
        },
        sm: {
          css: {
            fontSize: '0.875rem',
            lineHeight: '1.5',
            h1: {
              fontSize: 'clamp(2rem, 4vw, 3rem)',
            },
            h2: {
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            },
            h3: {
              fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
            },
          },
        },
        lg: {
          css: {
            fontSize: '1.125rem',
            lineHeight: '1.6',
            h1: {
              fontSize: 'clamp(3rem, 6vw, 5rem)',
            },
            h2: {
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
            },
            h3: {
              fontSize: 'clamp(1.875rem, 4vw, 3rem)',
            },
          },
        },
        xl: {
          css: {
            fontSize: '1.25rem',
            lineHeight: '1.6',
            h1: {
              fontSize: 'clamp(3.5rem, 7vw, 6rem)',
            },
            h2: {
              fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
            },
            h3: {
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
            },
          },
        },
      }),
    },
  },
}

export default config
