module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    // optional tweaks
    "@typescript-eslint/no-unused-vars": ["warn"],
    "react/react-in-jsx-scope": "off", // RN/Expo don't need React import
  },
};
