/* eslint-disable import/no-extraneous-dependencies */
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const ignores = ['.idea/**/*', '.next/**/*'];

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.mjs'],
    rules: {
      '@next/next/no-img-element': 'off'
    }
  },
  { ignores },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.mjs'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
        sourceType: 'module'
      }
    },
    plugins: {
      'react-hooks': reactHooksPlugin,
      '@typescript-eslint': tsPlugin,
      prettier,
      react,
      import: importPlugin,
      'unused-imports': unusedImportsPlugin
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        node: {
          extensions: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.mjs']
        }
      }
    },
    rules: {
      'react/no-unused-prop-types': 'error',
      'react/jsx-no-script-url': 'error',
      'react/no-children-prop': 'error',
      'react/no-danger-with-children': 'error',
      'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
      'react/jsx-fragments': 'error',
      'react/destructuring-assignment': [
        'warn',
        'always',
        {
          ignoreClassFields: true,
          destructureInSignature: 'ignore'
        }
      ],
      'react/jsx-max-depth': ['warn', { max: 8 }],
      'react/jsx-key': [
        'error',
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
          warnOnDuplicates: true
        }
      ],
      'react/jsx-curly-brace-presence': 'warn',
      'react/no-unescaped-entities': 'error',
      'react/jsx-pascal-case': 'error',
      'react/jsx-no-useless-fragment': 'warn',
      'react/display-name': 'warn',
      'react/self-closing-comp': 'warn',
      'react/jsx-sort-props': 'warn',
      'react/jsx-one-expression-per-line': ['off', { allow: 'literal' }],
      'react/jsx-no-bind': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: ['arrow-function', 'function-declaration'],
          unnamedComponents: 'arrow-function'
        }
      ],

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      indent: 'off',
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'lf',
          arrowParens: 'always',
          bracketSpacing: true,
          jsxBracketSameLine: false,
          printWidth: 120,
          proseWrap: 'preserve',
          requirePragma: false,
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'none',
          useTabs: false,
          singleAttributePerLine: true
        }
      ],
      quotes: [
        'warn',
        'single',
        {
          allowTemplateLiterals: true,
          avoidEscape: true
        }
      ],
      'padding-line-between-statements': [
        'warn',
        {
          blankLine: 'always',
          prev: 'function',
          next: '*'
        },
        { blankLine: 'always', prev: '*', next: 'if' }
      ],

      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports'
        }
      ],
      '@typescript-eslint/consistent-type-exports': 'warn',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used', argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
          classes: true,
          ignoreTypeReferences: true
        }
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['PascalCase', 'camelCase'],
          leadingUnderscore: 'allow'
        },
        {
          selector: 'variable',
          format: null,
          leadingUnderscore: 'allow'
        },
        {
          selector: 'parameter',
          format: ['camelCase', 'snake_case', 'PascalCase'],
          leadingUnderscore: 'allow'
        },
        {
          selector: 'property',
          format: null,
          leadingUnderscore: 'allow'
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
          leadingUnderscore: 'forbid'
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE']
        }
      ],

      'prefer-const': [
        'error',
        {
          destructuring: 'all',
          ignoreReadBeforeAssign: false
        }
      ],
      'prefer-template': 'warn',
      'operator-linebreak': 'off',
      'implicit-arrow-linebreak': 'off',
      'max-len': ['warn', { code: 120, ignoreStrings: true, ignoreTemplateLiterals: true }],
      'arrow-parens': 'off',
      'function-paren-newline': 'off',
      'no-confusing-arrow': 'off',
      'no-restricted-exports': ['off', { restrictedNamedExports: ['default'] }],
      'no-console': 'warn',
      'no-duplicate-imports': 'error',
      'no-shadow': 'error',

      'import/no-cycle': 'off',
      'import/prefer-default-export': 'off',
      'import/no-import-module-exports': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.test.{js,ts,jsx,tsx}',
            '**/*.spec.{js,ts,jsx,tsx}',
            '**/test/**',
            '**/__tests__/**',
            '**/__mocks__/**',
            '**/setupTests.{js,ts}',
            '**/*.config.{js,ts}',
            '**/*.config.{jsx,tsx}',
            '**/scripts/**',
            'next.config.js',
            'sentry.{js,ts}',
            '**/middleware.{js,ts}',
            'jest.setup.{js,ts}'
          ],

          optionalDependencies: false,
          peerDependencies: false
        }
      ],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          pathGroups: [
            {
              pattern: '@components/**',
              group: 'internal',
              position: 'after'
            }
          ],
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],
      'unused-imports/no-unused-imports': 'error'
    }
  },
  {
    files: ['app/interfaces.ts'],
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];

export default eslintConfig;
