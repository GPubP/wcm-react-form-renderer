import { FieldHelperProps, FieldProps } from 'formik';
import React from 'react';

import { FieldDataType, FieldSchema, FormValues } from '../../core.types';
import { ViewFieldProps } from '../viewRegistry/viewRegistry.types';

export interface InputFieldProps {
	/**
	 * Formik field props
	 * for morde detail visit, https://jaredpalmer.com/formik/docs/api/field
	 */
	fieldProps: FieldProps<FieldDataType, FormValues>;
	/**
	 * Fieldschema
	 * This is a partial of FormSchema
	 * But it only holds the schema information for a field
	 */
	fieldSchema: FieldSchema;
	/**
	 * FieldHelperProps
	 * helper functions which you can use to imperatively change the value, error value or touched status for the field in question
	 */
	fieldHelperProps: FieldHelperProps<any>;
}
export interface FieldConfig {
	/**
	 * Name of the field
	 * This is a unique identifier
	 */
	name: string;
	/**
	 * module
	 * This prop defines which readaction module
	 * has registered this field.
	 * It is possible to have multiple text fields
	 * across modules
	 * On the other hand, it is not possible to have multiple text
	 * fields in the same module.
	 */
	module: string;
	/**
	 * The component that will be rendered inside the form
	 */
	component: React.FC<InputFieldProps>;
	/**
	 * The component that will be rendered inside the viewer
	 */
	viewComponent?: React.FC<ViewFieldProps>;
}

export interface FieldsRegistryConfig {
	[key: string]: {
		[key: string]: FieldConfig;
	};
}
