import { FormSchema } from './core.types';
import { addNameSpace, createInitialValues } from './utils';

describe('utils', () => {
	describe('addNamespace', () => {
		it('should prefix a fieldName with a given namespace', () => {
			const namespace = 'user';
			const firstname = 'firstname';
			const withNamespace = addNameSpace(namespace);
			const path = withNamespace(firstname);

			expect(path).toBe(`${namespace}.${firstname}`);
		});
	});

	describe('createInitialValues', () => {
		const schema: FormSchema = {
			fields: [
				{
					name: 'name',
					module: 'core',
					type: 'text',
					dataType: 'string',
					label: 'name',
				},
				{
					name: 'lastname',
					module: 'core',
					type: 'text',
					dataType: 'string',
					label: 'name',
				},
				{
					name: 'user',
					dataType: 'object',
					module: 'core',
					type: 'fieldgroup',
					label: 'user',
					fields: [
						{
							name: 'firstname',
							module: 'core',
							dataType: 'string',
							type: 'text',
							label: 'firstname',
						},
					],
				},
			],
		};

		it('should create initial values from a form schema', () => {
			const result = createInitialValues(schema);
			expect(result).toEqual({
				name: '',
				lastname: '',
				user: {
					firstname: '',
				},
			});
		});
	});
});
