module.exports = {
	extends: 'stylelint-config-standard',
	rules: {
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['global', 'local'],
			},
		],
		indentation: ['tab'],
	},
};
