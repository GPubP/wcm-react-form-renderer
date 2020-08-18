import { FormikValues } from 'formik';

import { FormSchema } from '../../core.types';

export interface ViewProps {
	/**
	 * Form schema
	 */
	schema: FormSchema;
	/**
	 * Initialvalues
	 */
	values: FormikValues;
}
