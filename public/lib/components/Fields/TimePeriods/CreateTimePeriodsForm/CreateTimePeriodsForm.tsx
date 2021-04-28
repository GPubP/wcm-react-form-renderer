import { Datepicker, Select, Switch } from '@acpaas-ui/react-components';
import { Timepicker } from '@acpaas-ui/react-editorial-components';
import { SelectOption } from '@redactie/utils';
import { Field, Formik } from 'formik';
import { isEmpty } from 'ramda';
import React, { ChangeEvent } from 'react';

import { ErrorMessage } from '../../../ErrorMessage';
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
import { CreateTimePeriodsFormProps } from './CreateTimePeriodsForm.types';

const CreateTimePeriodsForm: React.FC<CreateTimePeriodsFormProps> = ({
	children,
	initialState = INITIAL_CREATE_FORM_STATE,
	onSubmit,
}) => {
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

	return (
		<Formik
			initialValues={initialState}
			onSubmit={onSubmit}
			validationSchema={CREATE_VALIDATION_SCHEMA}
		>
			{props => {
				const { setFieldValue, values } = props;

				return (
					<>
						<div className="u-padding">
							<div className="row">
								<div className="col-xs-12 col-md-7 u-margin-bottom">
									<Field
										as={Datepicker}
										id="startDate"
										name="startDate"
										label="Datum"
										activeDate={values.startDate}
										onChange={(value: string) =>
											setFieldValue('startDate', value)
										}
										required
									/>
									<ErrorMessage name="startDate" />
								</div>
							</div>
							<div className="row">
								<div className="col-xs-12 col-lg-3 u-margin-bottom">
									<Field
										as={Timepicker}
										id="startHour"
										name="startHour"
										hourLabel="Startuur"
										hourPlaceholder="uu"
										minuteLabel=""
										onChange={(value: string) =>
											setFieldValue('startHour', value)
										}
										value={values.startHour}
										required
									/>
									<ErrorMessage name="startHour" />
								</div>
								<div className="col-xs-12 col-lg-1 center-xs bottom-xs u-flex u-padding-bottom-sm u-margin-bottom">
									<span>t.e.m.</span>
								</div>
								<div className="col-xs-12 col-lg-3 u-margin-bottom">
									<Field
										as={Timepicker}
										id="endHour"
										name="endHour"
										hourLabel="Einduur"
										hourPlaceholder="uu"
										minuteLabel=""
										onChange={(value: string) =>
											setFieldValue('endHour', value)
										}
										value={values.endHour}
									/>
									<ErrorMessage name="endHour" />
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
										onClick={(e: ChangeEvent<HTMLInputElement>) =>
											setFieldValue('allDay', e.target.checked)
										}
									/>
									<ErrorMessage name="allDay" />
								</div>
							</div>
						</div>
						<hr className="u-no-margin" />
						<div className="u-padding">
							<div className="row">
								<div className="col-xs-12 col-lg-3 u-margin-bottom">
									<Field
										as={Select}
										id="repeatType"
										name="repeatType"
										label="Herhaling"
										options={REPEAT_TYPE_OPTIONS}
									/>
								</div>
							</div>
							{!isEmpty(values.repeatType) && (
								<div className="row">
									<div className="col-xs-12 col-lg-3 u-margin-bottom">
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
									<div className="col-xs-12 col-lg-4 u-margin-bottom">
										<Field
											as={Datepicker}
											id="endDate"
											name="endDate"
											label="Tot en met"
											activeDate={values.endDate}
											onChange={(value: string) =>
												setFieldValue('endDate', value)
											}
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
													id="monthFrequency"
													name="monthFrequency"
													label="Op de"
													options={MONTH_WEEK_FREQ_OPTIONS}
													required
												/>
												<ErrorMessage name="monthFrequency" />
											</div>
											<div className="col-xs-12 col-lg u-padding-top u-margin-bottom">
												<Field
													as={Select}
													id="monthWeekDay"
													name="monthWeekDay"
													options={MONTH_WEEKDAY_OPTIONS}
													required
												/>
												<ErrorMessage name="monthWeekDay" />
											</div>
										</>
									)}
								</div>
							)}
						</div>
						{children && children(props)}
					</>
				);
			}}
		</Formik>
	);
};

export default CreateTimePeriodsForm;
