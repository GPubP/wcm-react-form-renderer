import { FormikProps } from 'formik';

import { CreateTimePeriodsFormState } from '../CreateTimePeriodsForm';

export interface CreateTimePeriodsModalProps {
	show: boolean;
	onCancel: (resetForm: FormikProps<CreateTimePeriodsFormState>['resetForm']) => void;
	onSubmit: (values: CreateTimePeriodsFormState) => void;
}
