import { FormikProps } from 'formik';

import { TimePeriodsFormState } from '../TimePeriods.types';

export interface CreateTimePeriodsFormProps {
	className?: string;
	initialState?: CreateTimePeriodsFormState;
	children?: (props: FormikProps<CreateTimePeriodsFormState>) => React.ReactNode;
	onSubmit: (values: CreateTimePeriodsFormState, recurringPeriods: number) => void;
}

export type CreateTimePeriodsFormState = TimePeriodsFormState;
