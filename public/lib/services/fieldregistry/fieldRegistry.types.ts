import React from 'react';
import { FieldProps } from 'formik';

import { FieldSchema, FieldDataType, FormValues } from '../../core.types';

export interface InputFieldProps {
	fieldProps: FieldProps<FieldDataType, FormValues>;
	fieldSchema: FieldSchema;
}

export interface FieldConfig {
	name: string;
	module: string;
	component: React.FC<InputFieldProps>;
}

export interface FieldsRegistryConfig {
	[key: string]: {
		[key: string]: FieldConfig;
	};
}
