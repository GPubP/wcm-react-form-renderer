import { FormSchema } from '../../core.types';

import createInitialValues from './getInitialValues';

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
				label : 'user',
				fields: [{
					name: 'firstname',
					module: 'core',
					dataType: 'string',
					type: 'text',
					label: 'firstname',
				}],
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

	it('Test', () => {
		expect(true).toBe(true);
	});
});


