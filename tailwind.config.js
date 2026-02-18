/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // BOLD Design System - Primary Colors
      colors: {
        // BOLD Core Brand Colors
        pink: '#FF0080',
        purple: '#7C3AED',
        amber: '#FBBF24',
        dark: '#0F172A',
        bold: {
          // Primary Brand Color - Pink
          pink: {
            50: '#FFF5F9',
            100: '#FFE0ED',
            200: '#FFC0DB',
            300: '#FF80B0',
            400: '#FF4D95',
            500: '#FF0080', // Main pink
            600: '#E50073',
            700: '#CC0066',
            800: '#99004D',
            900: '#660033',
            950: '#330019',
          },
          // Secondary Brand Color - Purple
          purple: {
            50: '#F8F5FF',
            100: '#EFEBFF',
            200: '#DDD1FF',
            300: '#C1A3FF',
            400: '#9B73FF',
            500: '#7C3AED', // Main purple
            600: '#6D28D9',
            700: '#5B21B6',
            800: '#4C1D95',
            900: '#3F0F5C',
            950: '#2D0A47',
          },
          // Tertiary Brand Color - Amber
          amber: {
            50: '#FFFBF0',
            100: '#FEF3E2',
            200: '#FDE8C8',
            300: '#FCCF86',
            400: '#FBBF24', // Main amber
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
            800: '#92400E',
            900: '#78350F',
            950: '#451A03',
          },
          // Dark Background
          dark: {
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A', // Main dark
            950: '#020617',
          },
          // Success States
          success: {
            50: '#F0FDF4',
            100: '#DCFCE7',
            200: '#BBF7D0',
            300: '#86EFAC',
            400: '#4ADE80',
            500: '#22C55E',
            600: '#16A34A',
            700: '#15803D',
            800: '#166534',
            900: '#145231',
            950: '#052E16',
          },
          // Warning/Caution States
          warning: {
            50: '#FEFCE8',
            100: '#FEF3C7',
            200: '#FDE68A',
            300: '#FCD34D',
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
            800: '#92400E',
            900: '#78350F',
            950: '#451A03',
          },
          // Error/Danger States
          error: {
            50: '#FEF2F2',
            100: '#FEE2E2',
            200: '#FECACA',
            300: '#FCA5A5',
            400: '#F87171',
            500: '#EF4444',
            600: '#DC2626',
            700: '#B91C1C',
            800: '#991B1B',
            900: '#7F1D1D',
            950: '#4C0519',
          },
          // Info/Intelligence States
          info: {
            50: '#F0F9FF',
            100: '#E0F2FE',
            200: '#BAE6FD',
            300: '#7DD3FC',
            400: '#38BDF8',
            500: '#0EA5E9',
            600: '#0284C7',
            700: '#0369A1',
            800: '#075985',
            900: '#0C4A6E',
            950: '#051E3E',
          },
        },
      },
      // Typography
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'monospace'],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px', letterSpacing: '0.5px' }],
        sm: ['14px', { lineHeight: '20px', letterSpacing: '0.25px' }],
        base: ['16px', { lineHeight: '24px', letterSpacing: '0.15px' }],
        lg: ['18px', { lineHeight: '28px', letterSpacing: '0.1px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
        '5xl': ['48px', { lineHeight: '52px' }],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      // Spacing
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '48px',
        '4xl': '64px',
        '5xl': '80px',
      },
      // Border Radius - 16px is BOLD default
      borderRadius: {
        none: '0',
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
        full: '9999px',
      },
      // Shadows - BOLD bold shadows
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        // BOLD specific shadows
        'bold-sm': '0 2px 8px rgba(255, 0, 128, 0.15)',
        'bold-md': '0 4px 16px rgba(255, 0, 128, 0.2)',
        'bold-lg': '0 8px 24px rgba(255, 0, 128, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        none: 'none',
      },
      // Transitions
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
        slower: '500ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      // Gradients
      backgroundImage: {
        'gradient-bold': 'linear-gradient(135deg, #FF0080 0%, #7C3AED 50%, #FBBF24 100%)',
        'gradient-pink-purple': 'linear-gradient(135deg, #FF0080 0%, #7C3AED 100%)',
        'gradient-purple-dark': 'linear-gradient(135deg, #7C3AED 0%, #0F172A 100%)',
      },
    },
  },
  plugins: [],
};
