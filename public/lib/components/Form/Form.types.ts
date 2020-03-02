import { FormSchema, FormValues } from '../../core.types';

export interface FormProps {
	/**
	 * Form schema
	 */
	schema: FormSchema;
	/**
	 * Validation schema
	 * This is a JSON schema config object
	 * https://json-schema.org/
	 */
	validationSchema: any;
	/**
	 * Error messages
	 * example:
	 * {
	 * 	fieldName: {
	 * 		required: 'This field is required'
	 * 	},
	 * 	$required: 'This a default required validator message'
	 * }
	 */
	errorMessages: {
		[key: string]:
			| {
					[key: string]: string;
			  }
			| string;
	};
	/**
	 * onSubmit
	 * Use this function to get the form results
	 * // TODO: Let the user know that the form is valid or not
	 */
	onSubmit?: (values: FormValues) => void;
}
