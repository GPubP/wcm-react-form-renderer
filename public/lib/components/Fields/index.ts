import { FieldConfig } from '../../services/fieldRegistry/fieldRegistry.types';

import Fieldgroup from './Fieldgroup/Fieldgroup';
import InputText from './InputText/InputText';
import Radio from './Radio/Radio';
import Select from './Select/Select';
import Textarea from './TextArea/TextArea';
import Time from './Time/Time';

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
		name: 'time',
		module: 'core',
		component: Time,
	},
];

export { InputText, Textarea, Select, Radio, Fieldgroup, Time, DefaultFields };
