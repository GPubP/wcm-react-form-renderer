import { FieldConfig } from '../../services/fieldregistry/fieldRegistry.types';

import InputText from './InputText/InputText';

const DefaultFields: FieldConfig[] = [
	{
		name: 'text',
		module: 'core',
		component: InputText,
	},
];

export {
	InputText,
	DefaultFields,
}
