module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    'cypress/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'airbnb',
    'prettier',
    'plugin:storybook/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: { version: 'detect' },
  },
  plugins: ['react-refresh', 'react', 'prettier', 'cypress'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'global-require': 'off',
    'eslintimport/no-extraneous-dependencies': 'off',
    'no-param-reassign': 'off',
    'react/forbid-prop-types': 'off',
  },
};
