import { FormikValues } from 'formik';

export interface FormikOnChangeHandlerProps {
	onChange: (values: FormikValues) => void;
}
