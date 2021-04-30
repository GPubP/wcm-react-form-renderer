import { SelectOption } from '@redactie/utils';
import { array, boolean, date, number, object, ref, string } from 'yup';

import {
	isNilOrEmpty,
	isStartBeforeEndTime,
	parseDate,
	transformDate,
} from '../TimePeriods.helpers';
import { TimePeriodsRepeatType } from '../TimePeriods.types';

import { CreateTimePeriodsFormState } from './CreateTimePeriodsForm.types';

// 24 hour format, no leading zero for hours and minutes
const HOUR_MINUTE_REGEX = /^([0-9]|1[0-9]|2[0-3]):([0-9]|[1-5][0-9])$/;
const INVALID_DATE_MESSAGE = 'Datum is ongeldig of niet in het formaat DD/MM/YYYY';

export const CREATE_VALIDATION_SCHEMA = object()
	.shape({
		startDate: date()
			.transform(transformDate)
			.typeError(INVALID_DATE_MESSAGE)
			.required('Datum is een verplicht veld'),
		startHour: string()
			.matches(HOUR_MINUTE_REGEX, 'Startuur moet in het formaat H:m')
			.required('Startuur is een verplicht veld'),
		endHour: string()
			.matches(HOUR_MINUTE_REGEX, 'Einduur moet in het formaat H:m')
			.test('isStartBeforeEndTime', 'Einduur moet na startuur', function(
				value: string | undefined
			) {
				const startHourRef = this.resolve(ref('startHour'));
				return isStartBeforeEndTime(startHourRef as string | undefined, value);
			})
			.optional(),
		allDay: boolean(),
		repeatType: string().oneOf([
			'',
			TimePeriodsRepeatType.Daily,
			TimePeriodsRepeatType.Weekly,
			TimePeriodsRepeatType.Monthly,
		]),
		repeatFrequency: number().when('repeatType', {
			is: (value: string | undefined) => !isNilOrEmpty(value),
			then: number().required('Frequentie is een verplicht veld'),
		}),
		endDate: date().when('repeatType', {
			is: (value: string | undefined) => !isNilOrEmpty(value),
			then: date()
				.transform(transformDate)
				.typeError(INVALID_DATE_MESSAGE)
				.min(
					ref('startDate', { map: value => parseDate(value as string) }),
					'Einddatum moet na startdatum vallen'
				)
				.required('Einddatum is een verplicht veld'),
		}),
		// Weekly only
		weeklyDays: array()
			.of(string())
			.when('repeatType', {
				is: TimePeriodsRepeatType.Weekly,
				then: array()
					.of(string())
					.min(1, 'Selecteer minstens 1 weekdag')
					.required('Weekdag is een verplicht veld'),
			}),
		// Monthly only
		monthlyFrequency: string().when('repeatType', {
			is: TimePeriodsRepeatType.Monthly,
			then: string().required('Maandelijkse frequentie is een verplicht veld'),
		}),
		monthlyWeekday: string().when('repeatType', {
			is: TimePeriodsRepeatType.Monthly,
			then: string().required('Weekdag is een verplicht veld'),
		}),
	})
	.required();

export const INITIAL_CREATE_FORM_STATE: CreateTimePeriodsFormState = {
	startDate: '',
	startHour: '',
	endHour: '',
	allDay: false,
	repeatType: '',
	repeatFrequency: undefined,
	endDate: undefined,
	weeklyDays: undefined,
	monthlyFrequency: undefined,
	monthlyWeekday: undefined,
};

export const REPEAT_TYPE_OPTIONS: SelectOption[] = [
	{
		label: 'Geen',
		value: '',
	},
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

export const DAILY_FREQUENCY_OPTIONS = Array.from(Array(7)).map((val, index) => {
	const value = index + 1;
	return { label: `${value} dag${value > 1 ? 'en' : ''}`, value: value.toString() };
});

export const WEEKLY_FREQUENCY_OPTIONS = Array.from(Array(8)).map((val, index) => {
	const value = index + 1;
	return { label: `${value} ${value > 1 ? 'week' : 'weken'}`, value: value.toString() };
});

export const MONTHLY_FREQUENCY_OPTIONS = Array.from(Array(12)).map((val, index) => {
	const value = index + 1;
	return { label: `${value} maand${value > 1 ? 'en' : ''}`, value: value.toString() };
});

const WEEKDAYS = [
	{
		fulLabel: 'Maandag',
		shortLabel: 'Ma',
		value: 'monday',
	},
	{
		fulLabel: 'Dinsdag',
		shortLabel: 'Di',
		value: 'tuesday',
	},
	{
		fulLabel: 'Woensdag',
		shortLabel: 'Wo',
		value: 'wednesday',
	},
	{
		fulLabel: 'Donderdag',
		shortLabel: 'Do',
		value: 'thursday',
	},
	{
		fulLabel: 'Vrijdag',
		shortLabel: 'Vr',
		value: 'friday',
	},
	{
		fulLabel: 'Zaterdag',
		shortLabel: 'Za',
		value: 'saturday',
	},
	{
		fulLabel: 'Zondag',
		shortLabel: 'Zo',
		value: 'sunday',
	},
];

export const WEEK_DAY_OPTIONS = WEEKDAYS.map(({ shortLabel, value }) => ({
	label: shortLabel,
	value,
}));

export const MONTH_WEEK_FREQ_OPTIONS = [
	{
		label: 'Eerste',
		value: 'first',
	},
	{
		label: 'Tweede',
		value: 'second',
	},
	{
		label: 'Derde',
		value: 'third',
	},
	{
		label: 'Vierde',
		value: 'fourth',
	},
	{
		label: 'Laatste',
		value: 'last',
	},
];

export const MONTH_WEEKDAY_OPTIONS = WEEKDAYS.map(({ fulLabel, value }) => ({
	label: fulLabel,
	value,
}));
