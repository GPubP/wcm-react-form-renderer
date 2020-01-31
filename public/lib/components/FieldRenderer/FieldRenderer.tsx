import React, { useMemo } from 'react';
import { Field, FieldProps } from 'formik';

import { fieldRegistry } from '../../services/fieldRegistry/fieldRegistry';
import { FieldConfig } from '../../services/fieldRegistry/fieldRegistry.types';

import { FieldRendererProps } from './FieldRenderer.types';

const FieldRenderer: React.FC<FieldRendererProps> = ({ fieldSchema }) => {

	const getFieldConfig = (): FieldConfig | undefined => {
		return fieldRegistry.get(fieldSchema.module, fieldSchema.type);
	}

	// only get the field config when field schema has changed
	const field: FieldConfig | undefined = useMemo(
		getFieldConfig,
		[fieldSchema]
	);

	// Don't render anything when there is no field config available
	if (!field) {
		return null;
	}

	/**
	 * Render a custom field depending on his field type
	 */
	const renderField = (): React.ReactNode => (
		<Field name={fieldSchema.name}>
			{(fieldProps: FieldProps<any, {}>): React.ReactNode => (
				<field.component fieldProps={fieldProps} fieldSchema={fieldSchema}></field.component>
			)}
		</Field>
	)

	/**
	 * Render a field group
	 */
	const renderFieldGroup = (): React.ReactNode => {
		return null;
	}

	return (
		<>
			{ fieldSchema.type === 'fieldgroup' ? renderFieldGroup() : renderField() }
		</>
	)
}

export default FieldRenderer;
