module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": "error",
  },
  plugins: ["prettier"],
  parserOptions: {
    sourceType: "module",
  },
  globals: {
    dataLayer: "readonly",
  },
};
