import { Button, Card, CardBody, Link } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import {
	FieldArray,
	FieldArrayRenderProps,
	FormikValues,
	useField,
	useFormikContext,
} from 'formik';
import { pathOr, split } from 'ramda';
import React, { ReactElement, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../../connectors';
import { FieldSchema } from '../../../core.types';
import { createInitialValues } from '../../../utils';
import { ErrorMessage } from '../../ErrorMessage';
import { FieldRenderer } from '../../FieldRenderer';
import { FormRendererFieldTitle } from '../../FormRendererFieldTitle';
import { RepeaterProps } from '../Repeater';
import styles from '../Repeater/Repeater.module.scss';

const cx = classNames.bind(styles);

const TimePeriodsRepeater: React.FC<RepeaterProps> = ({ fieldSchema }) => {
	const config = fieldSchema.config || {};
	const fields = Array.isArray(fieldSchema.fields) ? fieldSchema.fields : [];
	const min = config.min || 0;
	const max = config.max === 0 || !config.max ? Number.MAX_SAFE_INTEGER : config.max;
	const isRequired = min >= 1;
	const disabled = !!config.disabled;

	/**
	 * Hooks
	 */

	const [t] = useCoreTranslation();
	const [, , helpers] = useField(fieldSchema.name);
	const { values } = useFormikContext<FormikValues>();

	const value = pathOr([], split('.', fieldSchema.name), values) as FormikValues[];

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
	 * Methods
	 */

	// Add element to the field array
	const addItem = (arrayHelper: FieldArrayRenderProps): void => {
		const initialValues = createInitialValues({ fields }, {});

		arrayHelper.push({
			uuid: uuid(),
			...initialValues,
		});
	};

	// Delete element form the field array
	const deleteItem = (arrayHelper: FieldArrayRenderProps, index: number): void => {
		arrayHelper.remove(index);
	};

	/**
	 * Render
	 */

	const renderListItem = (
		arrayHelper: FieldArrayRenderProps,
		list: any[],
		value: { value: any; uuid: string },
		index: number
	): ReactElement => {
		return (
			<div key={value.uuid} className={cx('repeater__item')}>
				<Card className={cx('repeater__item__fields', 'u-no-margin-left')}>
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
										// Repeater specific props
										isRepeated: true,
										onDelete: () => deleteItem(arrayHelper, index),
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
	};

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
									<div className="u-margin-top">
										<Link
											onClick={() => addItem(arrayHelper)}
											disabled={disabled}
											className={cx('has-icon-left', 'repeater__link')}
										>
											<span className="fa fa-plus" aria-hidden="true" />
											Voeg {fieldSchema.label?.toLocaleLowerCase()} toe
										</Link>
									</div>
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

export default TimePeriodsRepeater;
