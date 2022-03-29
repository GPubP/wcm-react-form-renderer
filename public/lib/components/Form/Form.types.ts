import { FormikHelpers, FormikProps, FormikValues } from 'formik';

import { FormSchema, FormValues } from '../../core.types';

export interface AllowedHeader {
	element: string;
	class: string;
}
export interface FormProps<Values> {
	/**
	 * Form schema
	 */
	schema: FormSchema;
	/**
	 * Initialvalues
	 */
	initialValues?: Record<string, any>;
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
	 * delay
	 * Debounce time for onChange
	 */
	delay?: number;
	/**
	 * React children or child render callback
	 */
	children?: ((props: FormikProps<Values>) => React.ReactNode) | React.ReactNode;
	/**
	 * Run form validation in a web worker
	 */
	validateWorker?: boolean;
	/**
	 * Specify if dev logs (eg validator results) should be shown
	 */
	log?: boolean;
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
	 * A reference to the formik instance
	 */
	formikRef?: (formikRef: FormikProps<FormikValues>) => void;
	/**
	 * Specify if the form should use dividers between fields
	 */
	useDividers?: boolean;
	allowedHeaders?: readonly AllowedHeader[] | AllowedHeader[];
	activeLanguage?: string;
}
