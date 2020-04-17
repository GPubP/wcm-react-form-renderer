import { FormikValues } from 'formik';

export interface AutoSubmitProps {
	onChange: (values: FormikValues) => void;
	initialValues?: { [key: string]: any };
	values?: { [key: string]: any };
}
