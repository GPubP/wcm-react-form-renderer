import { FieldSchema } from '../../../core.types';

/**
 * available field types for the dynamic repeater
 */
export const availableFields: FieldSchema[] = [
	{
		name: 'textfield',
		module: 'core',
		type: 'text',
		dataType: 'string',
		label: 'Textfield',
		config: {
			placeholder: 'placeholder',
		},
	},
	{
		name: 'textarea',
		module: 'core',
		type: 'textarea',
		dataType: 'string',
		label: 'Textarea',
		config: {
			placeholder: 'placeholder',
		},
	},
];
