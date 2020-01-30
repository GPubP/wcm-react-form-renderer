import { FormSchema } from '../../core.types';

import createInitialValues from './getInitialValues';

describe('createInitialValues', () => {

	const schema: FormSchema = {
		fields: [
			{
				name: 'name',
				type: 'text',
				dataType: 'string',
				label: 'name',
			},
			{
				name: 'lastname',
				type: 'text',
				dataType: 'string',
				label: 'name',
			},
			{
				name: 'user',
				dataType: 'object',
				type: 'fieldgroup',
				label : 'user',
				fields: [{
					name: 'firstname',
					dataType: 'string',
					type: 'text',
					label: 'firstname',
				}],
			},
		],
	}

	it('should create initial values from a form schema', () => {
		const result = createInitialValues(schema);

		expect(result).toEqual({
			name: undefined,
			lastname: undefined,
			user: {
				firstname: undefined,
			},
		})
	});

	it('Test', () => {
		expect(true).toBe(true);
	});
});


