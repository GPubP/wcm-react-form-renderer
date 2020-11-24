import { ErrorMessageProps, FormikValues } from 'formik';

import { CustomValidator } from './classes/CustomValidator';
import { FormProps } from './components/Form';
import { ViewProps } from './components/View';
import { parseFields } from './helpers/parseFields';
import { FieldRegistry } from './services/fieldRegistry';
import { ViewRegistry } from './services/viewRegistry';

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
	value: {
		key: string;
		value: string;
		label?: string;
	};
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
	 * Field hidden toggle
	 */
	hidden?: boolean;
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
	label?: string;
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
	uuid?: string;
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
	CustomValidator: CustomValidator;
	fieldRegistry: FieldRegistry;
	viewRegistry: ViewRegistry;
	parseFields: typeof parseFields;
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
		viewComponentName?: string;
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

export interface FieldType {
	_id: string;
	uuid: string;
	data: {
		componentName: string;
		module: string;
		generalConfig: {
			defaultGuideline?: string;
			defaultLabel?: string;
		};
	};
}

export interface DataType {
	_id: string;
	meta: {
		createdAt: string;
		deleted: boolean;
		lastModified: string;
		created: string;
	};
	data: {
		label: string;
		type: string;
		semanticType: string;
	};
	uuid: string;
}

export interface GeneralConfig {
	guideline: string;
	multiLanguage?: boolean;
	required?: boolean;
	hidden?: boolean;
	disabled?: boolean;
	min?: number;
	max?: number;
	combinedOutput?: boolean;
	placeholder?: string;
}

export interface Operator {
	label: string;
	value: string;
}

export interface FieldCompartment {
	uuid: string;
	position: number;
}

export interface ValidationCheck {
	key: string;
	val: unknown;
	err: string;
}

export interface ValicationCheckWithFields {
	type: string;
	fields: ValidationCheckField[];
}

export interface ValidationCheckField {
	name: string;
	type: string;
	checks: ValidationCheck[];
}

export interface ValicationCheckWithAllowedFields {
	id?: string;
	type: string;
	allowedFields: ValidationCheckAllowedField[];
}

export interface ValidationCheckAllowedField {
	type: string;
	fieldType: string;
	checks: ValidationCheck[];
}

export interface Validation {
	type: string;
	checks: (ValidationCheck | ValicationCheckWithFields | ValicationCheckWithAllowedFields)[];
}

export interface ContentTypeFieldSchema {
	uuid?: string;
	label: string;
	module: string;
	name: string;
	config?: {
		required: boolean;
		fields?: ContentTypeFieldSchema[];
		[key: string]: any;
	};
	defaultValue: string;
	validators: Validator[];
	operators: Operator[];
	validation?: Validation;
	generalConfig: GeneralConfig;
	dataType: DataType;
	fieldType: FieldType;
	preset?: Preset;
	compartment: FieldCompartment;
}
