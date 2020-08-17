import { ErrorMessageProps, FormikValues } from 'formik';

import { FormProps } from './components/Form/Form.types';
import { ViewProps } from './components/View/View.types';
import FieldRegistry from './services/fieldRegistry/fieldRegistry';
import ViewRegistry from './services/viewRegistry/viewRegistry';

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
	 * Field view
	 * This field will be uses by the viewer component
	 */
	view?: string;
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
		id?: string;
		preset?: Preset;
		[key: string]: any;
	};
	/**
	 * nested form fields
	 */
	fields?: FieldSchema[];
	/**
	 * Default value
	 */
	defaultValue?: any;
}

export interface ValidationSchema {
	type: string;
	name?: string;
	properties?: Record<string, ValidationSchema>;
	items?: ValidationSchema;
}

export interface FormsAPI {
	Form: React.FC<FormProps<FormValues>>;
	View: React.FC<ViewProps>;
	ErrorMessage: React.FC<ErrorMessageProps>;
	fieldRegistry: FieldRegistry;
	viewRegistry: ViewRegistry;
}

export interface Validator {
	uuid: string;
	data: {
		name: string;
		label: string;
		description: string;
		dataTypes: string[];
		defaultValue: Record<string, any>;
		formSchema: {
			fields: FieldSchema[];
		};
	};
	meta: {
		created: string;
		lastModified: string;
		lastEditor: string;
		deleted: string;
	};
}

export interface BasePreset<T, F> {
	_id: string;
	uuid: string;
	data: {
		name: string;
		label: string;
		defaultConfig: Record<string, any>;
		fieldType: F;
		generalConfig: {
			isQueryable: boolean;
			isTranslate: boolean;
			isMultiple: boolean;
		};
		fields: {
			field: any;
			formSchema: {
				fields: FieldSchema[];
			};
			validators: T[];
		}[];
		validators: T[];
		meta: {
			created: string;
			lastModified: string;
			deleted: boolean;
		};
	};
}

export type Preset = BasePreset<string, string>;
