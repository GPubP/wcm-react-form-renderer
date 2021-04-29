import moment from 'moment';
import { isEmpty, isNil } from 'ramda';
import { DateSchema } from 'yup';

export const isNilOrEmpty = (value: string | undefined): boolean => isNil(value) || isEmpty(value);

export const parseDate = (value: string): Date => {
	// Check strict on date format
	const parsedValue = moment(value, 'DD/MM/YYYY', true);
	// Return date object when it's valid, otherwise 'Invalid Date'
	return parsedValue.isValid() ? parsedValue.toDate() : new Date('');
};

/**
 * Yup helpers
 */

const getMinutesOfDay = (time: moment.Moment): number => {
	return time.minutes() + time.hours() * 60;
};

export const isStartBeforeEndTime = (
	startTime: string | undefined,
	endTime: string | undefined
): boolean => {
	if (!startTime || !endTime) {
		return true;
	}

	const startMoment = moment(startTime, 'H:m', true);
	const endMoment = moment(endTime, 'H:m', true);
	const startMinutes = getMinutesOfDay(startMoment);
	const endMinutes = getMinutesOfDay(endMoment);

	return startMinutes < endMinutes;
};

export function transformDate(this: DateSchema, value: Date | string, originalValue: string): Date {
	if (this.isType(value)) {
		return value as Date;
	}

	return parseDate(originalValue);
}
