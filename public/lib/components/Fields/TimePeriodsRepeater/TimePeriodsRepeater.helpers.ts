import { FormikValues } from 'formik';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import { DATE_INPUT_FORMAT, TIME_INPUT_FORMAT } from '../../Views/TimePeriods/TimePeriods.const';
import { TimePeriodsValue } from '../TimePeriods/TimePeriods.types';

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
	return dateValues.slice(0, maxAmount).map(date => {
		return {
			uuid: uuid(),
			value: {
				...initialValue.value,
				startDate: moment(date)
					.utc()
					.format(DATE_INPUT_FORMAT),
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
	const aMoment = moment(`${aValue.startDate} ${aValue.startTime}`, dateTimeFormat, true);
	const bMoment = moment(`${bValue.startDate} ${bValue.startTime}`, dateTimeFormat, true);

	return aMoment.diff(bMoment);
};
