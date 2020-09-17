import { Button } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import { FieldArray, FieldArrayRenderProps, FormikValues, useFormikContext } from 'formik';
import { pathOr, split } from 'ramda';
import React from 'react';

import { FieldSchema } from '../../../core.types';
import { createInitialValues } from '../../../utils';
import { FieldRenderer } from '../../FieldRenderer';

import styles from './Repeater.module.scss';
import { RepeaterProps } from './Repeater.types';

const cx = classNames.bind(styles);

const Repeater: React.FC<RepeaterProps> = ({ fieldSchema }) => {
	const config = fieldSchema.config || {};
	const fields = Array.isArray(fieldSchema.fields) ? fieldSchema.fields : [];
	const { values } = useFormikContext<FormikValues>();
	const value = pathOr([], split('.', fieldSchema.name), values) as FormikValues[];
	const min = config.min || 0;
	const max = config.max === 0 || !config.max ? Number.MAX_SAFE_INTEGER : config.max;
	const isRequired = min >= 1;
	const disabled = !!config.disabled;

	/**
	 * Add element to the field array
	 *
	 * @param arrayHelper
	 */
	const addItem = (arrayHelper: FieldArrayRenderProps): void => {
		const initialValues = createInitialValues(
			{
				fields,
			},
			{}
		);
		arrayHelper.push(initialValues);
	};

	/**
	 * Delete element form the field array
	 *
	 * @param arrayHelper
	 * @param index
	 * @param repeaterValue
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

	/**
	 * Render functions
	 */

	/**
	 * Render array elements
	 *
	 * @param arrayHelper
	 * @param repeaterValue
	 */
	const renderArrayElements = (
		arrayHelper: FieldArrayRenderProps,
		repeaterValue: FormikValues[]
	): React.ReactNode => {
		return (
			<>
				{repeaterValue && repeaterValue.length > 0
					? repeaterValue.map((value: any, index: number) => {
							return (
								<div
									key={index}
									className={cx('repeater__item', 'u-margin-bottom')}
								>
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
												disabled={
													repeaterValue.length - 1 === index || disabled
												}
												negative
											/>
										</div>
									</div>
									<div className={cx('repeater__item__fields', 'row')}>
										{fields
											.map(
												(schema): FieldSchema => ({
													...schema,
													name: `${fieldSchema.name}.${index}.${schema.name}`,
													config: {
														...schema.config,
														wrapperClassName:
															schema.config?.wrapperClassName ||
															'col-xs-12 u-no-margin-bottom',
													},
												})
											)
											.map(schema => (
												<FieldRenderer
													key={schema.name}
													fieldSchema={schema}
												/>
											))}
									</div>
									{repeaterValue.length > min ? (
										<div>
											<Button
												onClick={() => deleteItem(arrayHelper, index)}
												negative
												icon="trash"
												disabled={disabled}
												ariaLabel="Delete item"
												type="secondary"
												htmlType="button"
											/>
										</div>
									) : null}
								</div>
							);
					  })
					: null}
			</>
		);
	};

	return (
		<>
			<FieldArray
				name={fieldSchema.name}
				render={arrayHelper => {
					if (value.length < min) {
						addItem(arrayHelper);
					}
					return (
						<div className={cx('repeater', 'u-margin-bottom', config.wrapperClassName)}>
							{fieldSchema.label && (
								<h6
									className={cx(
										'repeater__label',
										{
											'is-required': isRequired,
										},
										'u-margin-bottom'
									)}
								>
									{fieldSchema.label}
								</h6>
							)}
							{config.description && (
								<p className="u-margin-bottom"> {config.description} </p>
							)}
							<div>
								{renderArrayElements(arrayHelper, value)}
								{value.length < max ? (
									<Button
										onClick={() => addItem(arrayHelper)}
										iconLeft="plus"
										size="small"
										disabled={disabled}
										type="primary"
										htmlType="button"
										negative
									>
										Voeg een item toe
									</Button>
								) : null}
							</div>
						</div>
					);
				}}
			/>
		</>
	);
};

export default Repeater;
