import addNameSpace from './addNamespace';

describe('addNamespace', () => {
	it('should prefix a fieldName with a given namespace', () => {
		const namespace = 'user';
		const firstname = 'firstname';
		const withNamespace = addNameSpace(namespace);
		const path = withNamespace(firstname);

		expect(path).toBe(`${namespace}.${firstname}`);
	});
});
