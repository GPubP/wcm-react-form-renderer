import { FormikHelpers, FormikProps } from 'formik';

import { FormSchema, FormValues } from '../../core.types';

export interface FormProps<Values> {
	/**
	 * Form schema
	 */
	schema: FormSchema;
	/**
	 * Initialvalues
	 */
	initialValues?: {
		[key: string]: any;
	};
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
	 * Use this function to get the form results on submit
	 *
	 */
	// TODO: Let the user know that the form is valid or not
	onSubmit?: (values: FormValues, actions: FormikHelpers<FormValues>) => void;
	/**
	 * onChange
	 * Use this function to get the form results on change
	 */
	onChange?: (values: FormValues) => void;
	/**
	 * delay
	 * Debounce time for onChange
	 */
	delay?: number;
	/**
	 * React children or child render callback
	 */
	children?: ((props: FormikProps<Values>) => React.ReactNode) | React.ReactNode;
}
