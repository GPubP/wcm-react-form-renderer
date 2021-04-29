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
							<div className="col-xs-12 col-md-7 col-lg-5 u-margin-bottom">
								<Field
									as={Datepicker}
									id="date"
									name="date"
									label="Datum"
									activeDate={values.date}
									onChange={(value: string) => setFieldValue('date', value)}
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
