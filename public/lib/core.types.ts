import { ErrorMessageProps } from 'formik';

import { FormProps } from './components/Form/Form.types';
import FieldRegistry from './services/fieldRegistry/fieldRegistry';

/**
 * A list of allowed field types
 */
export type FieldDataType = 'string' | 'number' | 'date' | 'array' | 'object';

export interface FormSchema {
	/**
	 * Form fields
	 * They describe how each field will look like
	 */
	fields: FieldSchema[];
}

export interface FormValues {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

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
		[key: string]: any;
	};
	/**
	 * nested form fields
	 */
	fields?: FieldSchema[];
}

export interface FormsAPI {
	Form: React.FC<FormProps>;
	ErrorMessage: React.FC<ErrorMessageProps>;
	fieldRegistry: FieldRegistry;
}
