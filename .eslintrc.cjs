module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: true,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'max-lines-per-function': ['error', 40],
    '@typescript-eslint/no-explicit-any': 'error',
  },
};
