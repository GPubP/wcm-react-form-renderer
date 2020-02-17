import React, { useMemo } from 'react';
import { Field, FieldProps } from 'formik';

import { fieldRegistry } from '../../services/fieldRegistry/fieldRegistry';
import { FieldConfig } from '../../services/fieldRegistry/fieldRegistry.types';

import { Fieldgroup } from '../Fields';
import FieldComponent from '../FieldComponent/FieldComponent';

import { FieldRendererProps } from './FieldRenderer.types';

const FieldRenderer: React.FC<FieldRendererProps> = ({ fieldSchema }) => {

	const getFieldConfig = (): FieldConfig | undefined => (
		fieldRegistry.get(fieldSchema.module, fieldSchema.type)
	);

	// only get the field config when field schema has changed
	const fieldConfig: FieldConfig | undefined = useMemo(
		getFieldConfig,
		[fieldSchema]
	);

	// Don't render anything when there is no field config available
	if (!fieldConfig) {
		return null;
	}

	/**
	 * Render a custom field depending on his field type
	 */
	const renderField = (): React.ReactNode => (
		<Field name={fieldSchema.name}>
			{(fieldProps: FieldProps<any, {}>): React.ReactNode => (
				<FieldComponent fieldConfig={fieldConfig} fieldProps={fieldProps} fieldSchema={fieldSchema}></FieldComponent>
			)}
		</Field>
	);

	/**
	 * Render a field group
	 */
	const renderFieldGroup = (): React.ReactNode => (
		<Fieldgroup fieldSchema={fieldSchema} />
	);

	return (
		<>
			{fieldSchema.type === 'fieldgroup' ? renderFieldGroup() : renderField()}
		</>
	);
};

export default FieldRenderer;
