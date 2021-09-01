import { Datepicker, TextField } from '@acpaas-ui/react-components';
import { Timepicker } from '@acpaas-ui/react-editorial-components';
import { Field } from 'formik';
import React, { ChangeEvent, useMemo } from 'react';

import { ErrorMessage } from '../../../ErrorMessage';

import { TimePeriodFieldProps } from './TimePeriodField.types';

const TimePeriodField: React.FC<TimePeriodFieldProps> = ({
	name,
	value,
	onChange,
	options = [],
}) => {
	const startDate = useMemo(() => {
		if (!value.startDate) {
			return;
		}

		if (
			new RegExp('^(0[1-9]|1[0-9]|2[0-9]|3[0-1])/(0[1-9]|1[0-2])/20[0-9][0-9]$').test(
				value.startDate
			)
		) {
			return value.startDate;
		}

		return new Intl.DateTimeFormat('en-GB').format(new Date(value.startDate));
	}, [value.startDate]);

	const onChangeDate = (value: string): void => {
		const splitDate = value.split('/');
		const newDateString = new Date(
			Date.UTC(parseInt(splitDate[2]), parseInt(splitDate[1]) - 1, parseInt(splitDate[0]))
		).toISOString();

		onChange('startDate', newDateString);
	};

	return (
		<div className="a-input">
			<div className="row">
				<div className="col-xs-12 u-margin-bottom">
					<Field
						as={Datepicker}
						id={`edit-${name}.startDate`}
						name={`${name}.startDate`}
						label="Datum"
						activeDate={startDate}
						onChange={(value: string) => onChangeDate(value)}
						required
					/>
					<ErrorMessage name={`${name}.startDate`} />
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12 col-lg-6 u-margin-bottom">
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
				<div className="col-xs-12 col-lg-6 u-margin-bottom">
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
								id={`edit-${name}.${option.value.value}.${index}`}
								name={`edit-${name}.${option.value.value}.${index}`}
								label={option.value.label}
								value={value[option.value.value]}
								onChange={(event: ChangeEvent<any>) =>
									onChange(option.value.value, event.target.value)
								}
							/>
							<ErrorMessage name={`edit-${name}.${option.value.value}.${index}`} />
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default TimePeriodField;
