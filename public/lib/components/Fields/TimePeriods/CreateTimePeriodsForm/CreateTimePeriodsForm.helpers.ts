import moment from 'moment';
import RRule, { Weekday } from 'rrule';

import { DATE_INPUT_FORMAT, TIME_INPUT_FORMAT } from '../../../Views/TimePeriods/TimePeriods.const';
import { MonthlyFrequencies, TimePeriodsRepeatType, Weekdays } from '../TimePeriods.types';

import { CreateTimePeriodsFormState } from './CreateTimePeriodsForm.types';

const FREQ_MAP = {
	[TimePeriodsRepeatType.Daily]: RRule.DAILY,
	[TimePeriodsRepeatType.Weekly]: RRule.WEEKLY,
	[TimePeriodsRepeatType.Monthly]: RRule.MONTHLY,
};

const WEEKDAYS_MAP = {
	[Weekdays.Monday]: RRule.MO,
	[Weekdays.Tuesday]: RRule.TU,
	[Weekdays.Wednesday]: RRule.WE,
	[Weekdays.Thursday]: RRule.TH,
	[Weekdays.Friday]: RRule.FR,
	[Weekdays.Saturday]: RRule.SA,
	[Weekdays.Sunday]: RRule.SU,
};

const MONTH_WEEK_FREQ_MAP = {
	[MonthlyFrequencies.First]: 1,
	[MonthlyFrequencies.Second]: 2,
	[MonthlyFrequencies.Third]: 3,
	[MonthlyFrequencies.Fourth]: 4,
	[MonthlyFrequencies.Last]: -1,
};

const canShowTimePeriods = (values: CreateTimePeriodsFormState): boolean => {
	const hasRequiredValues =
		!!values.startDate && !!values.startTime && !!values.repeatFrequency && !!values.endDate;

	switch (values.repeatType) {
		case TimePeriodsRepeatType.Daily:
			return hasRequiredValues;
		case TimePeriodsRepeatType.Weekly:
			return hasRequiredValues && (values.weeklyDays || []).length > 0;
		case TimePeriodsRepeatType.Monthly:
			return hasRequiredValues && !!values.monthlyFrequency && !!values.monthlyWeekday;
		default:
			return false;
	}
};

const getByWeekday = (values: CreateTimePeriodsFormState): { byweekday?: Weekday[] } => {
	const { repeatType, monthlyFrequency, monthlyWeekday, weeklyDays } = values;

	if (repeatType === TimePeriodsRepeatType.Weekly && weeklyDays) {
		return { byweekday: weeklyDays.map(day => WEEKDAYS_MAP[day]) };
	}
	if (repeatType === TimePeriodsRepeatType.Monthly && monthlyFrequency && monthlyWeekday) {
		return {
			byweekday: [WEEKDAYS_MAP[monthlyWeekday].nth(MONTH_WEEK_FREQ_MAP[monthlyFrequency])],
		};
	}
	return {};
};

const parseUTCDate = (dateString: string, timeString?: string): Date | null => {
	const dateTimeString = timeString ? `${dateString} ${timeString}` : dateString;
	const dateTimeFormat = timeString
		? `${DATE_INPUT_FORMAT} ${TIME_INPUT_FORMAT}`
		: DATE_INPUT_FORMAT;
	const parsedUTCValue = moment.utc(dateTimeString, dateTimeFormat, true);

	return parsedUTCValue.isValid() ? parsedUTCValue.toDate() : null;
};

export const getRecurringTimePeriods = (
	values: CreateTimePeriodsFormState | null
): Date[] | undefined => {
	if (!values || !canShowTimePeriods(values)) {
		return;
	}

	const dtstart = parseUTCDate(values.startDate, values.startTime);
	const until = parseUTCDate(values.endDate as string, values.startTime);
	const repeatType = values.repeatType as TimePeriodsRepeatType;

	if (!dtstart || !until) {
		return;
	}

	try {
		const rule = new RRule({
			dtstart,
			until,
			freq: FREQ_MAP[repeatType],
			interval: parseInt(values.repeatFrequency as string, 10),
			...getByWeekday(values),
		});

		return rule.all();
	} catch (error) {
		console.error(error);
		return;
	}
};
