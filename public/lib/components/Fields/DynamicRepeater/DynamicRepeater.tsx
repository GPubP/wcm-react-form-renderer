import { Button } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import { FieldArray, FieldArrayRenderProps, FormikValues, useFormikContext } from 'formik';
import { pathOr, split } from 'ramda';
import React, { useMemo } from 'react';

import { FieldSchema } from '../../../core.types';
import { FieldRenderer } from '../../FieldRenderer';
import { FlyoutSelect } from '../../FlyoutSelect';

import styles from './DynamicRepeater.module.scss';
import { DynamicRepeaterProps } from './DynamicRepeater.types';

const cx = classNames.bind(styles);

const DynamicRepeater: React.FC<DynamicRepeaterProps> = ({ fieldSchema }) => {
	const config = fieldSchema.config || {};
	const fields = Array.isArray(fieldSchema.fields) ? fieldSchema.fields : [];
	const { values } = useFormikContext<FormikValues>();
	const value = useMemo(
		() => pathOr([], split('.', fieldSchema.name), values) as FormikValues[],
		[fieldSchema.name, values]
	);
	const min = useMemo(() => config.amount?.minValue || 0, [config.amount]);
	const max = useMemo(
		() =>
			config.amount?.maxValue === 0 || !config.amount?.maxValue
				? Number.MAX_SAFE_INTEGER
				: config.amount?.maxValue,
		[config.amount]
	);
	const isRequired = useMemo(() => min >= 1, [min]);
	const disabled = !!config.disabled;

	/**
	 * Add element to the field array
	 *
	 * @param arrayHelper
	 * @param item
	 */
	const addItem = (arrayHelper: FieldArrayRenderProps, item: FieldSchema): void => {
		const itemToAdd = {
			value: undefined,
			type: item.type,
			fieldType:
				item.config?.preset?.uuid ||
				item.config?.preset ||
				item.config?.fieldType?.uuid ||
				item.config?.fieldType ||
				item.type,
		};

		arrayHelper.push(itemToAdd);
	};

	/**
	 * Delete element form the field array
	 *
	 * @param arrayHelper
	 * @param index
	 */
	const deleteItem = (arrayHelper: FieldArrayRenderProps, index: number): void => {
		arrayHelper.remove(index);
	};

	/**
	 * Move an element in the field array one place up
	 *
	 * @param arrayHelper
	 * @param index
	 */
	const moveUp = (arrayHelper: FieldArrayRenderProps, index: number): void => {
		arrayHelper.move(index, index - 1);
	};

	/**
	 * Move an element in the field array one place down
	 *
	 * @param arrayHelper
	 * @param index
	 */
	const moveDown = (arrayHelper: FieldArrayRenderProps, index: number): void => {
		arrayHelper.move(index, index + 1);
	};

	const getFieldSchema = (fieldValue: FormikValues): FieldSchema | null => {
		const fieldSchema = fields.find((field: FieldSchema) => {
			return (
				field.config?.preset?.uuid === fieldValue.fieldType ||
				field.config?.preset === fieldValue.fieldType ||
				field.config?.fieldType?.uuid === fieldValue.fieldType ||
				field.config?.fieldType === fieldValue.fieldType ||
				field.type === fieldValue.fieldType
			);
		});

		return fieldSchema ? fieldSchema : null;
	};

	/**
	 * Render functions
	 */

	/**
	 * Render array elements
	 *
	 * @param arrayHelper
	 */
	const renderArrayElements = (
		arrayHelper: FieldArrayRenderProps,
		repeaterValues: FormikValues[]
	): React.ReactNode => {
		return (
			<>
				{(Array.isArray(repeaterValues) ? repeaterValues : [])
					.map((value: FormikValues) => {
						const config = getFieldSchema(value);
						return config;
					})
					.map((schema, index) => {
						if (!schema) {
							return null;
						}

						return {
							...schema,
							name: `${fieldSchema.name}.${index}.value`,
							config: {
								...schema?.config,
								wrapperClassName: schema?.config?.wrapperClassName || 'col-xs-12',
							},
						};
					})
					.map((schema, index) => (
						<div key={`${index}-${schema?.name}`} className={cx('repeater__item')}>
							<div>
								<div className="m-button-group m-button-group--vertical">
									<Button
										className={cx('no-border')}
										onClick={() => moveUp(arrayHelper, index)}
										icon="chevron-up"
										ariaLabel="Move item up"
										type="primary"
										htmlType="button"
										size="tiny"
										disabled={index === 0 || disabled}
										negative
									/>
									<Button
										className={cx('no-border')}
										onClick={() => moveDown(arrayHelper, index)}
										icon="chevron-down"
										ariaLabel="Move item down"
										type="primary"
										htmlType="button"
										size="tiny"
										disabled={repeaterValues.length - 1 === index || disabled}
										negative
									/>
								</div>
							</div>
							<div className={cx('repeater__item__field')}>
								{schema ? <FieldRenderer fieldSchema={schema} /> : null}
							</div>
							{repeaterValues.length > min ? (
								<div>
									<Button
										onClick={() => deleteItem(arrayHelper, index)}
										icon="trash"
										ariaLabel="Delete item"
										disabled={disabled}
										type="danger"
										htmlType="button"
										size="small"
									/>
								</div>
							) : null}
						</div>
					))}
			</>
		);
	};

	return (
		<>
			<FieldArray
				name={fieldSchema.name}
				render={arrayHelper => {
					return (
						<div className={cx('repeater', 'u-margin-bottom', config.wrapperClassName)}>
							{fieldSchema.label && (
								<h6
									className={cx(
										'repeater__label',
										{
											'is-required': isRequired,
										},
										'u-margin-bottom-xs'
									)}
								>
									{fieldSchema.label}
								</h6>
							)}
							{config.description ? (
								<p className="u-margin-bottom"> {config.description} </p>
							) : null}
							<div>
								{renderArrayElements(arrayHelper, value)}
								{!disabled && value.length < max ? (
									<FlyoutSelect
										onSelect={(field: FieldSchema) =>
											addItem(arrayHelper, field)
										}
										items={fields}
									/>
								) : null}
							</div>
						</div>
					);
				}}
			/>
		</>
	);
};

export default DynamicRepeater;
