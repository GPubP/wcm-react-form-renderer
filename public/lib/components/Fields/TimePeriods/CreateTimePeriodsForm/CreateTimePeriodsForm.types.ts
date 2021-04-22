import { FormikProps } from 'formik';

import { TimePeriodsFormState } from '../TimePeriods.types';

export interface CreateTimePeriodsFormProps {
	className?: string;
	initialState?: CreateTimePeriodsFormState;
	children?: (props: FormikProps<any>) => React.ReactNode;
	onSubmit: (values: any) => void;
}

export type CreateTimePeriodsFormState = TimePeriodsFormState;
