import { Button, Card, CardBody, Link } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import {
	FieldArray,
	FieldArrayRenderProps,
	FormikValues,
	useField,
	useFormikContext,
} from 'formik';
import { pathOr, pick, sort, split } from 'ramda';
import React, { ReactElement, useEffect, useState } from 'react';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../../connectors';
import { FieldSchema } from '../../../core.types';
import { createInitialValues } from '../../../utils';
import { ErrorMessage } from '../../ErrorMessage';
import { FieldRenderer } from '../../FieldRenderer';
import { FormRendererFieldTitle } from '../../FormRendererFieldTitle';
import { RepeaterProps } from '../Repeater';
import styles from '../Repeater/Repeater.module.scss';
import { CreateTimePeriodsFormState } from '../TimePeriods/CreateTimePeriodsForm';
import { CreateTimePeriodsModal } from '../TimePeriods/CreateTimePeriodsModal';
import {
	INITIAL_TIME_PERIOD_VALUE,
	TIME_PERIOD_VALUE_KEYS,
} from '../TimePeriods/TimePeriodField/TimePeriodField.const';

import {
	generateTimePeriodValues,
	parseTimePeriodValues,
	sortRepeaterValues,
} from './TimePeriodsRepeater.helpers';
import {
	TimePeriodsRepeaterInitialValue,
	TimePeriodsRepeaterValue,
} from './TimePeriodsRepeater.types';

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

	const [showModal, setShowModal] = useState(false);
	const [t] = useCoreTranslation();
	const [, , helpers] = useField(fieldSchema.name);
	const { values } = useFormikContext<FormikValues>();

	const value = pathOr([], split('.', fieldSchema.name), values) as TimePeriodsRepeaterValue[];

	// Make sure our value is an array
	useEffect(() => {
		if (value && !Array.isArray(value)) {
			helpers.setValue(generateTimePeriodValues({ value }, 1));
		}
	}, [helpers, value]);

	// Set minimum amount of values
	useEffect(() => {
		if (min > 0 && (!value || value.length === 0)) {
			const initialFieldValue = createInitialValues(
				{ fields },
				{ value: INITIAL_TIME_PERIOD_VALUE }
			) as TimePeriodsRepeaterInitialValue;
			helpers.setValue(generateTimePeriodValues(initialFieldValue, min));
		}
	}, [fields, helpers, min, value]);

	/**
	 * Methods
	 */

	// Add time periods to the field array
	const onAddItems = (values: CreateTimePeriodsFormState, recurringPeriods: Date[]): void => {
		const formValues = pick(TIME_PERIOD_VALUE_KEYS, values);
		const parsedValue = createInitialValues(
			{ fields },
			{ value: formValues }
		) as TimePeriodsRepeaterInitialValue;
		const newTotal = recurringPeriods.length + (value?.length ?? 0);
		const maxValuesToAdd =
			newTotal > max ? recurringPeriods.length - (newTotal - max) : recurringPeriods.length;
		const newValues = parseTimePeriodValues(recurringPeriods, parsedValue, maxValuesToAdd);

		helpers.setValue(
			sort(
				sortRepeaterValues,
				Array.isArray(value) && value.length ? value.concat(newValues) : newValues
			)
		);

		// Close modal
		setShowModal(false);
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
					? repeaterValue.map((sortedValue: any, index: number) =>
							renderListItem(arrayHelper, repeaterValue, sortedValue, index)
					  )
					: null}
			</div>
		);
	};

	return (
		<>
			<div className={cx('repeater')}>
				{fieldSchema.label && (
					<FormRendererFieldTitle isRequired={isRequired} className="u-margin-bottom-xs">
						{fieldSchema.label}
					</FormRendererFieldTitle>
				)}
				{config.description && <p className="u-margin-bottom-xs">{config.description}</p>}
				<div>
					{value?.length === 0 && (
						<div className={cx('empty', 'u-margin-top-xs')}>
							{t(CORE_TRANSLATIONS['TABLE_NO-ITEMS'])}
						</div>
					)}
					<FieldArray name={fieldSchema.name}>
						{arrayHelper => {
							return renderArrayElements(arrayHelper, value);
						}}
					</FieldArray>
					{value.length < max ? (
						<div className="u-margin-top">
							<Link
								onClick={() => setShowModal(true)}
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
			<ErrorMessage name={fieldSchema.name} />
			<CreateTimePeriodsModal
				show={showModal}
				onCancel={() => setShowModal(false)}
				onSubmit={onAddItems}
				maxValues={max}
				currentValues={value?.length || 0}
			/>
		</>
	);
};

export default TimePeriodsRepeater;
