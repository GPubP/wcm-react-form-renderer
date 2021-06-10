import { Datepicker, Select, Switch } from '@acpaas-ui/react-components';
import { Timepicker } from '@acpaas-ui/react-editorial-components';
import { SelectOption } from '@redactie/utils';
import classnames from 'classnames/bind';
import { Field, Formik, FormikProps } from 'formik';
import { isEmpty } from 'ramda';
import React, { ChangeEvent, ReactElement, useMemo, useState } from 'react';

import { ErrorMessage } from '../../../ErrorMessage';
import { FormikOnChangeHandler } from '../../../FormikOnChangeHandler';
import { TimePeriodsRepeatType } from '../TimePeriods.types';
import { WeekDayMultiSelect } from '../WeekDayMultiSelect';

import {
	CREATE_VALIDATION_SCHEMA,
	DAILY_FREQUENCY_OPTIONS,
	INITIAL_CREATE_FORM_STATE,
	MONTH_WEEK_FREQ_OPTIONS,
	MONTH_WEEKDAY_OPTIONS,
	MONTHLY_FREQUENCY_OPTIONS,
	REPEAT_TYPE_OPTIONS,
	WEEK_DAY_OPTIONS,
	WEEKLY_FREQUENCY_OPTIONS,
} from './CreateTimePeriodsForm.const';
import { getRecurringTimePeriods } from './CreateTimePeriodsForm.helpers';
import styles from './CreateTimePeriodsForm.module.scss';
import {
	CreateTimePeriodsFormProps,
	CreateTimePeriodsFormState,
} from './CreateTimePeriodsForm.types';

const cx = classnames.bind(styles);

