import { Datepicker, Select, Switch } from '@acpaas-ui/react-components';
import { Timepicker } from '@acpaas-ui/react-editorial-components';
import { Field, Formik } from 'formik';
import React from 'react';

import { ErrorMessage } from '../../../ErrorMessage';

import {
	CREATE_VALIDATION_SCHEMA,
	INITIAL_CREATE_FORM_STATE,
	REPEAT_TYPE_OPTIONS,
} from './CreateTimePeriodsForm.const';
import { CreateTimePeriodsFormProps } from './CreateTimePeriodsForm.types';

const CreateTimePeriodsForm: React.FC<CreateTimePeriodsFormProps> = ({ children, onSubmit }) => {
	return (
		<Formik
			initialValues={INITIAL_CREATE_FORM_STATE}
			onSubmit={onSubmit}
			validationSchema={CREATE_VALIDATION_SCHEMA}
		>
			{props => {
				return (
					<>
						<div className="u-padding">
							<div className="row">
								<div className="col-xs-12 col-md-7 u-margin-bottom">
									<Field
										as={Datepicker}
										id="date"
										name="date"
										label="Datum"
										required
									/>
									<ErrorMessage name="date" />
								</div>
							</div>
							<div className="row">
								<div className="col-xs-12 col-md-3 u-margin-bottom">
									<Field
										as={Timepicker}
										id="startHour"
										name="startHour"
										label="Startuur"
										required
									/>
									<ErrorMessage name="startHour" />
								</div>
								<div className="col-xs-12 col-md-1 center-xs middle-xs u-flex u-margin-bottom">
									<span>t.e.m.</span>
								</div>
								<div className="col-xs-12 col-md-3 u-margin-bottom">
									<Field
										as={Timepicker}
										id="endHour"
										name="endHour"
										label="Einduur (optioneel)"
									/>
								</div>
								<div className="col-xs-12 col-md-3 u-margin-bottom">
									<Field
										as={Switch}
										id="allDay"
										name="allDay"
										label="Hele dag"
										labelFalse="Nee"
										labelTrue="Ja"
									/>
								</div>
							</div>
						</div>
						<hr className="u-no-margin" />
						<div className="u-padding">
							<div className="row">
								<div className="col-xs-12 col-md-3 u-margin-bottom">
									<Field
										as={Select}
										id="repeatType"
										name="repeatType"
										label="Herhaling"
										options={REPEAT_TYPE_OPTIONS}
									/>
								</div>
							</div>
						</div>
						{children && children(props)}
					</>
				);
			}}
		</Formik>
	);
};

export default CreateTimePeriodsForm;
