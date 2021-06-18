import { FormikHelpers, FormikProps } from 'formik';

import { MonthlyFrequencies, TimePeriodsRepeatType, Weekdays } from '../TimePeriods.types';

export interface CreateTimePeriodsFormProps {
	className?: string;
	initialState?: CreateTimePeriodsFormState;
	children?: (props: FormikProps<CreateTimePeriodsFormState>) => React.ReactNode;
	onSubmit: (
		values: CreateTimePeriodsFormState,
		recurringPeriods: Date[],
		formikHelpers: FormikHelpers<CreateTimePeriodsFormState>
	) => void;
}

export interface CreateTimePeriodsFormState {
	startDate: string;
	startTime: string;
	endTime?: string;
	allDay: boolean;
	repeatType: TimePeriodsRepeatType | '';
	repeatFrequency?: string;
	endDate?: string;
	// Weekly only
	weeklyDays?: Weekdays[];
	// Monthly only
	monthlyFrequency?: MonthlyFrequencies;
	monthlyWeekday?: Weekdays;
}
