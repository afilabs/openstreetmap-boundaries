/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'eslint-config-prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'eslint-plugin-prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 0,
    'react/jsx-key': 2,
    'linebreak-style': ['error', 'unix'],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    // 'no-shadow': 2, // http://eslint.org/docs/rules/no-shadow
    'no-shadow-restricted-names': 2, // http://eslint.org/docs/rules/no-shadow-restricted-names
    'no-use-before-define': 0,
    'import/no-webpack-loader-syntax': 'off',
    'no-unused-vars': 'warn',
    'max-len': ['error', { code: 200 }],
  },
};
