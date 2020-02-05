import { FormSchema, FormValues } from '../../core.types';

export interface FormProps {
	/**
	 * Form schema
	 */
	schema: FormSchema;
	/**
	 * onSubmit
	 * Use this function to get the form results
	 * // TODO: Let the user know that the form is valid or not
	 */
	onSubmit?: (values: FormValues) => void;
}
