import { Button } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import { FieldArray, FieldArrayRenderProps, FormikValues, useFormikContext } from 'formik';
import { equals, pathOr, split } from 'ramda';
import React, { ReactElement, useEffect, useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../../connectors';
import { FieldSchema } from '../../../core.types';
import { ErrorMessage } from '../../ErrorMessage';
import { FieldRenderer } from '../../FieldRenderer';
import { FlyoutSelect } from '../../FlyoutSelect';
import { FormRendererFieldTitle } from '../../FormRendererFieldTitle';

import styles from './DynamicRepeater.module.scss';
import { DynamicRepeaterItem, DynamicRepeaterProps } from './DynamicRepeater.types';

const cx = classNames.bind(styles);

const DynamicRepeater: React.FC<DynamicRepeaterProps> = ({ fieldSchema }) => {
	const [t] = useCoreTranslation();
	const config = fieldSchema.config || {};
	const fields = Array.isArray(fieldSchema.fields) ? fieldSchema.fields : [];
	const { values, setFieldValue } = useFormikContext<FormikValues>();
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

	useEffect(() => {
		if (!value || !Array.isArray(value)) {
			return;
		}

		const newValues = value.map(item => {
			const field = fields.find(field => field.uuid === item.fieldRef);

			return {
				...item,
				semanticType: field?.name || null,
				type: field?.type || item.type,
				multiple: field?.config?.max ? field.config.max > 1 : null,
			};
		});

		if (!equals(newValues, value)) {
			setFieldValue(fieldSchema.name, newValues);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	/**
	 * Add element to the field array
	 *
	 * @param arrayHelper
	 * @param item
	 */
	const addItem = (arrayHelper: FieldArrayRenderProps, item: FieldSchema): void => {
		const itemToAdd: DynamicRepeaterItem = {
			value: item.defaultValue,
			uuid: uuid(),
			type: item.type,
			fieldRef: item.uuid || '',
			fieldType: item.config?.fieldType?.uuid || (item.config?.fieldType as string),
			preset: item.config?.preset?.uuid || ((item.config?.preset as unknown) as string),
			semanticType: item.name || null,
			multiple: item.config?.max ? item.config.max > 1 : null,
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
		if (value.length === 1) {
			// We set the field value to undefined because we don't want to have validation errors caused by an empty array
			// when using minItems and maxItems JSON Schema validators
			setFieldValue(fieldSchema.name, undefined, true);
		} else {
			arrayHelper.remove(index);
		}
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
		<div key={`reapeater-${name}-${value.uuid}`} className={cx('repeater__item')}>
			{max !== 1 && (
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
			)}
			<div className={cx('repeater__item__field')}>
				{schema ? (
					<FieldRenderer
						fieldSchema={schema}
						renderContext={{
							defaultOpen: true,
							wrappedInDashedContainer: true,
							renderAsRequired: true,
						}}
					/>
				) : null}
			</div>
			<div>
				<Button
					onClick={() => deleteItem(arrayHelper, index)}
					negative
					icon="trash-o"
					ariaLabel="Delete item"
					disabled={disabled}
					type="secondary"
					htmlType="button"
				/>
			</div>
		</div>
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
			<>
				{(Array.isArray(repeaterValues) ? repeaterValues : []).map((value, index) => {
					let schema = getFieldSchema(value);
					const wrapperClass = schema?.config?.wrapperClassName || '';

					if (schema) {
						schema = {
							...schema,
							name: `${fieldSchema.name}.${index}.value`,
							config: {
								...schema?.config,
								wrapperClassName: cx(
									wrapperClass,
									'repeater__item__field__content'
								),
							},
						};
					}

					return renderListItem(arrayHelper, schema, value, index, repeaterValues);
				})}
			</>
		);
	};

	return (
		<>
			<FieldArray
				name={fieldSchema.name}
				render={arrayHelper => {
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
							{config.description ? (
								<p className="u-margin-bottom-xs"> {config.description} </p>
							) : null}
							<div>
								{value?.length === 0 && (
									<div className={cx('empty', 'u-margin-bottom-xs')}>
										{t(CORE_TRANSLATIONS['TABLE_NO-ITEMS'])}
									</div>
								)}
								{renderArrayElements(arrayHelper, value)}
								<div className="u-margin-bottom-xs">
									<ErrorMessage name={fieldSchema.name} />
								</div>
								{!disabled && value.length < max ? (
									<FlyoutSelect
										label={fieldSchema.label?.toLocaleLowerCase() || ''}
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
