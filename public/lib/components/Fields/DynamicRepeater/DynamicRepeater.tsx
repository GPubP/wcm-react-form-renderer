import { Button } from '@acpaas-ui/react-components';
import { DndContainer, DndDragDroppable } from '@acpaas-ui/react-editorial-components';
import classNames from 'classnames/bind';
import { FieldArray, FieldArrayRenderProps, FormikValues, useFormikContext } from 'formik';
import { pathOr, split } from 'ramda';
import React, { ReactElement, Ref, useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import { FieldSchema } from '../../../core.types';
import { FieldRenderer } from '../../FieldRenderer';
import { FlyoutSelect } from '../../FlyoutSelect';

import { DND_ITEM_TYPE } from './DynamicRepeater.const';
import styles from './DynamicRepeater.module.scss';
import { DynamicRepeaterItem, DynamicRepeaterProps } from './DynamicRepeater.types';

const cx = classNames.bind(styles);

const DynamicRepeater: React.FC<DynamicRepeaterProps> = ({ fieldSchema }) => {
	const config = fieldSchema.config || {};
	const fields = Array.isArray(fieldSchema.fields) ? fieldSchema.fields : [];
	const { values } = useFormikContext<FormikValues>();
	const value = useMemo(
		() => pathOr([], split('.', fieldSchema.name), values) as DynamicRepeaterItem[],
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
		const itemToAdd: DynamicRepeaterItem = {
			value: undefined,
			uuid: uuid(),
			type: item.type,
			fieldRef: item.uuid || '',
			fieldType: item.config?.fieldType?.uuid || (item.config?.fieldType as string),
			preset: item.config?.preset?.uuid || ((item.config?.preset as unknown) as string),
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

	/**
	 * Move an element to a target index
	 *
	 * @param arrayHelper
	 */
	const moveRow = (arrayHelper: FieldArrayRenderProps) => (
		source: { index: number },
		target: { index: number }
	): void => {
		if (source.index === target.index) {
			return;
		}

		arrayHelper.move(source.index, target.index);
	};

	/**
	 * Get field schema for value
	 *
	 * @param fieldValue
	 */
	const getFieldSchema = (fieldValue: DynamicRepeaterItem): FieldSchema | null => {
		const fieldSchema = fields.find((field: FieldSchema) => {
			return field.uuid === fieldValue.fieldRef;
		});

		return fieldSchema ? fieldSchema : null;
	};

	/**
	 * Render functions
	 */

	/**
	 * Render one array element
	 *
	 * @param arrayHelper
	 * @param schema
	 * @param value
	 * @param index
	 * @param list
	 */
	const renderListItem = (
		arrayHelper: FieldArrayRenderProps,
		schema: FieldSchema | null,
		value: DynamicRepeaterItem,
		index: number,
		list: DynamicRepeaterItem[]
	): ReactElement => (
		<DndDragDroppable
			key={`reapeater-${name}-${value.uuid}`}
			id={value.uuid}
			moveRow={moveRow(arrayHelper)}
			index={index}
			accept={[`${DND_ITEM_TYPE}_${name}`]}
		>
			{({
				isDragging,
				dragDropRef,
			}: {
				isDragging: boolean;
				dragDropRef: Ref<HTMLDivElement>;
			}) => (
				<div
					ref={dragDropRef}
					key={`${index}-${schema?.name}`}
					className={cx('repeater__item', {
						'repeater__item--hovered': isDragging,
					})}
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
								disabled={list.length - 1 === index || disabled}
								negative
							/>
						</div>
					</div>
					<div className={cx('repeater__item__field')}>
						{schema ? <FieldRenderer fieldSchema={schema} /> : null}
					</div>
					{list.length > min ? (
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
			)}
		</DndDragDroppable>
	);

	/**
	 * Render array elements
	 *
	 * @param arrayHelper
	 */
	const renderArrayElements = (
		arrayHelper: FieldArrayRenderProps,
		repeaterValues: DynamicRepeaterItem[]
	): React.ReactNode => {
		return (
			<DndContainer draggable={true}>
				{(Array.isArray(repeaterValues) ? repeaterValues : []).map((value, index) => {
					let schema = getFieldSchema(value);

					if (schema) {
						schema = {
							...schema,
							name: `${fieldSchema.name}.${index}.value`,
							config: {
								...schema?.config,
								wrapperClassName: schema?.config?.wrapperClassName || 'col-xs-12',
							},
						};
					}

					return renderListItem(arrayHelper, schema, value, index, repeaterValues);
				})}
			</DndContainer>
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
