import { boolean, object, string } from 'yup';

import { TimePeriodsRepeatType } from '../TimePeriods.types';

export const CREATE_VALIDATION_SCHEMA = object().shape({
	date: string().required('Datum is een verplicht veld'),
	startHour: string().required('Startuur is een verplicht veld'),
	endHour: string(),
	allDay: boolean(),
	repeatType: string(),
});

export const INITIAL_CREATE_FORM_STATE = {
	date: '',
	startHour: '',
	endHour: '',
	allDay: false,
};

export const REPEAT_TYPE_OPTIONS = [
	{
		label: 'Dagelijks',
		value: TimePeriodsRepeatType.Daily,
	},
	{
		label: 'Wekelijks',
		value: TimePeriodsRepeatType.Weekly,
	},
	{
		label: 'Maandelijks',
		value: TimePeriodsRepeatType.Monthly,
	},
];
