import { FieldConfig } from '../../services/fieldRegistry';
import {
	DateTimeView,
	DateView,
	DefaultView,
	DynamicRepeaterView,
	EmailView,
	FieldGroupView,
	RepeaterView,
	TimeView,
} from '../Views';

import { CheckboxList } from './CheckBoxList';
import { InputCheckbox } from './Checkbox';
import { DateTimepicker } from './DateTime';
import { Datepicker } from './Datepicker';
import { DynamicRepeater } from './DynamicRepeater';
import { Fieldgroup } from './Fieldgroup';
import { FileUpload } from './FileUpload';
import { Hidden } from './Hidden';
import { InputNumber } from './InputNumber';
import { InputText } from './InputText';
import { InputRadio } from './Radio';
import { Repeater } from './Repeater';
import { InputSelect } from './Select';
import { InputTextarea } from './TextArea';
import { Time } from './Time';

const DefaultFields: FieldConfig[] = [
	{
		name: 'text',
		module: 'core',
		component: InputText,
		viewComponent: DefaultView,
	},
	{
		name: 'email',
		module: 'core',
		component: InputText,
		viewComponent: EmailView,
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
		viewComponent: DateView,
	},
	{
		name: 'time',
		module: 'core',
		component: Time,
		viewComponent: TimeView,
	},
	{
		name: 'dateTime',
		module: 'core',
		component: DateTimepicker,
		viewComponent: DateTimeView,
	},
	{
		name: 'textarea',
		module: 'core',
		component: InputTextarea,
		viewComponent: DefaultView,
	},
	{
		name: 'select',
		module: 'core',
		component: InputSelect,
		viewComponent: DefaultView,
	},
	{
		name: 'checkbox',
		module: 'core',
		component: InputCheckbox,
		viewComponent: DefaultView,
	},
	{
		name: 'checkboxList',
		module: 'core',
		component: CheckboxList,
		viewComponent: DefaultView,
	},
	{
		name: 'radio',
		module: 'core',
		component: InputRadio,
		viewComponent: DefaultView,
	},
	{
		name: 'fileUpload',
		module: 'core',
		component: FileUpload,
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
	{
		name: 'hidden',
		module: 'core',
		component: Hidden,
		viewComponent: () => null,
	},
];

export {
	DateTimepicker,
	Time,
	InputText,
	InputTextarea,
	InputSelect,
	InputRadio,
	InputCheckbox,
	CheckboxList,
	Fieldgroup,
	Repeater,
	DynamicRepeater,
	Hidden,
	DefaultFields,
};
