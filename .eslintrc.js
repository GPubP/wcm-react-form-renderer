module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
		'react',
		'import',
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		"plugin:react/recommended",
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
	],
	env: {
		"browser": true,
		"amd": true,
		"node": true
	},
	rules: {
		'@typescript-eslint/no-var-requires': 0,
		'import/order': 2,
		'import/first': 2,
		'import/exports-last': 2,
		'import/no-duplicates': 2,
		'quotes': [2, 'single'],
		'indent': [2, 'tab'],
		"comma-dangle": ["error", {
			"arrays": "always-multiline",
			"objects": "always-multiline",
			"imports": "always-multiline",
			"exports": "always-multiline",
			"functions": "never"
		}]
	}
};
