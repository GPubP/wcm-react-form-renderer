import { Button, Card, CardBody } from '@acpaas-ui/react-components';
import { DndContainer, DndDragDroppable } from '@acpaas-ui/react-editorial-components';
import classNames from 'classnames/bind';
import {
	FieldArray,
	FieldArrayRenderProps,
	FormikValues,
	useField,
	useFormikContext,
} from 'formik';
import { pathOr, split } from 'ramda';
import React, { ReactElement, Ref, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { FieldSchema } from '../../../core.types';
import { createInitialValues } from '../../../utils';
import { FieldRenderer } from '../../FieldRenderer';
import { FormRendererFieldTitle } from '../../FormRendererFieldTitle';

import { DND_ITEM_TYPE } from './Repeater.const';
import styles from './Repeater.module.scss';
import { RepeaterProps } from './Repeater.types';

const cx = classNames.bind(styles);

const Repeater: React.FC<RepeaterProps> = ({ fieldSchema }) => {
	const config = fieldSchema.config || {};
	const [, , helpers] = useField(fieldSchema.name);
	const fields = Array.isArray(fieldSchema.fields) ? fieldSchema.fields : [];
	const { values } = useFormikContext<FormikValues>();
	const value = pathOr([], split('.', fieldSchema.name), values) as FormikValues[];
	const min = config.min || 0;
	const max = config.max === 0 || !config.max ? Number.MAX_SAFE_INTEGER : config.max;
	const isRequired = min >= 1;
	const disabled = !!config.disabled;

	useEffect(() => {
		if (value && !Array.isArray(value)) {
			helpers.setValue([
				{
					value,
					uuid: uuid(),
				},
			]);
		}
	}, [helpers, value]);

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
		arrayHelper.push({
			uuid: uuid(),
			...initialValues,
		});
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
	 * Render functions
	 */
	const renderListItem = (
		arrayHelper: FieldArrayRenderProps,
		list: any[],
		value: { value: any; uuid: string },
		index: number
	): ReactElement => (
		<DndDragDroppable
			key={`reapeater-${arrayHelper.name}-${value.uuid}`}
			id={value.uuid}
			moveRow={moveRow(arrayHelper)}
			index={index}
			accept={[`${DND_ITEM_TYPE}_${arrayHelper.name}`]}
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
					key={value.uuid}
					className={cx('repeater__item', 'u-margin-bottom', {
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
					<Card className={cx('repeater__item__fields')}>
						<CardBody>
							{fields
								.map(
									(schema): FieldSchema => ({
										...schema,
										name: `${fieldSchema.name}.${index}.${schema.name}`,
										config: {
											...schema.config,
											wrapperClassName:
												schema.config?.wrapperClassName ||
												'u-no-margin-bottom',
										},
									})
								)
								.map(schema => (
									<FieldRenderer
										key={schema.name}
										fieldSchema={schema}
										renderContext={{
											wrappedInCard: true,
										}}
									/>
								))}
						</CardBody>
					</Card>
					{list.length > min ? (
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
			)}
		</DndDragDroppable>
	);

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
			<DndContainer draggable={true}>
				{Array.isArray(repeaterValue) && repeaterValue.length > 0
					? repeaterValue.map((value: any, index: number) =>
							renderListItem(arrayHelper, repeaterValue, value, index)
					  )
					: null}
			</DndContainer>
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
						<div className={cx('repeater', config.wrapperClassName)}>
							{fieldSchema.label && (
								<FormRendererFieldTitle
									isRequired={isRequired}
									className="u-margin-bottom"
								>
									{fieldSchema.label}
								</FormRendererFieldTitle>
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
