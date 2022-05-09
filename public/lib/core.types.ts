import { ErrorMessageProps, FormikValues } from 'formik';

import { CustomValidator, CustomValidatorWorker } from './classes';
import { CompareViewProps } from './components/CompareView';
import { AllowedHeader, FormProps } from './components/Form';
import { FormRendererFieldTitleProps } from './components/FormRendererFieldTitle/FormRendererFieldTitle.types';
import { ViewProps } from './components/View';
import { FieldRendererContext, FormContext } from './context';
import { getValueSyncMap } from './helpers/getValueSyncMap';
import { parseFields } from './helpers/parseFields';
import { useFieldRendererContext, useFormContext, useSelectFirstOptionWhenHidden } from './hooks';
import { FieldRegistry } from './services/fieldRegistry';
import { ViewRegistry } from './services/viewRegistry';
import { filterAllowedOptions } from './utils';

/**
 * A list of allowed field types
 */
const ALL_FIELD_DATA_TYPES = ['string', 'number', 'date', 'array', 'object'];
type FieldDataTypeTuple = typeof ALL_FIELD_DATA_TYPES;
export type FieldDataType = FieldDataTypeTuple[number];

export enum MAP_MODES {
	FE_DYNAMIC = 'FE_DYNAMIC',
	FE_REVERSED_DYNAMIC = 'FE_REVERSED_DYNAMIC',
}

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
		key?: string;
		value: string;
		label?: string;
	};
}

export interface FieldValueSync {
	destPath: string[];
	sourcePath: string[];
	type: MAP_MODES;
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
	 * Custom repeater component name
	 */
	repeaterComponentName?: string;
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
	 * Field Semantic type
	 */
	semanticType: string;
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
		synced?: boolean;
		wrapperClassName?: string;
		id?: string;
		preset?: Preset;
		inputDescription?: string;
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
	/**
	 * Value sync
	 * Sync value with other field in content item
	 */
	valueSync?: FieldValueSync[];
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
	CompareView: React.FC<CompareViewProps>;
	ErrorMessage: React.FC<ErrorMessageProps>;
	CustomValidator: CustomValidator;
	CustomValidatorWorker: CustomValidatorWorker;
	fieldRegistry: FieldRegistry;
	viewRegistry: ViewRegistry;
	parseFields: typeof parseFields;
	getValueSyncMap: typeof getValueSyncMap;
	useFieldRendererContext: typeof useFieldRendererContext;
	useFormContext: typeof useFormContext;
	FieldRendererContext: typeof FieldRendererContext;
	FormContext: typeof FormContext;
	FormRendererFieldTitle: React.FC<FormRendererFieldTitleProps>;
	DEFAULT_ALLOWED_HEADERS: readonly AllowedHeader[];
	DEFAULT_FIELD_CONFIG_PROPS: string[];
	useSelectFirstOptionWhenHidden: typeof useSelectFirstOptionWhenHidden;
	filterAllowedOptions: typeof filterAllowedOptions;
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
			fields: ContentTypeFieldSchema[];
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
		repeaterComponentName?: string;
		viewComponentName?: string;
		generalConfig: {
			isQueryable: boolean;
			isTranslate: boolean;
			isMultiple: boolean;
			mapValueToContentItemPath: FieldValueSync[];
		};
		fields: {
			field: any;
			formSchema: {
				fields: ContentTypeFieldSchema[];
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
export type PresetDetail = BasePreset<Validator, FieldType>;

export interface FieldType {
	_id: string;
	uuid: string;
	data: {
		componentName: string;
		repeaterComponentName?: string;
		viewComponentName?: string;
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
		fields?: ContentTypeFieldSchema[];
		[key: string]: any;
	};
	defaultValue?: string;
	validators: Validator[];
	operators: Operator[];
	validation?: Validation;
	generalConfig: GeneralConfig;
	dataType: DataType;
	fieldType: FieldType;
	preset?: Preset | PresetDetail;
	compartment: FieldCompartment;
}
