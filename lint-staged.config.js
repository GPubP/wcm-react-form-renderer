module.exports = {
	'public/**/*.{ts}': ['eslint . --fix', 'git add'],
	'public/**/*.{scss}': ['styelint . --fix', 'git add'],
};
