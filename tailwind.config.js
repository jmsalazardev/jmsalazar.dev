module.exports = {
  darkMode: 'class',
  content: ['src/site/**/*.njk'],
  theme: {
    extend: {},
  },
  plugins: [
     require('@tailwindcss/typography'),
     require('@tailwindcss/line-clamp'),
  ],
}
