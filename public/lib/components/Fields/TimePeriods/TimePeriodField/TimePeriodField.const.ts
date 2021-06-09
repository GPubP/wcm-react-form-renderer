import { TimePeriodsValue } from '../TimePeriods.types';

export const INITIAL_TIME_PERIOD_VALUE: TimePeriodsValue = {
	startDate: '',
	startTime: '',
	endTime: '',
};

export const TIME_PERIOD_VALUE_KEYS: (keyof TimePeriodsValue)[] = [
	'startDate',
	'startTime',
	'endTime',
];
