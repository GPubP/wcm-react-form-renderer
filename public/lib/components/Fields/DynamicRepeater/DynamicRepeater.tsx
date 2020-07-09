import { Button } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import { FieldArray, FieldArrayRenderProps } from 'formik';
import React from 'react';

import { FieldSchema } from '../../../core.types';
import { createInitialValues } from '../../../utils';
import FieldRenderer from '../../FieldRenderer/FieldRenderer';
import FlyoutSelect from '../../FlyoutSelect/FlyoutSelect';

import { availableFields } from './DynamicRepeater.const';
import styles from './DynamicRepeater.module.scss';
import { DynamicRepeaterProps } from './DynamicRepeater.types';

const cx = classNames.bind(styles);

const DynamicRepeater: React.FC<DynamicRepeaterProps> = ({ fieldSchema }) => {
	const config = fieldSchema.config || {};
	const fields = Array.isArray(fieldSchema.fields) ? fieldSchema.fields : [];
	const min = config.min || 0;
	const max = config.max === 0 || !config.max ? Number.MAX_SAFE_INTEGER : config.max;
	const isRequired = min >= 1;

	/**
	 * Helper class to move item in array
	 *
	 * @param fromIndex
	 * @param toIndex
	 */
	const moveField = (fromIndex: number, toIndex: number): void => {
		const item = fields[fromIndex];
		fields.splice(fromIndex, 1);
		fields.splice(toIndex, 0, item);
	};

	/**
	 * Add element to the field array
	 *
	 * @param arrayHelper
	 * @param item
	 */
	const addItem = (arrayHelper: FieldArrayRenderProps, item: FieldSchema): void => {
		const initialValues = createInitialValues({
			fields: [item],
		});

		arrayHelper.push(initialValues);
		fields.push(item);
	};

	/**
	 * Delete element form the field array
	 *
	 * @param arrayHelper
	 * @param index
	 */
	const deleteItem = (arrayHelper: FieldArrayRenderProps, index: number): void => {
		arrayHelper.remove(index);
		fields.splice(index, 1);
	};

	/**
	 * Move an element in the field array one place up
	 *
	 * @param arrayHelper
	 * @param index
	 */
	const moveUp = (arrayHelper: FieldArrayRenderProps, index: number): void => {
		arrayHelper.move(index, index - 1);
		moveField(index, index - 1);
	};

	/**
	 * Move an element in the field array one place down
	 *
	 * @param arrayHelper
	 * @param index
	 */
	const moveDown = (arrayHelper: FieldArrayRenderProps, index: number): void => {
		arrayHelper.move(index, index + 1);
		moveField(index, index + 1);
	};

	/**
	 * Render functions
	 */

	/**
	 * Render array elements
	 *
	 * @param arrayHelper
	 */
	const renderArrayElements = (arrayHelper: FieldArrayRenderProps): React.ReactNode => {
		return (
			<>
				{fields
					.map((schema, index) => ({
						...schema,
						name: `${fieldSchema.name}.${index}.${schema.name}`,
						config: {
							...schema.config,
							wrapperClassName: schema.config?.wrapperClassName || 'col-xs-12',
						},
					}))
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
										disabled={fields.length - 1 === index}
										negative
									/>
								</div>
							</div>
							<div className={cx('repeater__item__field')}>
								<FieldRenderer key={index} fieldSchema={schema} />
							</div>
							{fields.length > min ? (
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
								{renderArrayElements(arrayHelper)}
								{fields.length < max ? (
									<FlyoutSelect
										onSelect={(field: FieldSchema) =>
											addItem(arrayHelper, field)
										}
										items={availableFields}
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
