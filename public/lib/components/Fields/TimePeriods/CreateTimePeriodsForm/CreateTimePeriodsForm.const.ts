import { SelectOption } from '@redactie/utils';
import { boolean, object, string } from 'yup';

import { TimePeriodsRepeatType } from '../TimePeriods.types';

// 24 hour format, no leading zero for hours and minutes
const HOUR_MINUTE_REGEX = /^([0-9]|1[0-9]|2[0-3]):([0-9]|[1-5][0-9])$/;

export const CREATE_VALIDATION_SCHEMA = object().shape({
	date: string().required('Datum is een verplicht veld'),
	startHour: string()
		.matches(HOUR_MINUTE_REGEX, 'Startuur moet in het formaat H:m')
		.required('Startuur is een verplicht veld'),
	endHour: string().matches(HOUR_MINUTE_REGEX, 'Einduur moet in het formaat H:m'),
	allDay: boolean(),
});

export const INITIAL_CREATE_FORM_STATE = {
	date: '',
	startHour: '',
	endHour: '',
	allDay: false,
};

export const REPEAT_TYPE_OPTIONS: SelectOption[] = [
	{
		label: 'Geen',
		value: '',
	},
	{
		label: 'Dagelijks',
		value: TimePeriodsRepeatType.Daily,
		disabled: true,
	},
	{
		label: 'Wekelijks',
		value: TimePeriodsRepeatType.Weekly,
		disabled: true,
	},
	{
		label: 'Maandelijks',
		value: TimePeriodsRepeatType.Monthly,
		disabled: true,
	},
];
