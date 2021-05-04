import moment from 'moment';
import RRule, { Weekday } from 'rrule';

import {
	MonthlyFrequencies,
	TimePeriodsFormState,
	TimePeriodsRepeatType,
	Weekdays,
} from '../TimePeriods.types';

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

const canShowTimePeriods = (values: TimePeriodsFormState): boolean => {
	const hasFrequencyAndEndDate = !!values.repeatFrequency && !!values.endDate;

	switch (values.repeatType) {
		case TimePeriodsRepeatType.Daily:
			return hasFrequencyAndEndDate;
		case TimePeriodsRepeatType.Weekly:
			return hasFrequencyAndEndDate && (values.weeklyDays || []).length > 0;
		case TimePeriodsRepeatType.Monthly:
			return hasFrequencyAndEndDate && !!values.monthlyFrequency && !!values.monthlyWeekday;
		default:
			return false;
	}
};

const getByWeekday = (values: TimePeriodsFormState): { byweekday?: Weekday[] } => {
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

const parseUTCDate = (dateString: string, timeString?: string): Date => {
	const dateTimeString = timeString ? `${dateString} ${timeString}` : dateString;
	const dateTimeFormat = timeString ? 'DD/MM/YYYY H:m' : 'DD/MM/YYYY';
	const parsedUTCValue = moment.utc(dateTimeString, dateTimeFormat, true);

	return parsedUTCValue.isValid() ? parsedUTCValue.toDate() : new Date('');
};

export const getRecurringTimePeriods = (values: TimePeriodsFormState | null): string => {
	if (!values || !canShowTimePeriods(values)) {
		return '';
	}

	const dtstart = parseUTCDate(values.startDate, values.startHour);
	const until = parseUTCDate(values.endDate as string, values.startHour);
	const repeatType = values.repeatType as TimePeriodsRepeatType;
	const rule = new RRule({
		dtstart,
		until,
		freq: FREQ_MAP[repeatType],
		interval: parseInt(values.repeatFrequency as string, 10),
		...getByWeekday(values),
	});

	const amountOfDates = rule.all().length;
	const timePeriodsString = amountOfDates === 1 ? 'nieuw tijdstip' : 'nieuwe tijdstippen';

	return `${amountOfDates} ${timePeriodsString}`;
};
