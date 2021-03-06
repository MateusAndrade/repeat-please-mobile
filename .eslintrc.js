module.exports = {
	root: true,
	extends: ['@react-native-community', 'prettier'],
	rules: {
		'react-native/no-inline-styles': 0,
		complexity: ['error', { max: 10 }],
		'max-lines': [
			'error',
			{ max: 100, skipBlankLines: true, skipComments: true },
		],
		'max-lines-per-function': [
			'error',
			{ max: 65, skipBlankLines: true, skipComments: true },
		],
		'max-params': ['error', { max: 3 }],
		'max-depth': ['error', { max: 2 }],
		'max-statements': ['error', 10, { ignoreTopLevelFunctions: true }],
		semi: 'error',
		'semi-spacing': 'error',
		'no-console': ['error', { allow: ['warn', 'error'] }],
	},
};
