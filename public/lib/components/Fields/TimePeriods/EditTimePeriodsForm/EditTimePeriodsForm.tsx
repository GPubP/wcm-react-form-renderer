import { Datepicker } from '@acpaas-ui/react-components';
import { Timepicker } from '@acpaas-ui/react-editorial-components';
import { Field, Formik } from 'formik';
import React from 'react';

import { FormikOnChangeHandler } from '../../../FormikOnChangeHandler';
import { TimePeriodsFormState } from '../TimePeriods.types';

import { EditTimePeriodsFormProps } from './EditTimePeriodsForm.types';

const EditTimePeriodsForm: React.FC<EditTimePeriodsFormProps> = ({ initialState, onChange }) => {
	const noopSubmit = (): void => undefined;

	return (
		<Formik enableReinitialize initialValues={initialState} onSubmit={noopSubmit}>
			{({ setFieldValue, values }) => {
				return (
					<>
						<FormikOnChangeHandler
							onChange={values => onChange(values as TimePeriodsFormState)}
						/>
						<div className="row">
							<div className="col-xs-12 col-md-7 col-lg-5 u-margin-bottom">
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
							<div className="col-xs-12 col-lg-3 u-margin-bottom">
								<Field
									as={Timepicker}
									id="startHour"
									name="startHour"
									hourLabel="Startuur"
									minuteLabel=""
									onChange={(value: string) => setFieldValue('startHour', value)}
									required
								/>
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
									minuteLabel=""
									onChange={(value: string) => setFieldValue('startHour', value)}
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
