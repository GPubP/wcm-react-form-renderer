import { FieldConfig } from '../../services/fieldRegistry';
import {
	AudioEmbedView,
	DateTimeView,
	DateView,
	DynamicRepeaterView,
	EmailView,
	FieldGroupView,
	RepeaterView,
	TelephoneNumberView,
	TimePeriodsView,
	TimeView,
	VideoEmbedView,
} from '../Views';

import { AudioEmbed } from './AudioEmbed';
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
import { TelephoneNumber } from './TelephoneNumber';
import { InputTextarea } from './TextArea';
import { Time } from './Time';
import { TimePeriods } from './TimePeriods';
import { TimePeriodsRepeater } from './TimePeriodsRepeater';
import { VideoEmbed } from './VideoEmbed';

const DefaultFields: FieldConfig[] = [
	{
		name: 'text',
		module: 'core',
		component: InputText,
		// Remove comment for dev testing
		// viewComponent: DefaultView,
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
		// Remove comment for dev testing
		// viewComponent: DefaultView,
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
		// Remove comment for dev testing
		// viewComponent: DefaultView,
	},
	{
		name: 'select',
		module: 'core',
		component: InputSelect,
		// Remove comment for dev testing
		// viewComponent: DefaultView,
	},
	{
		name: 'checkbox',
		module: 'core',
		component: InputCheckbox,
		// Remove comment for dev testing
		// viewComponent: DefaultView,
	},
	{
		name: 'checkboxList',
		module: 'core',
		component: CheckboxList,
		// Remove comment for dev testing
		// viewComponent: DefaultView,
	},
	{
		name: 'radio',
		module: 'core',
		component: InputRadio,
		// Remove comment for dev testing
		// viewComponent: DefaultView,
	},
	{
		name: 'fileUpload',
		module: 'core',
		component: FileUpload,
		// Remove comment for dev testing
		// viewComponent: DefaultView,
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
	{
		name: 'telephoneNumber',
		module: 'core',
		component: TelephoneNumber,
		viewComponent: TelephoneNumberView,
	},
	{
		name: 'videoEmbed',
		module: 'core',
		component: VideoEmbed,
		viewComponent: VideoEmbedView,
	},
	{
		name: 'timePeriods',
		module: 'core',
		component: TimePeriods,
		viewComponent: TimePeriodsView,
		repeaterComponent: TimePeriodsRepeater,
	},
	{
		name: 'audioEmbed',
		module: 'core',
		component: AudioEmbed,
		viewComponent: AudioEmbedView,
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
