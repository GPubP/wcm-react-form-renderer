import { Datepicker } from '@acpaas-ui/react-components';
import { Timepicker } from '@acpaas-ui/react-editorial-components';
import { Field } from 'formik';
import React from 'react';

import { ErrorMessage } from '../../../ErrorMessage';

import { TimePeriodFieldProps } from './TimePeriodField.types';

const TimePeriodField: React.FC<TimePeriodFieldProps> = ({ label, name, value, onChange }) => {
	return (
		<div className="a-input">
			{label && <label className="a-input__label">{label}</label>}
			<div className="row">
				<div className="col-xs-12 col-lg-9 u-margin-bottom">
					<Field
						as={Datepicker}
						id="edit-startDate"
						name={`${name}.startDate`}
						label="Datum"
						activeDate={value.startDate}
						onChange={(value: string) => onChange('startDate', value)}
						required
					/>
					<ErrorMessage name={`${name}.startDate`} />
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12 col-lg-4">
					<Field
						as={Timepicker}
						id="edit-startTime"
						name={`${name}.startTime`}
						hourLabel="Startuur"
						minuteLabel=""
						onChange={(value: string) => onChange('startTime', value)}
						required
					/>
					<ErrorMessage name={`${name}.startTime`} />
				</div>
				<div className="col-xs-12 col-lg-1 center-xs top-xs u-flex u-padding-top-sm md:u-padding-top-md u-margin-bottom-xs">
					<span>t.e.m.</span>
				</div>
				<div className="col-xs-12 col-lg-4">
					<Field
						as={Timepicker}
						id="edit-endTime"
						name={`${name}.endTime`}
						hourLabel="Einduur"
						minuteLabel=""
						onChange={(value: string) => onChange('endTime', value)}
						value={value.endTime}
					/>
					<ErrorMessage name={`${name}.endTime`} />
				</div>
			</div>
		</div>
	);
};

export default TimePeriodField;
