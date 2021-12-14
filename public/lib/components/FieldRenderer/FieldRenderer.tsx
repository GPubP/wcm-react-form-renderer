import { usePrevious } from '@redactie/utils';
import classNames from 'classnames/bind';
import { Field, FieldProps, useFormikContext } from 'formik';
import { equals, lensPath, pathOr, set, slice } from 'ramda';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';

import { FieldRenderContextValue, FieldRendererContext } from '../../context';
import { MAP_MODES } from '../../core.types';
import { useFieldRendererContext, useFormContext } from '../../hooks';
import { FieldConfig, fieldRegistry } from '../../services/fieldRegistry';
import { FieldComponent } from '../FieldComponent';
import { DynamicRepeater, Fieldgroup, Hidden, Repeater } from '../Fields';

import FieldRendererStyles from './FieldRenderer.module.scss';
import { FieldRendererProps } from './FieldRenderer.types';

const cx = classNames.bind(FieldRendererStyles);

const FieldRenderer: React.FC<FieldRendererProps> = ({
	fieldSchema,
	renderContext,
	defaultWrapperClassName = '',
}) => {
	const getFieldConfig = (): FieldConfig | undefined =>
		fieldRegistry.get(fieldSchema.module, fieldSchema.type);
	// only get the field config when field schema has changed
	const fieldConfig: FieldConfig | undefined = useMemo(getFieldConfig, [fieldSchema]);

	// Get Parent context
	const parentContext = useFieldRendererContext();
	const { useDividers } = useFormContext();
	const { values, setFieldValue } = useFormikContext();
	const previousValues = usePrevious(values);

	// Setup child context
	const [newContext, setNewContext] = useState<FieldRenderContextValue>({
		fieldSchema,
		parentContext,
		level: parentContext.level + 1,
		// We can type it as it can't be undefined because the `if` below blocks further rendering
		fieldConfig: fieldConfig as FieldRenderContextValue['fieldConfig'],
		renderContext: {
			...renderContext,
			wrapperClass: fieldSchema.config?.wrapperClassName || defaultWrapperClassName, // use full width by default
		},
		// Depend on function hoisting
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		setWrapperClass,
	});

	useEffect(() => {
		const value = pathOr(null, [fieldSchema.name], values);

		if (!!value && !Array.isArray(value) && fieldSchema.dataType === 'array') {
			const newValue = fieldSchema.defaultValue ? fieldSchema.defaultValue : [];

			setFieldValue(fieldSchema.name, newValue);
		}

		if (!!value && typeof value !== fieldSchema.dataType && fieldSchema.dataType !== 'array') {
			const newValue = fieldSchema.defaultValue
				? fieldSchema.defaultValue &&
				  typeof fieldSchema.defaultValue === fieldSchema.dataType
				: fieldSchema.dataType === 'string'
				? ''
				: fieldSchema.dataType === 'object'
				? {}
				: null;

			setFieldValue(fieldSchema.name, newValue);
		}

		if (!fieldSchema.valueSync) {
			return;
		}

		for (const map of fieldSchema.valueSync) {
			if (map.type !== MAP_MODES.FE_DYNAMIC) {
				continue;
			}

			const previousValue = pathOr(null, map.destPath, previousValues);
			const currentValue = pathOr(null, map.destPath, values);
			const previousSourceValue = pathOr(null, map.sourcePath, previousValues);
			const newSourceValue = pathOr(null, map.sourcePath, values);

			if (
				equals(currentValue, newSourceValue) ||
				(currentValue &&
					(!equals(previousSourceValue, currentValue) ||
						!equals(previousValue, previousSourceValue)))
			) {
				continue;
			}

			setFieldValue(
				map.destPath[0],
				set(
					lensPath(slice(1, Infinity, map.destPath)),
					newSourceValue,
					pathOr({}, [map.destPath[0]], values)
				)
			);
		}
	}, [values]); // eslint-disable-line react-hooks/exhaustive-deps

	function setWrapperClass(className: string): void {
		setNewContext({
			...newContext,
			renderContext: {
				...newContext.renderContext,
				wrapperClass: className,
			},
		});
	}

	// Don't render anything when there is no field config available
	if (!fieldConfig) {
		return null;
	}

	const className = (hidden: boolean | undefined): string =>
		cx(
			!hidden ? 'a-field-renderer-field' : '',
			parentContext.level === -1 && useDividers && !hidden
				? 'a-field-renderer-field--level-0'
				: '',
			newContext.renderContext.wrapperClass
		);

	/**
	 * Render a custom field depending on his field type
	 */
	const renderField = (): React.ReactNode => (
		<Field name={fieldSchema.name}>
			{(fieldProps: FieldProps<any, {}>): React.ReactNode => {
				if (!newContext.fieldProps) {
					// The setTimeout function is needed!
					// React is throwing a warning when the setNewContext function is not called inside a setTimeout function
					// "Cannot update a component (`Unknown`) while rendering a different component (`Field`)"
					setTimeout(() => {
						setNewContext({ ...newContext, fieldProps });
					});
				}

				return (
					<FieldComponent
						fieldConfig={fieldConfig}
						fieldProps={fieldProps}
						fieldSchema={fieldSchema}
					/>
				);
			}}
		</Field>
	);

	/**
	 * Render a field group
	 */
	const renderFieldGroup = (): ReactNode => <Fieldgroup fieldSchema={fieldSchema} />;

	/**
	 * Render a field array
	 */
	const renderFieldArray = (): ReactNode => {
		// Check if field has custom repeater
		if (fieldSchema.repeaterComponentName) {
			const customConfig = fieldRegistry.get(
				fieldSchema.module,
				fieldSchema.repeaterComponentName
			);

			const CustomRepeater = customConfig?.repeaterComponent || Repeater;

			return <CustomRepeater fieldSchema={fieldSchema} />;
		}

		return <Repeater fieldSchema={fieldSchema} />;
	};

	/**
	 * Render a hidden field
	 */
	const renderHiddenField = (): ReactNode => <Hidden fieldSchema={fieldSchema} />;

	/**
	 * Render a dynamic field array
	 */
	const renderDynamicFieldArray = (): ReactNode => <DynamicRepeater fieldSchema={fieldSchema} />;

	return (
		<FieldRendererContext.Provider value={newContext}>
			<div className={className(fieldSchema.hidden)}>
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
