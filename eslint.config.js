import vuePlugin from 'eslint-plugin-vue';
import vueEslintParser from 'vue-eslint-parser'; // Parser for .vue files
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', '**/*.d.ts', '**/*.svg'], // Folders to ignore
  },
  {
    files: ['**/*.vue', '**/*.ts', '**/*.tsx', 'src/**/*.json'], // Files for ESLint to lint
    languageOptions: {
      ecmaVersion: 'latest', // Use the latest ECMAScript version
      sourceType: 'module',
      parser: vueEslintParser, // Parser for .vue files
      parserOptions: {
        parser: '@typescript-eslint/parser', // TypeScript parser for scripts within .vue files
        project: './tsconfig.eslint.json', // Provides access to type information
        extraFileExtensions: ['.vue'], // Support for .vue files
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // Vue rules
      'vue/no-multiple-template-root': 'off',
      'vue/no-v-html': 'warn',
      'vue/require-prop-types': 'error',
      'vue/require-default-prop': 'error',
      'vue/attribute-hyphenation': ['error', 'always'],
      'vue/html-self-closing': ['error', {
        html: { normal: 'never', void: 'always' },
        svg: 'always',
        math: 'always',
      }],
      'vue/multi-word-component-names': 'off',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/no-unused-components': 'warn',
      'vue/no-template-shadow': 'error',
      'vue/no-mutating-props': 'error',
      'vue/prop-name-casing': ['error', 'camelCase'],
      'vue/no-v-text-v-html-on-component': 'error',
      'vue/attributes-order': ['warn', {
        order: [
          'DEFINITION', 'LIST_RENDERING', 'CONDITIONALS', 'RENDER_MODIFIERS',
          'GLOBAL', 'UNIQUE', 'TWO_WAY_BINDING', 'OTHER_DIRECTIVES',
          'OTHER_ATTR', 'CONTENT', 'EVENTS'
        ],
        alphabetical: false,
      }],

      // General ESLint rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': ['warn', {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      }],
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      'no-shadow': 'warn',
      'consistent-return': 'error',
      'eqeqeq': ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Prettier rule
      'prettier/prettier': ['error'],
    },
  },
];
