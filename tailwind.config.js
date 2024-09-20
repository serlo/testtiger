const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#374151', // gray-700
            '--tw-prose-headings': '#111827', // gray-900
            '--tw-prose-lead': '#6B7280', // gray-500
            '--tw-prose-links': '#2563EB', // blue-600
            '--tw-prose-bold': '#111827', // gray-900
            '--tw-prose-counters': '#4B5563', // gray-600
            '--tw-prose-bullets': '#9CA3AF', // gray-400
            '--tw-prose-hr': '#E5E7EB', // gray-200
            '--tw-prose-quotes': '#111827', // gray-900
            '--tw-prose-quote-borders': '#E5E7EB', // gray-200
            '--tw-prose-captions': '#6B7280', // gray-500
            '--tw-prose-code': '#111827', // gray-900
            '--tw-prose-pre-code': '#F3F4F6', // gray-100
            '--tw-prose-pre-bg': '#111827', // gray-900
            '--tw-prose-th-borders': '#D1D5DB', // gray-300
            '--tw-prose-td-borders': '#E5E7EB', // gray-200
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
