import { Button } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import { FieldArray, FieldArrayRenderProps, FormikValues, useFormikContext } from 'formik';
import React from 'react';

import { FieldSchema } from '../../../core.types';
import { createInitialValues } from '../../../utils';
import FieldRenderer from '../../FieldRenderer/FieldRenderer';

import styles from './Repeater.module.scss';
import { RepeaterProps } from './Repeater.types';

const cx = classNames.bind(styles);

const Repeater: React.FC<RepeaterProps> = ({ fieldSchema }) => {
	const config = fieldSchema.config || {};
	const fields = Array.isArray(fieldSchema.fields) ? fieldSchema.fields : [];
	const { values } = useFormikContext<FormikValues>();
	const value = values[fieldSchema.name];
	const min = config.min || 0;
	const max = config.max === 0 || !config.max ? Number.MAX_SAFE_INTEGER : config.max;
	const isRequired = min >= 1;

	/**
	 * Add element to the field array
	 *
	 * @param arrayHelper
	 */
	const addItem = (arrayHelper: FieldArrayRenderProps): void => {
		const initialValues = createInitialValues({
			fields,
		});
		arrayHelper.push(initialValues);
	};

	/**
	 * Delete element form the field array
	 *
	 * @param arrayHelper
	 * @param index
	 * @param repaterValue
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
	 * @param repaterValue
	 */
	const renderArrayElements = (
		arrayHelper: FieldArrayRenderProps,
		repaterValue: FormikValues[]
	): React.ReactNode => {
		return (
			<>
				{repaterValue && repaterValue.length > 0
					? repaterValue.map((value: any, index: number) => {
							return (
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
												disabled={repaterValue.length - 1 === index}
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
												})
											)
											.map((schema, index) => (
												<FieldRenderer key={index} fieldSchema={schema} />
											))}
									</div>
									{repaterValue.length > min ? (
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
									<Button
										onClick={() => addItem(arrayHelper)}
										iconLeft="plus"
										size="small"
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
