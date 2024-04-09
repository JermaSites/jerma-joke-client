module.exports = {
  root: true,
  plugins: ["nuxt"],
  extends: ["@nuxt", "plugin:prettier/recommended", "prettier"],
  env: {
    browser: true,
    node: true,
  },
};
