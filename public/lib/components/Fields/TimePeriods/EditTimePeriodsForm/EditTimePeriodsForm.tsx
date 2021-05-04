import { Datepicker } from '@acpaas-ui/react-components';
import { Timepicker } from '@acpaas-ui/react-editorial-components';
import { Field, Formik } from 'formik';
import React from 'react';

import { FormikOnChangeHandler } from '../../../FormikOnChangeHandler';
import { TimePeriodsFormState } from '../TimePeriods.types';

import { EditTimePeriodsFormProps } from './EditTimePeriodsForm.types';

const EditTimePeriodsForm: React.FC<EditTimePeriodsFormProps> = ({
	initialState,
	onChange,
	onSubmit = () => undefined,
}) => {
	return (
		<Formik enableReinitialize initialValues={initialState} onSubmit={onSubmit}>
			{({ setFieldValue, values }) => {
				return (
					<>
						<FormikOnChangeHandler
							onChange={values => onChange(values as TimePeriodsFormState)}
						/>
						<div className="row">
							<div className="col-xs-12 col-lg-9 u-margin-bottom">
								<Field
									as={Datepicker}
									id="startDate"
									name="startDate"
									label="Datum"
									activeDate={values.startDate}
									onChange={(value: string) => setFieldValue('startDate', value)}
									required
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12 col-lg-4">
								<Field
									as={Timepicker}
									id="startTime"
									name="startTime"
									hourLabel="Startuur"
									minuteLabel=""
									onChange={(value: string) => setFieldValue('startTime', value)}
									required
								/>
							</div>
							<div className="col-xs-12 col-lg-1 center-xs top-xs u-flex u-padding-top-sm md:u-padding-top-md u-margin-bottom-xs">
								<span>t.e.m.</span>
							</div>
							<div className="col-xs-12 col-lg-4">
								<Field
									as={Timepicker}
									id="endTime"
									name="endTime"
									hourLabel="Einduur"
									minuteLabel=""
									onChange={(value: string) => setFieldValue('endTime', value)}
								/>
							</div>
						</div>
					</>
				);
			}}
		</Formik>
	);
};

export default EditTimePeriodsForm;
