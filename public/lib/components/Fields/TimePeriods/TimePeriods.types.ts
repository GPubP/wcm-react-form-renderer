export interface TimePeriodsValue {
	startDate: string;
	startHour: string;
	endHour?: string;
	allDay: boolean;
	repeatType: TimePeriodsRepeatType | '';
	repeatFrequency?: number;
	endDate?: string;
	// Weekly only
	weeklyDays?: string[];
	// Monthly only
	monthlyFrequency?: string;
	monthlyWeekday?: string;
}

export enum TimePeriodsRepeatType {
	Daily = 'daily',
	Weekly = 'weekly',
	Monthly = 'monthly',
}

export type TimePeriodsFormState = TimePeriodsValue;
