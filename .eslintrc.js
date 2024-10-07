/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended', // Add this to run Prettier through ESLint
    'eslint-config-prettier', // Place this last to disable conflicting rules
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error', // Keep this to enforce Prettier rules
    'react/prop-types': 0,
    'react/jsx-key': 2,
    'linebreak-style': ['error', 'unix'],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'no-shadow-restricted-names': 2,
    'no-use-before-define': 0,
    'import/no-webpack-loader-syntax': 'off',
    'no-unused-vars': 'warn',
    'max-len': ['error', { code: 200 }],
  },
};
