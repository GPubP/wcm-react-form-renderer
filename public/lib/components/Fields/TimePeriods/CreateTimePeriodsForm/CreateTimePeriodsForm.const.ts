import { SelectOption } from '@redactie/utils';
import { array, boolean, number, object, ref, string } from 'yup';

import {
	isNilOrEmpty,
	isStartBeforeEndTime,
	isValidDate,
	parseStringToMoment,
} from '../TimePeriods.helpers';
import { MonthlyFrequencies, TimePeriodsRepeatType, Weekdays } from '../TimePeriods.types';

import { CreateTimePeriodsFormState } from './CreateTimePeriodsForm.types';

// 24 hour format, with leading zero for hours and minutes
const HOUR_MINUTE_REGEX = /^(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9])$/;
const INVALID_DATE_MESSAGE = 'Datum is ongeldig of niet in het formaat DD/MM/YYYY';

export const CREATE_VALIDATION_SCHEMA = object()
	.shape({
		/**
		 * We can't use yup's date() schema because when we try to reference other values via ref()
		 * it will not take into account any transforms we provided.
		 * This brings the issue where our date value gets immediately passed to a Date constructor
		 * when using date() values which doesn't check our date format
		 */
		startDate: string()
			.required('Datum is een verplicht veld')
			.test('isValidStartDate', INVALID_DATE_MESSAGE, isValidDate),
		startTime: string()
			.matches(HOUR_MINUTE_REGEX, 'Startuur moet in het formaat HH:mm')
			.required('Startuur is een verplicht veld'),
		endTime: string()
			.matches(HOUR_MINUTE_REGEX, 'Einduur moet in het formaat HH:mm')
			.test('isStartBeforeEndTime', 'Einduur moet na startuur', function(
				value: string | undefined
			) {
				const startTimeRef = this.resolve(ref('startTime'));
				return isStartBeforeEndTime(startTimeRef as string | undefined, value);
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
		endDate: string().when('repeatType', {
			is: (repeatType: string | undefined) => !isNilOrEmpty(repeatType),
			then: string()
				.required('Einddatum is een verplicht veld')
				.test('isValidEndDate', INVALID_DATE_MESSAGE, isValidDate)
				.test('isEndAfterStartDate', 'Einddatum moet na startdatum vallen', function(
					value = ''
				) {
					const startDate = parseStringToMoment(this.resolve(ref('startDate')));
					const endDate = parseStringToMoment(value);
					const areDatesValid = startDate.isValid() && endDate.isValid();

					return areDatesValid && endDate.isAfter(startDate);
				}),
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
	startTime: '',
	endTime: '',
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
	return { label: `${value} ${value > 1 ? 'weken' : 'week'}`, value: value.toString() };
});

export const MONTHLY_FREQUENCY_OPTIONS = Array.from(Array(12)).map((val, index) => {
	const value = index + 1;
	return { label: `${value} maand${value > 1 ? 'en' : ''}`, value: value.toString() };
});

const WEEKDAYS = [
	{
		fulLabel: 'Maandag',
		shortLabel: 'Ma',
		value: Weekdays.Monday,
	},
	{
		fulLabel: 'Dinsdag',
		shortLabel: 'Di',
		value: Weekdays.Tuesday,
	},
	{
		fulLabel: 'Woensdag',
		shortLabel: 'Wo',
		value: Weekdays.Wednesday,
	},
	{
		fulLabel: 'Donderdag',
		shortLabel: 'Do',
		value: Weekdays.Thursday,
	},
	{
		fulLabel: 'Vrijdag',
		shortLabel: 'Vr',
		value: Weekdays.Friday,
	},
	{
		fulLabel: 'Zaterdag',
		shortLabel: 'Za',
		value: Weekdays.Saturday,
	},
	{
		fulLabel: 'Zondag',
		shortLabel: 'Zo',
		value: Weekdays.Sunday,
	},
];

export const WEEK_DAY_OPTIONS = WEEKDAYS.map(({ shortLabel, value }) => ({
	label: shortLabel,
	value,
}));

export const MONTH_WEEK_FREQ_OPTIONS = [
	{
		label: 'Eerste',
		value: MonthlyFrequencies.First,
	},
	{
		label: 'Tweede',
		value: MonthlyFrequencies.Second,
	},
	{
		label: 'Derde',
		value: MonthlyFrequencies.Third,
	},
	{
		label: 'Vierde',
		value: MonthlyFrequencies.Fourth,
	},
	{
		label: 'Laatste',
		value: MonthlyFrequencies.Last,
	},
];

export const MONTH_WEEKDAY_OPTIONS = WEEKDAYS.map(({ fulLabel, value }) => ({
	label: fulLabel,
	value,
}));
