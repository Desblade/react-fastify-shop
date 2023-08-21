module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'script',
  },
  env: {
    node: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'no-shadow': 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
