import { Button, Card, CardBody, Link } from '@acpaas-ui/react-components';
import { SelectOption } from '@redactie/utils';
import classNames from 'classnames/bind';
import {
	FieldArray,
	FieldArrayRenderProps,
	FormikValues,
	useField,
	useFormikContext,
} from 'formik';
import { pathOr, split } from 'ramda';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../../connectors';
import { FieldSchema } from '../../../core.types';
import { useFieldRendererContext } from '../../../hooks';
import { createInitialValues } from '../../../utils';
import { ErrorMessage } from '../../ErrorMessage';
import { FieldRenderer } from '../../FieldRenderer';
import { FormRendererFieldTitle } from '../../FormRendererFieldTitle';
import { RepeaterProps, RepeaterValue } from '../Repeater';
import styles from '../Repeater/Repeater.module.scss';

import { KeyValueModal } from './KeyValueModal';

const cx = classNames.bind(styles);

const KeyValueRepeater: React.FC<RepeaterProps> = ({ fieldSchema }) => {
	const [t] = useCoreTranslation();
	const config = fieldSchema.config || {};
	const [, , helpers] = useField<any[]>(fieldSchema.name);
	const fields = Array.isArray(fieldSchema.fields) ? fieldSchema.fields : [];
	const { values } = useFormikContext<FormikValues>();
	const { renderContext } = useFieldRendererContext();
	const value = pathOr([], split('.', fieldSchema.name), values) as FormikValues[];
	const min = config.min || 0;
	const max = config.max === 0 || !config.max ? Number.MAX_SAFE_INTEGER : config.max;
	const isRequired = min >= 1;
	const disabled = !!config.disabled;
	const [showModal, setShowModal] = useState(false);

	const currentValues = useMemo(() => {
		if (value.length === 1 && !value[0].label && !value[0].value) {
			return 0;
		}

		return value.length;
	}, [value]);

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

	// Prepare first item when defaultOpen is set by parent component
	useEffect(
		() => {
			if (renderContext.defaultOpen && !Array.isArray(value)) {
				helpers.setValue([
					{
						uuid: uuid(),
						...createInitialValues({ fields }, {}),
					},
				]);
			}
		},
		[config.required, fieldSchema.name, renderContext] // eslint-disable-line
	);

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
	 * Add multiple elements to the field array
	 *
	 * @param arrayHelper
	 */
	const addItems = (arrayHelper: FieldArrayRenderProps, keyValuePairs: SelectOption[]): void => {
		if (
			values.options.length === 1 &&
			!values.options[0].value.label &&
			!values.options[0].value.label
		) {
			arrayHelper.remove(0);
		}

		keyValuePairs.forEach(keyValue => {
			arrayHelper.push({
				uuid: uuid(),
				value: {
					label: keyValue.label,
					value: keyValue.value,
				},
			});
		});

		setShowModal(false);
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
		value: RepeaterValue,
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
									defaultOpen: true,
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
			<div>
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
						<>
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
										<div className={cx('empty', 'u-margin-top-xs')}>
											{t(CORE_TRANSLATIONS['TABLE_NO-ITEMS'])}
										</div>
									)}
									{renderArrayElements(arrayHelper, value)}
									{value.length < max ? (
										<div className="u-margin-top-xs u-flex u-flex-row">
											<Link
												onClick={() => addItem(arrayHelper)}
												disabled={disabled}
												className={cx('has-icon-left', 'repeater__link')}
											>
												<span className="fa fa-plus" aria-hidden="true" />
												Voeg {fieldSchema.label?.toLocaleLowerCase()} toe
											</Link>
											<Link
												onClick={() => setShowModal(true)}
												disabled={disabled}
												className={cx(
													'has-icon-left',
													'repeater__link',
													'u-margin-left'
												)}
											>
												<span className="fa fa-plus" aria-hidden="true" />
												Voeg meerdere{' '}
												{fieldSchema.label?.toLocaleLowerCase()} toe
											</Link>
										</div>
									) : null}
								</div>
							</div>
							<KeyValueModal
								show={showModal}
								onCancel={() => setShowModal(false)}
								onSubmit={keyValuePairs => addItems(arrayHelper, keyValuePairs)}
								maxValues={max}
								currentValues={currentValues}
								labelCopy={
									config.fields.find(
										(field: { name: string }) => field.name === 'label'
									)?.label
								}
								valueCopy={
									config.fields.find(
										(field: { name: string }) => field.name === 'value'
									)?.label
								}
							/>
						</>
					);
				}}
			/>
			<ErrorMessage name={fieldSchema.name} />
		</>
	);
};

export default KeyValueRepeater;
