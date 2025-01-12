import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import i18next from 'eslint-plugin-i18next';
import reactPlugin from 'eslint-plugin-react';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default tseslint.config(
  i18next.configs['flat/recommended'],
  reactPlugin.configs.flat.recommended,
  { ignores: ['dist', '**/*.test.{ts,tsx}'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // React 17 does not require importing React for JSX
      'react/react-in-jsx-scope': 'off',
      // Prefer importing specific items from React instead of the default import
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              importNames: ['default'],
              message: 'Import specific items from react instead of the default import',
            },
          ],
        },
      ],
      // Prefer using inline props instead of React.FC or React.FunctionComponent
      '@typescript-eslint/no-restricted-types': [
        'error',
        {
          types: {
            'React.FC': {
              message: 'Use inline props instead of React.FC',
            },
            'React.FunctionComponent': {
              message: 'Use inline props instead of React.FunctionComponent',
            },
          },
        },
      ],
      // Avoid using export { ... };
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportNamedDeclaration[specifiers.length > 0]',
          message: 'Use inline exports instead of `export { ... };`.',
        },
      ],
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    plugins: {
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      'unicorn/filename-case': [
        'warn',
        {
          case: 'kebabCase',
          ignore: [
            // match anything with a $ in it
            /.*\$.*/,
          ],
        },
      ],
    },
  },
);
