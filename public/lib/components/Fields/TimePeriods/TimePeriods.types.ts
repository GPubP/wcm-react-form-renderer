export interface TimePeriodsValue {
	startDate: string;
	startTime: string;
	endTime?: string;
	[key: string]: string | undefined;
}

export enum TimePeriodsRepeatType {
	Daily = 'daily',
	Weekly = 'weekly',
	Monthly = 'monthly',
}

export enum Weekdays {
	Monday = 'monday',
	Tuesday = 'tuesday',
	Wednesday = 'wednesday',
	Thursday = 'thursday',
	Friday = 'friday',
	Saturday = 'saturday',
	Sunday = 'sunday',
}

export enum MonthlyFrequencies {
	First = 'first',
	Second = 'second',
	Third = 'third',
	Fourth = 'fourth',
	Last = 'last',
}
