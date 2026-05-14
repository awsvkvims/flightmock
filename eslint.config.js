const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');

module.exports = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      // No implicit any — forces explicit types (supports ISP in SOLID)
      '@typescript-eslint/no-explicit-any': 'error',
      // Hooks must follow React's rules — catches violations at lint time
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Recommended rules from each plugin
      ...tseslint.configs.recommended.rules,
    },
    settings: {
      react: { version: 'detect' },
    },
  },
  {
    // Ignore generated and dependency folders — not our code to lint
    ignores: ['node_modules/**', '.expo/**', 'dist/**'],
  },
];
