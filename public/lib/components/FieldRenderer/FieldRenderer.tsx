import { Field, FieldProps } from 'formik';
import React, { useMemo } from 'react';

import { fieldRegistry } from '../../services/fieldRegistry/fieldRegistry';
import { FieldConfig } from '../../services/fieldRegistry/fieldRegistry.types';
import FieldComponent from '../FieldComponent/FieldComponent';
import { DynamicRepeater, Fieldgroup, Repeater } from '../Fields';

import { FieldRendererProps } from './FieldRenderer.types';

const FieldRenderer: React.FC<FieldRendererProps> = ({ fieldSchema }: FieldRendererProps) => {
	const getFieldConfig = (): FieldConfig | undefined =>
		fieldRegistry.get(fieldSchema.module, fieldSchema.type);

	// only get the field config when field schema has changed
	const fieldConfig: FieldConfig | undefined = useMemo(getFieldConfig, [fieldSchema]);

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
				<FieldComponent
					fieldConfig={fieldConfig}
					fieldProps={fieldProps}
					fieldSchema={fieldSchema}
				></FieldComponent>
			)}
		</Field>
	);

	/**
	 * Render a field group
	 */
	const renderFieldGroup = (): React.ReactNode => <Fieldgroup fieldSchema={fieldSchema} />;

	/**
	 * Render a field array
	 */
	const renderFieldArray = (): React.ReactNode => <Repeater fieldSchema={fieldSchema} />;

	/**
	 * Render a dynamic field array
	 */
	const renderDynamicFieldArray = (): React.ReactNode => (
		<DynamicRepeater fieldSchema={fieldSchema} />
	);

	return (
		<>
			{fieldSchema.type === 'fieldgroup'
				? renderFieldGroup()
				: fieldSchema.type === 'repeater'
				? renderFieldArray()
				: fieldSchema.type === 'dynamicRepeater'
				? renderDynamicFieldArray()
				: renderField()}
		</>
	);
};

export default FieldRenderer;
