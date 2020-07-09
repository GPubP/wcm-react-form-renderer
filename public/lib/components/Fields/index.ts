import { FieldConfig } from '../../services/fieldRegistry/fieldRegistry.types';

import DynamicRepeater from './DynamicRepeater/DynamicRepeater';
import Fieldgroup from './Fieldgroup/Fieldgroup';
import InputText from './InputText/InputText';
import Radio from './Radio/Radio';
import Repeater from './Repeater/Repeater';
import Select from './Select/Select';
import Textarea from './TextArea/TextArea';

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
	{
		name: 'repeater',
		module: 'core',
		component: Repeater,
	},
	{
		name: 'dynamicRepeater',
		module: 'core',
		component: DynamicRepeater,
	},
];

export { InputText, Textarea, Select, Radio, Fieldgroup, Repeater, DynamicRepeater, DefaultFields };
