import classNames from 'classnames/bind';
import { Field, FieldProps } from 'formik';
import React, { useMemo, useState } from 'react';

import { FieldRenderContextValue, FieldRendererContext } from '../../context';
import { useFieldRenderer } from '../../hooks';
import { useForm } from '../../hooks/useForm';
import { FieldConfig, fieldRegistry } from '../../services/fieldRegistry';
import { FieldComponent } from '../FieldComponent';
import { DynamicRepeater, Fieldgroup, Hidden, Repeater } from '../Fields';

import FieldRendererStyles from './FieldRenderer.module.scss';
import { FieldRendererProps } from './FieldRenderer.types';

const cx = classNames.bind(FieldRendererStyles);

const FieldRenderer: React.FC<FieldRendererProps> = ({ fieldSchema }: FieldRendererProps) => {
	const getFieldConfig = (): FieldConfig | undefined =>
		fieldRegistry.get(fieldSchema.module, fieldSchema.type);
	// only get the field config when field schema has changed
	const fieldConfig: FieldConfig | undefined = useMemo(getFieldConfig, [fieldSchema]);

	// Get Parent context
	const { level } = useFieldRenderer();
	const { useDividers } = useForm();
	// Setup child context
	const [newContext, setNewContext] = useState<FieldRenderContextValue>({
		level: level + 1,
		// We can type it as it can't be undefined because the `if` below blocks further rendering
		fieldConfig: fieldConfig as FieldRenderContextValue['fieldConfig'],
		fieldSchema,
	});

	// Don't render anything when there is no field config available
	if (!fieldConfig) {
		return null;
	}

	const className = cx(
		'a-field-renderer-field',
		level === 0 && useDividers ? 'a-field-renderer-field--level-0' : '',
		fieldSchema.config?.wrapperClassName
	);

	/**
	 * Render a custom field depending on his field type
	 */
	const renderField = (): React.ReactNode => (
		<Field name={fieldSchema.name}>
			{(fieldProps: FieldProps<any, {}>): React.ReactNode => {
				if (!newContext.fieldProps) {
					setNewContext({ ...newContext, fieldProps });
				}

				return (
					<FieldComponent
						fieldConfig={fieldConfig}
						fieldProps={fieldProps}
						fieldSchema={fieldSchema}
					></FieldComponent>
				);
			}}
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
	 * Render a hidden field
	 */
	const renderHiddenField = (): React.ReactNode => <Hidden fieldSchema={fieldSchema} />;

	/**
	 * Render a dynamic field array
	 */
	const renderDynamicFieldArray = (): React.ReactNode => (
		<DynamicRepeater fieldSchema={fieldSchema} />
	);

	return (
		<FieldRendererContext.Provider value={newContext}>
			<div className={className}>
				{fieldSchema.hidden
					? renderHiddenField()
					: fieldSchema.type === 'fieldgroup'
					? renderFieldGroup()
					: fieldSchema.type === 'repeater'
					? renderFieldArray()
					: fieldSchema.type === 'dynamicRepeater'
					? renderDynamicFieldArray()
					: renderField()}
			</div>
		</FieldRendererContext.Provider>
	);
};

export default FieldRenderer;
export { FieldRendererStyles };
