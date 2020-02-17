import { FieldConfig } from '../../services/fieldRegistry/fieldRegistry.types';

import InputText from './InputText/InputText';
import Textarea from './TextArea/TextArea';
import Select from './Select/Select';
import Radio from './Radio/Radio';
import Fieldgroup from './Fieldgroup/Fieldgroup';

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
	{
		name: 'fieldgroup',
		module: 'core',
		component: Fieldgroup,
	},
];

export {
	InputText,
	Textarea,
	Select,
	Radio,
	Fieldgroup,
	DefaultFields,
};
