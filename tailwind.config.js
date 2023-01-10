module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{njk,md}",
    "./src/**/*.svg",
    "./src/site/_11ty/shortcodes/*.js",
  ],
  safelist: ["bg-white", "bg-purple-900", "dark:fill-gray-600"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
