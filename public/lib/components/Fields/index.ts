import { FieldConfig } from '../../services/fieldRegistry/fieldRegistry.types';
import { DefaultView, FieldGroupView, RepeaterView } from '../Views';

import Datepicker from './Datepicker/Datepicker';
import DynamicRepeater from './DynamicRepeater/DynamicRepeater';
import Fieldgroup from './Fieldgroup/Fieldgroup';
import InputNumber from './InputNumber/InputNumber';
import InputText from './InputText/InputText';
import Radio from './Radio/Radio';
import Repeater from './Repeater/Repeater';
import Select from './Select/Select';
import Textarea from './TextArea/TextArea';
import DynamicRepeaterView from '../Views/DynamicRepeater/DynamicRepeater';

const DefaultFields: FieldConfig[] = [
	{
		name: 'text',
		module: 'core',
		component: InputText,
		viewComponent: DefaultView,
	},
	{
		name: 'number',
		module: 'core',
		component: InputNumber,
		viewComponent: DefaultView,
	},
	{
		name: 'date',
		module: 'core',
		component: Datepicker,
		viewComponent: DefaultView,
	},
	{
		name: 'textarea',
		module: 'core',
		component: Textarea,
		viewComponent: DefaultView,
	},
	{
		name: 'select',
		module: 'core',
		component: Select,
		viewComponent: DefaultView,
	},
	{
		name: 'radio',
		module: 'core',
		component: Radio,
		viewComponent: DefaultView,
	},
	{
		name: 'fieldgroup',
		module: 'core',
		component: Fieldgroup,
		viewComponent: FieldGroupView,
	},
	{
		name: 'repeater',
		module: 'core',
		component: Repeater,
		viewComponent: RepeaterView,
	},
	{
		name: 'dynamicRepeater',
		module: 'core',
		component: DynamicRepeater,
		viewComponent: DynamicRepeaterView,
	},
];

export { InputText, Textarea, Select, Radio, Fieldgroup, Repeater, DynamicRepeater, DefaultFields };
