module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended'
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'vue'],

	rules: {
		// Vue-specific rules
		'vue/no-unused-vars': 'warn', // Warns about declared variables that are not used in the component
		'vue/html-indent': ['warn', 2, { 'baseIndent': 1 }], // Enforces a consistent indentation in <template>
		'vue/html-self-closing': ['warn', { // Controls the style of self-closing tags in Vue
			'html': {
				'void': 'always',
				'normal': 'never',
				'component': 'always'
			},
			'svg': 'always',
			'math': 'always'
		}],
		'vue/max-attributes-per-line': ['warn', { // Limits the number of attributes per line to improve readability
			'singleline': { 'max': 1 },
			'multiline': { 'max': 1 }
		}],
		'vue/attributes-order': ['warn', { // Enforces a consistent ordering of attributes for readability and maintainability
			'order': [
				'DEFINITION', 'LIST_RENDERING', 'CONDITIONALS', 'RENDER_MODIFIERS',
				'GLOBAL', 'UNIQUE', 'TWO_WAY_BINDING', 'OTHER_DIRECTIVES',
				'OTHER_ATTR', 'CONTENT', 'EVENTS'
			],
			'alphabetical': false
		}],
		'vue/v-on-event-hyphenation': ['warn', 'always', { 'autofix': false }], // Enforces event naming conventions in a component
		'vue/no-lone-template': ['error', { 'ignoreAccessible': true }], // Disallows lone <template> in components for better readability
		'vue/require-v-for-key': 'warn', // Ensures v-for directives have corresponding keys for performance reasons
		'vue/valid-v-for': 'warn', // Validates the correctness of v-for usage
		'vue/no-v-html': 'warn', // Prevents the use of v-html to mitigate the risk of XSS attacks

		// JavaScript rules
		'quotes': ['warn', 'single'], // Enforce the consistent use of single quotes
		'semi': ['error', 'always'], // Require semicolons at the end of statements
		'eqeqeq': ['error', 'always'], // Require the use of === and !==
		'no-unused-vars': ['warn'], // Warn on variables that are declared but not used within the code
		'no-console': ['warn'], // Warning for console.log statements which should be removed before production
		'no-debugger': ['warn'], // Warning for debugger statements that should not appear in production code
		'curly': ['error', 'all'], // Require curly braces for all control statements
		'indent': ['warn', 'tab', { 'SwitchCase': 1 }], // Enforce consistent tab indentation
		'space-before-function-paren': ['warn', { // Enforce consistent spacing before function parenthesis
			'anonymous': 'always',
			'named': 'never',
			'asyncArrow': 'always'
		}],
		'object-curly-spacing': ['warn', 'always'], // Enforce consistent spacing inside braces of object literals
		'array-bracket-spacing': ['warn', 'never'], // Enforce consistent spacing inside array brackets
		'block-spacing': ['warn', 'always'], // Enforce consistent spacing inside single-line blocks
		'comma-spacing': ['warn', { 'before': false, 'after': true }], // Enforce consistent spacing before and after commas
		'computed-property-spacing': ['warn', 'never'], // Disallow or enforce spaces inside computed property brackets
		'func-call-spacing': ['warn', 'never'], // Require or disallow spacing between function identifiers and their invocations
		'key-spacing': ['warn', { 'beforeColon': false, 'afterColon': true }], // Enforce consistent spacing between keys and values in object literal properties
		'no-trailing-spaces': 'warn', // Disallow trailing whitespace at the end of lines
		'no-multi-spaces': ['warn', { 'ignoreEOLComments': true }], // Disallow multiple spaces except for indentation
		'no-extra-parens': ['warn', 'all', { 'ignoreJSX': 'all', 'nestedBinaryExpressions': false }], // Disallow unnecessary parentheses
		'no-multiple-empty-lines': ['warn', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }], // Limit multiple empty lines
		'space-before-blocks': ['warn', 'always'], // Require a space before blocks for readability
		'space-in-parens': ['warn', 'never'], // Disallow spaces inside parentheses
		'space-unary-ops': ['warn', { // Require spaces in unary operations for consistency
			'words': true,
			'nonwords': false
		}],
		'spaced-comment': ['warn', 'always', { // Enforce consistent spacing after comments
			'line': {
				'markers': ['/'],
				'exceptions': ['-', '+']
			},
			'block': {
				'markers': ['!'],
				'exceptions': ['*'],
				'balanced': true
			}
		}],
		'arrow-spacing': ['warn', { 'before': true, 'after': true }], // Enforce space before and after arrow function's arrow
		'keyword-spacing': ['warn', { 'before': true, 'after': true }], // Require a space before and after keywords
		'semi-spacing': ['warn', { 'before': false, 'after': true }], // Enforce spacing before and after semicolons
		'space-infix-ops': ['warn', { 'int32Hint': false }] // Require spacing around infix operators
	}

};