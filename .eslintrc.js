module.exports = {
	'env': {
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:vue/vue3-essential',
		'plugin:vue/vue3-recommended',
		'plugin:vue/base',
		'plugin:@typescript-eslint/recommended'
	],
	'overrides': [
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module',
		'project': true,
		'tsconfigRootDir': __dirname,
	},
	'plugins': [
		'vue',
		'@typescript-eslint'
	],
	'rules': {
		'indent': 'off',
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'@typescript-eslint/no-floating-promises': 'warn',
	},
}
