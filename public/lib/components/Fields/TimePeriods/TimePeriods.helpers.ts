import moment from 'moment';
import { isEmpty, isNil } from 'ramda';

import { DATE_INPUT_FORMAT, TIME_INPUT_FORMAT } from '../../Views/TimePeriods/TimePeriods.const';

export const isNilOrEmpty = (value: string | undefined): boolean => isNil(value) || isEmpty(value);

export const parseStringToMoment = (
	value: string,
	options: { format?: string; strict?: boolean } = {}
): moment.Moment => {
	const { format = DATE_INPUT_FORMAT, strict = true } = options;

	return moment(value, format, strict);
};

/**
 * Yup helpers
 */

export const isValidDate = (value = ''): boolean => {
	const date = parseStringToMoment(value);
	return date.isValid();
};

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

	const startMoment = moment(startTime, TIME_INPUT_FORMAT, true);
	const endMoment = moment(endTime, TIME_INPUT_FORMAT, true);
	const startMinutes = getMinutesOfDay(startMoment);
	const endMinutes = getMinutesOfDay(endMoment);

	return startMinutes < endMinutes;
};
