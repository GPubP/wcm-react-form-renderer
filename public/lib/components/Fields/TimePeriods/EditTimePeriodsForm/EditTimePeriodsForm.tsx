import { Datepicker } from '@acpaas-ui/react-components';
import { Timepicker } from '@acpaas-ui/react-editorial-components';
import { Field, Formik } from 'formik';
import React from 'react';

import { FormikOnChangeHandler } from '../../../FormikOnChangeHandler';

import { EditTimePeriodsFormProps } from './EditTimePeriodsForm.types';

const EditTimePeriodsForm: React.FC<EditTimePeriodsFormProps> = ({ initialState, onChange }) => {
	return (
		<Formik enableReinitialize initialValues={initialState} onSubmit={() => undefined}>
			{props => {
				return (
					<>
						<FormikOnChangeHandler onChange={onChange} />
						<div className="row">
							<div className="col-xs-12 col-md-5 u-margin-bottom">
								<Field
									as={Datepicker}
									id="date"
									name="date"
									label="Datum"
									onChange={(value: string) => props.setFieldValue('date', value)}
									required
								/>
							</div>
							<div className="col-xs-12 col-md-3 u-margin-bottom">
								<Field
									as={Timepicker}
									id="startHour"
									name="startHour"
									hourLabel="Startuur"
									minuteLabel=""
									onChange={(value: string) =>
										props.setFieldValue('startHour', value)
									}
									required
								/>
							</div>
							<div className="col-xs-12 col-md-1 center-xs middle-xs u-margin-bottom">
								<span>t.e.m.</span>
							</div>
							<div className="col-xs-12 col-md-3 u-margin-bottom">
								<Field
									as={Timepicker}
									id="endHour"
									name="endHour"
									hourLabel="Einduur"
									minuteLabel=""
									onChange={(value: string) =>
										props.setFieldValue('startHour', value)
									}
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
