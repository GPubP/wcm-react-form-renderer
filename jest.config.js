module.exports = {
	// when using React Testing Library and adds special
	// extended assertions to Jest
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

	// Module file extensions for importing
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

	moduleNameMapper: {
		// This is needed to mock css Modules
		// For more information. You can refer to the Jest docs
		// https://jestjs.io/docs/en/webpack.html
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
	},
};
