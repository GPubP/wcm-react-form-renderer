import { Button, Card, CardBody } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import {
	FieldArray,
	FieldArrayRenderProps,
	FormikValues,
	useField,
	useFormikContext,
} from 'formik';
import { pathOr, split } from 'ramda';
import React, { ReactElement, useEffect, useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../../connectors';
import { FieldSchema } from '../../../core.types';
import { createInitialValues } from '../../../utils';
import { ErrorMessage } from '../../ErrorMessage';
import { FieldRenderer } from '../../FieldRenderer';
import { FormRendererFieldTitle } from '../../FormRendererFieldTitle';

import styles from './Repeater.module.scss';
import { RepeaterProps } from './Repeater.types';

const cx = classNames.bind(styles);

const Repeater: React.FC<RepeaterProps> = ({ fieldSchema }) => {
	const [t] = useCoreTranslation();
	const config = fieldSchema.config || {};
	const [, , helpers] = useField(fieldSchema.name);
	const fields = Array.isArray(fieldSchema.fields) ? fieldSchema.fields : [];
	const { values } = useFormikContext<FormikValues>();
	const value = pathOr([], split('.', fieldSchema.name), values) as FormikValues[];
	const min = config.min || 0;
	const max = config.max === 0 || !config.max ? Number.MAX_SAFE_INTEGER : config.max;
	const isRequired = min >= 1;
	const disabled = !!config.disabled;
	const lowerCasedLabel = useMemo(
		() =>
			fieldSchema.label
				? fieldSchema.label.charAt(0).toLowerCase() + fieldSchema.label.slice(1)
				: 'item',
		[fieldSchema.label]
	);

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

	/**
	 * Render functions
	 */
	const renderListItem = (
		arrayHelper: FieldArrayRenderProps,
		list: any[],
		value: { value: any; uuid: string },
		index: number
	): ReactElement => (
		<div key={value.uuid} className={cx('repeater__item')}>
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
										schema.config?.wrapperClassName || 'u-no-margin-bottom',
								},
							})
						)
						.map(schema => (
							<FieldRenderer
								key={schema.name}
								fieldSchema={schema}
								renderContext={{
									wrappedInCard: true,
									renderAsRequired: true,
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
						icon="trash-o"
						disabled={disabled}
						ariaLabel="Delete item"
						type="secondary"
						htmlType="button"
					/>
				</div>
			) : null}
		</div>
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
			<div className="u-margin-top-xs">
				{Array.isArray(repeaterValue) && repeaterValue.length > 0
					? repeaterValue.map((value: any, index: number) =>
							renderListItem(arrayHelper, repeaterValue, value, index)
					  )
					: null}
			</div>
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
						<div className={cx('repeater')}>
							{fieldSchema.label && (
								<FormRendererFieldTitle
									isRequired={isRequired}
									className="u-margin-bottom-xs"
								>
									{fieldSchema.label}
								</FormRendererFieldTitle>
							)}
							{config.description && (
								<p className="u-margin-bottom-xs"> {config.description} </p>
							)}
							<div>
								{value?.length === 0 && (
									<div className={cx('empty', 'u-margin-bottom')}>
										{t(CORE_TRANSLATIONS['TABLE_NO-ITEMS'])}
									</div>
								)}
								{renderArrayElements(arrayHelper, value)}
								{value.length < max ? (
									<Button
										onClick={() => addItem(arrayHelper)}
										iconLeft="plus"
										size="small"
										disabled={disabled}
										type="transparent"
										htmlType="button"
										className={cx('no-text-decoration')}
									>
										Voeg {lowerCasedLabel} toe
									</Button>
								) : null}
							</div>
						</div>
					);
				}}
			/>
			<ErrorMessage name={fieldSchema.name} />
		</>
	);
};

export default Repeater;
