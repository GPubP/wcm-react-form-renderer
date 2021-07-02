import { Datepicker, TextField } from '@acpaas-ui/react-components';
import { Timepicker } from '@acpaas-ui/react-editorial-components';
import { Field } from 'formik';
import React, { ChangeEvent } from 'react';

import { ErrorMessage } from '../../../ErrorMessage';

import { TimePeriodFieldProps } from './TimePeriodField.types';

const TimePeriodField: React.FC<TimePeriodFieldProps> = ({
	name,
	value,
	onChange,
	options = [],
}) => {
	return (
		<div className="a-input">
			<div className="row">
				<div className="col-xs-12 u-margin-bottom">
					<Field
						as={Datepicker}
						id={`edit-${name}.startDate`}
						name={`${name}.startDate`}
						label="Datum"
						activeDate={value.startDate}
						onChange={(value: string) => onChange('startDate', value)}
						required
					/>
					<ErrorMessage name={`${name}.startDate`} />
				</div>
			</div>
			<div className="row u-margin-bottom">
				<div className="col-xs-12 col-lg-6">
					<Field
						as={Timepicker}
						id={`edit-${name}.startTime`}
						name={`${name}.startTime`}
						hourLabel="Startuur"
						minuteLabel=""
						onChange={(value: string) => onChange('startTime', value)}
						required
					/>
					<ErrorMessage name={`${name}.startTime`} />
				</div>
				<div className="col-xs-12 col-lg-6">
					<Field
						as={Timepicker}
						id={`edit-${name}.endTime`}
						name={`${name}.endTime`}
						hourLabel="Einduur"
						minuteLabel=""
						onChange={(value: string) => onChange('endTime', value)}
						value={value.endTime}
					/>
					<ErrorMessage name={`${name}.endTime`} />
				</div>
			</div>
			{options.map((option, index) => {
				return (
					<div className="row u-margin-bottom" key={index}>
						<div className="col-xs-12">
							<TextField
								id={option.value.value}
								name={option.value.value}
								label={option.value.label}
								value={value[option.value.value]}
								onChange={(event: ChangeEvent<any>) =>
									onChange(option.value.value, event.target.value)
								}
							/>
							<ErrorMessage name={option.value.value} />
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default TimePeriodField;
