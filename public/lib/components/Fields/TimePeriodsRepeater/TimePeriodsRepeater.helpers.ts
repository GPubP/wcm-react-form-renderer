import { FormikValues } from 'formik';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import { DATE_INPUT_FORMAT, TIME_INPUT_FORMAT } from '../../Views/TimePeriods/TimePeriods.const';

import {
	TimePeriodsRepeaterInitialValue,
	TimePeriodsRepeaterValue,
} from './TimePeriodsRepeater.types';

export const generateTimePeriodValues = (
	valueToRepeat: TimePeriodsRepeaterInitialValue,
	repeatAmount: number
): TimePeriodsRepeaterValue[] => {
	const values = [];

	for (let i = 0; i < repeatAmount; i++) {
		values.push({
			uuid: uuid(),
			...valueToRepeat,
		});
	}

	return values;
};

export const parseTimePeriodValues = (
	dateValues: Date[],
	initialValue: TimePeriodsRepeaterInitialValue,
	maxAmount: number
): TimePeriodsRepeaterValue[] => {
	// If there are no date values, no repeat was given so we can just return the initial form value
	if (!dateValues || dateValues.length === 0) {
		return [
			{
				uuid: uuid(),
				value: {
					...(initialValue?.value || {}),
					startDate: initialValue.value?.startDate
						? moment(initialValue.value?.startDate, DATE_INPUT_FORMAT)
								.utc()
								.format()
						: '',
				},
			} as TimePeriodsRepeaterValue,
		];
	}

	return dateValues.slice(0, maxAmount).map(date => {
		return {
			uuid: uuid(),
			value: {
				...initialValue.value,
				startDate: moment(date)
					.hours(0)
					.minutes(0)
					.seconds(0)
					.milliseconds(0)
					.utc()
					.format(),
			},
		} as TimePeriodsRepeaterValue;
	});
};

// Sort values on start date and time
export const sortRepeaterValues = (a: FormikValues, b: FormikValues): number => {
	const aValue = (a as TimePeriodsRepeaterValue).value;
	const bValue = (b as TimePeriodsRepeaterValue).value;

	if ((!aValue?.startDate && !aValue?.startTime) || (!bValue?.startDate && !bValue?.startTime)) {
		return 0;
	}

	const dateTimeFormat = `${DATE_INPUT_FORMAT} ${TIME_INPUT_FORMAT}`;
	const aDate = moment(aValue.startDate).format(DATE_INPUT_FORMAT);
	const bDate = moment(bValue.startDate).format(DATE_INPUT_FORMAT);
	const aMoment = moment(`${aDate} ${aValue.startTime}`, dateTimeFormat, true)
		.utc()
		.toISOString();
	const bMoment = moment(`${bDate} ${bValue.startTime}`, dateTimeFormat, true)
		.utc()
		.toISOString();

	return aMoment.localeCompare(bMoment);
};
