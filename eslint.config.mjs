import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  { files: ['**/*.js'], plugins: { js }, extends: ['js/recommended'], languageOptions: { globals: globals.browser } },
  { files: ['**/*.js'], languageOptions: { sourceType: 'script' } },
  { files: ['**/*.js'], plugins: { '@stylistic': stylistic } },
  {
    files: ['**/*.js'],
    rules: {
      'curly': 'error',
      'no-unused-labels': 'off',
      '@stylistic/arrow-parens': "error",
      '@stylistic/arrow-spacing': "error",
      '@stylistic/block-spacing': "error",
      '@stylistic/brace-style': ["error", "stroustrup"],
      '@stylistic/comma-dangle': ["error", "always-multiline"],
      '@stylistic/comma-spacing': "error",
      '@stylistic/indent': ["error", "tab"],
      '@stylistic/key-spacing': "error",
      '@stylistic/keyword-spacing': "error",
      "@stylistic/space-before-function-paren": ["error", "always"],
      '@stylistic/no-mixed-operators': ["error", { "groups": [["&", "|", "^", "~", "<<", ">>", ">>>"], ["&&", "||"]] }],
      '@stylistic/no-trailing-spaces': "error",
      '@stylistic/no-whitespace-before-property': "error",
      '@stylistic/object-curly-spacing': ["error", "always"],
      '@stylistic/quotes': ["error", "single"],
      '@stylistic/space-before-blocks': "error",
      '@stylistic/space-infix-ops': "error",
    },
  },
]);