const CreateTimePeriodsForm: React.FC<CreateTimePeriodsFormProps> = ({
	children,
	initialState = INITIAL_CREATE_FORM_STATE,
	onSubmit,
}) => {
	/**
	 * Hooks
	 */

	const [formValues, setFormValues] = useState<CreateTimePeriodsFormState | null>(null);
	const recurringTimePeriods = useMemo(() => getRecurringTimePeriods(formValues), [formValues]);

	/**
	 * Methods
	 */

	const getRepeatFrequencyOptions = (repeatType: TimePeriodsRepeatType | ''): SelectOption[] => {
		switch (repeatType) {
			case TimePeriodsRepeatType.Daily:
				return DAILY_FREQUENCY_OPTIONS;
			case TimePeriodsRepeatType.Weekly:
				return WEEKLY_FREQUENCY_OPTIONS;
			case TimePeriodsRepeatType.Monthly:
				return MONTHLY_FREQUENCY_OPTIONS;
			default:
				return [];
		}
	};

	const onFormSubmit = (values: CreateTimePeriodsFormState): void => {
		onSubmit(values, recurringTimePeriods || []);
	};

	const onRepeatTypeChange = (
		newRepeatType: string,
		setFieldValue: FormikProps<CreateTimePeriodsFormState>['setFieldValue']
	): void => {
		switch (newRepeatType) {
			case TimePeriodsRepeatType.Daily:
				setFieldValue('weeklyDays', undefined);
				setFieldValue('monthlyFrequency', undefined);
				setFieldValue('monthlyWeekday', undefined);
				break;
			case TimePeriodsRepeatType.Weekly:
				setFieldValue('monthlyFrequency', undefined);
				setFieldValue('monthlyWeekday', undefined);
				break;
			case TimePeriodsRepeatType.Monthly:
				setFieldValue('weeklyDays', undefined);
				setFieldValue('monthlyFrequency', MONTH_WEEK_FREQ_OPTIONS[0].value);
				setFieldValue('monthlyWeekday', MONTH_WEEKDAY_OPTIONS[0].value);
				break;
			default:
				break;
		}

		setFieldValue('repeatType', newRepeatType);
		setFieldValue('repeatFrequency', 1);
	};

	/**
	 * Render
	 */

	const renderRecurringTimePeriodsText = (): ReactElement | null => {
		if (!formValues) {
			return null;
		}

		const { repeatType, startDate, startTime } = formValues;
		const isNotRepeated = repeatType === '' && startDate && startTime;
		const periodsLength = isNotRepeated ? 1 : recurringTimePeriods?.length ?? 0;

		if (periodsLength === 0) {
			return null;
		}

		const newPeriodsString = periodsLength === 1 ? 'nieuw tijdstip' : 'nieuwe tijdstippen';
		const timePeriodsString = `${periodsLength} ${newPeriodsString}`;

		return (
			<p className={cx('o-create-time-periods-form__amount', 'u-text-light')}>
				U staat op het punt <strong>{timePeriodsString}</strong> toe te voegen
			</p>
		);
	};

	return (
		<Formik
			initialValues={initialState}
			onSubmit={onFormSubmit}
			validationSchema={CREATE_VALIDATION_SCHEMA}
		>
			{props => {
				const { setFieldTouched, setFieldValue, values } = props;

				return (
					<>
						<FormikOnChangeHandler
							onChange={values => setFormValues(values as CreateTimePeriodsFormState)}
						/>
						<div className="u-padding">
							<div className="row">
								<div className="col-xs-12 col-md-6 col-lg-7 u-margin-bottom">
									<Field
										as={Datepicker}
										id="startDate"
										name="startDate"
										label="Datum"
										activeDate={values.startDate}
										onChange={(value: string) => {
											// If a date is selected via the calendar, the blur state will not be triggered
											// This will also prevent errors from being shown directly
											setFieldTouched('startDate', true);
											setFieldValue('startDate', value);
										}}
										required
									/>
									<ErrorMessage name="startDate" />
								</div>
							</div>
							<div className="row">
								<div className="col-xs-12 col-md-4 col-lg-3 u-margin-bottom">
									<Field
										key={values.startTime}
										as={Timepicker}
										disabled={values.allDay}
										id="startTime"
										name="startTime"
										hourLabel="Startuur"
										hourPlaceholder="uu"
										minuteLabel=""
										onChange={(value: string) =>
											setFieldValue('startTime', value)
										}
										value={values.startTime}
										required
									/>
									<ErrorMessage name="startTime" />
								</div>
								<div className="col-xs-12 col-md-1 center-xs top-xs u-flex sm:u-padding-top-md sm:u-margin-bottom u-margin-bottom-xs">
									<span>t.e.m.</span>
								</div>
								<div className="col-xs-12 col-md-4 col-lg-3 u-margin-bottom">
									<Field
										key={values.endTime}
										as={Timepicker}
										disabled={values.allDay}
										id="endTime"
										name="endTime"
										hourLabel="Einduur"
										hourPlaceholder="uu"
										minuteLabel=""
										onChange={(value: string) =>
											setFieldValue('endTime', value)
										}
										value={values.endTime}
									/>
									<ErrorMessage name="endTime" />
								</div>
								<div className="col-xs-12 col-lg-3 u-margin-bottom">
									<Field
										as={Switch}
										id="allDay"
										name="allDay"
										label="Hele dag"
										labelFalse="Nee"
										labelTrue="Ja"
										checked={values.allDay}
										onClick={(e: ChangeEvent<HTMLInputElement>) => {
											if (e.target.checked) {
												setFieldValue('startTime', '0:0');
												setFieldValue('endTime', '23:55');
											}
											setFieldValue('allDay', e.target.checked);
										}}
									/>
									<ErrorMessage name="allDay" />
								</div>
							</div>
						</div>
						<hr className="u-no-margin" />
						<div className="u-padding">
							<div className="row">
								<div className="col-xs-12 col-md-6 col-lg-3 u-margin-bottom">
									<Field
										as={Select}
										id="repeatType"
										name="repeatType"
										label="Herhaling"
										onChange={(e: ChangeEvent<HTMLSelectElement>) =>
											onRepeatTypeChange(e.target.value, setFieldValue)
										}
										options={REPEAT_TYPE_OPTIONS}
									/>
								</div>
							</div>
							{!isEmpty(values.repeatType) && (
								<div className="row">
									<div className="col-xs-12 col-md-6 col-lg-3 u-margin-bottom">
										<Field
											as={Select}
											id="repeatFrequency"
											name="repeatFrequency"
											label="Elke"
											options={getRepeatFrequencyOptions(values.repeatType)}
											required
										/>
										<ErrorMessage name="repeatFrequency" />
									</div>
									<div className="col-xs-12 col-md-6 col-lg-4 u-margin-bottom">
										<Field
											as={Datepicker}
											id="endDate"
											name="endDate"
											label="Tot en met"
											activeDate={values.endDate}
											onChange={(value: string) => {
												// If a date is selected via the calendar, the blur state will not be triggered
												// This will also prevent errors from being shown directly
												setFieldTouched('endDate', true);
												setFieldValue('endDate', value);
											}}
											required
										/>
										<ErrorMessage name="endDate" />
									</div>
									{values.repeatType === TimePeriodsRepeatType.Weekly && (
										<div className="col-xs-12 col-lg-5 u-margin-bottom">
											<Field
												as={WeekDayMultiSelect}
												id="weeklyDays"
												name="weeklyDays"
												label="Op de volgende weekdagen"
												options={WEEK_DAY_OPTIONS}
												required
											/>
											<ErrorMessage name="weeklyDays" />
										</div>
									)}
									{values.repeatType === TimePeriodsRepeatType.Monthly && (
										<>
											<div className="col-xs-12 col-lg u-margin-bottom">
												<Field
													as={Select}
													id="monthlyFrequency"
													name="monthlyFrequency"
													label="Op de"
													options={MONTH_WEEK_FREQ_OPTIONS}
													required
												/>
												<ErrorMessage name="monthlyFrequency" />
											</div>
											<div className="col-xs-12 col-lg u-padding-top u-margin-bottom">
												<Field
													as={Select}
													id="monthlyWeekday"
													name="monthlyWeekday"
													options={MONTH_WEEKDAY_OPTIONS}
													required
												/>
												<ErrorMessage name="monthlyWeekday" />
											</div>
										</>
									)}
								</div>
							)}
							{renderRecurringTimePeriodsText()}
						</div>
						{children && children(props)}
					</>
				);
			}}
		</Formik>
	);
};

export default CreateTimePeriodsForm;
