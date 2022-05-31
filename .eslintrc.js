module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "standard-with-typescript",
    "plugin:prettier/recommended",
    "plugin:node/recommended",
    "eslint:recommended",
    "plugin:eslint-comments/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/no-explicit-any": ["error"],
    "node/no-unsupported-features/es-syntax": [
      "error",
      { ignores: ["modules"] },
    ],
    "node/no-missing-import": [
      "error",
      {
        tryExtensions: [".ts", ".js", ".json", ".node", ".d.ts"],
      },
    ],
    "@typescript-eslint/no-unused-vars": "error",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
  overrides: [
    {
      files: ["**/test/**/*.ts"],
      rules: {
        "@typescript-eslint/no-unused-expressions": "off",
      },
    },
    {
      files: ["**/typechain/**"],
      rules: {
        "eslint-comments/no-unlimited-disable": "off",
      },
    },
  ],
};
