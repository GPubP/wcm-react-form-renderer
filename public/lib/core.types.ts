import { ErrorMessageProps, FormikValues } from 'formik';

import { FormProps } from './components/Form/Form.types';
import FieldRegistry from './services/fieldRegistry/fieldRegistry';

/**
 * A list of allowed field types
 */
const ALL_FIELD_DATA_TYPES = ['string', 'number', 'date', 'array', 'object'];
type FieldDataTypeTuple = typeof ALL_FIELD_DATA_TYPES;
export type FieldDataType = FieldDataTypeTuple[number];

export interface FormSchema {
	/**
	 * Form fields
	 * They describe how each field will look like
	 */
	fields: FieldSchema[];
}

export type FormValues = FormikValues;

export interface FieldOption {
	key: string;
	value: string;
	label?: string;
}

export interface FieldSchema {
	/**
	 * Field name
	 */
	name: string;
	/**
	 * Module name
	 */
	module: string;
	/**
	 * Field type
	 */
	type: string;
	/**
	 * Field Data type
	 */
	dataType: FieldDataType;
	/**
	 * Field label
	 */
	label: string;
	/**
	 * Field options
	 * You can give any config you want
	 */
	config?: {
		options?: FieldOption[];
		required?: boolean;
		wrapperClassName?: string;
		[key: string]: any;
	};
	/**
	 * nested form fields
	 */
	fields?: FieldSchema[];
}

export interface ValidationSchema {
	type: string;
	name?: string;
	properties?: Record<string, ValidationSchema>;
	items?: ValidationSchema;
}

export interface FormsAPI {
	Form: React.FC<FormProps<FormValues>>;
	ErrorMessage: React.FC<ErrorMessageProps>;
	fieldRegistry: FieldRegistry;
}
