import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  globalIgnores(['dist', 'build', 'node_modules']),

  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  prettierConfig,

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      'react-refresh/only-export-components': 'off',
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
];
