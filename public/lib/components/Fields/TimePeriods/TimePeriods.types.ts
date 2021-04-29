export interface TimePeriodsValue {
	date: string;
	startHour: string;
	endHour?: string;
	allDay: boolean;
	repeatType: TimePeriodsRepeatType;
	repeatValue: number;
	repeatEndDate: string;
	// Weekly only
	repeatWeekDays: string[];
	// Monthly only
	repeatEvery: string;
	repeatDay: string;
}

export enum TimePeriodsRepeatType {
	Daily = 'daily',
	Weekly = 'weekly',
	Monthly = 'monthly',
}

export interface TimePeriodsFormState {
	date: string;
	startHour: string;
	endHour: string;
	allDay: boolean;
}
