import { Button } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import { FieldArray, FieldArrayRenderProps, FormikValues, useFormikContext } from 'formik';
import { path, split } from 'ramda';
import React from 'react';

import { FieldSchema } from '../../../core.types';
import FieldRenderer from '../../FieldRenderer/FieldRenderer';
import FlyoutSelect from '../../FlyoutSelect/FlyoutSelect';

import styles from './DynamicRepeater.module.scss';
import { DynamicRepeaterProps } from './DynamicRepeater.types';

const cx = classNames.bind(styles);

const DynamicRepeater: React.FC<DynamicRepeaterProps> = ({ fieldSchema }) => {
	const config = fieldSchema.config || {};
	const fields = Array.isArray(fieldSchema.fields) ? fieldSchema.fields : [];
	const { values } = useFormikContext<FormikValues>();
	const value = path(split('.', fieldSchema.name), values) as FormikValues[];
	const min = config.min || 0;
	const max = config.max === 0 || !config.max ? Number.MAX_SAFE_INTEGER : config.max;
	const isRequired = min >= 1;

	/**
	 * Add element to the field array
	 *
	 * @param arrayHelper
	 * @param item
	 */
	const addItem = (arrayHelper: FieldArrayRenderProps, item: FieldSchema): void => {
		const itemToAdd = {
			value: '',
			type: item.config?.id || item.type,
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
			return field.config?.id === fieldValue.type || field.type === fieldValue.type;
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
				{repeaterValues
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
						<div key={index} className={cx('repeater__item')}>
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
										disabled={index === 0}
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
										disabled={repeaterValues.length - 1 === index}
										negative
									/>
								</div>
							</div>
							<div className={cx('repeater__item__field')}>
								{schema ? <FieldRenderer key={index} fieldSchema={schema} /> : null}
							</div>
							{repeaterValues.length > min ? (
								<div>
									<Button
										onClick={() => deleteItem(arrayHelper, index)}
										icon="trash"
										ariaLabel="Delete item"
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
							{config.description ? (
								<p className="u-margin-bottom"> {config.description} </p>
							) : null}
							<div>
								{renderArrayElements(arrayHelper, value)}
								{value.length < max ? (
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
