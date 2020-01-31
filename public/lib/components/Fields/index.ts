import { FieldConfig } from '../../services/fieldrregistry/fieldRegistry.types';

import InputText from './InputText/InputText';
import Textarea from './TextArea/TextArea';
import Select from './Select/Select';
import Radio from './Radio/Radio';

const DefaultFields: FieldConfig[] = [
	{
		name: 'text',
		module: 'core',
		component: InputText,
	},
	{
		name: 'textarea',
		module: 'core',
		component: Textarea,
	},
	{
		name: 'select',
		module: 'core',
		component: Select,
	},
	{
		name: 'radio',
		module: 'core',
		component: Radio,
	},
];

export {
	InputText,
	DefaultFields,
}
