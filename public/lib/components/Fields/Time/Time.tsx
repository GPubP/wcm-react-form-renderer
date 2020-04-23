import { Select } from '@acpaas-ui/react-components/packages/form';
import React, { ChangeEvent } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry/fieldRegistry.types';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

import { HOURS, MINUTES } from './Time.const';
import { getFormattedTime, mapToObject } from './Time.helpers';

const Time: React.FC<InputFieldProps> = ({
	fieldProps,
	fieldHelperProps,
	fieldSchema,
}: InputFieldProps) => {
	const config = fieldSchema.config || {};
	const { field } = fieldProps;

	const handleSetHours = (prevDate: Date, hours: string): void => {
		const newDate = prevDate;
		newDate.setHours(Number(hours));
		fieldHelperProps.setValue(newDate.toISOString());
	};

	const handleSetMinutes = (prevDate: Date, minutes: string): void => {
		const newDate = prevDate;
		newDate.setMinutes(Number(minutes));
		fieldHelperProps.setValue(newDate.toISOString());
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const { id, value } = event.target;

		const date = field.value ? new Date(field.value) : new Date();

		switch (id) {
			case `${fieldSchema.name}-hours`:
				handleSetHours(date, value);
				break;
			case `${fieldSchema.name}-minutes`:
				handleSetMinutes(date, value);
				break;
		}
	};

	return (
		<>
			<div className="a-timepicker">
				<Select
					id={`${fieldSchema.name}-hours`}
					required={config.required}
					label="Uren"
					options={mapToObject(HOURS)}
					value={getFormattedTime(field.value || null)?.hours}
					onChange={handleChange}
				/>
				<span className="a-timepicker__separator">:</span>
				<Select
					id={`${fieldSchema.name}-minutes`}
					required={config.required}
					label="Minuten"
					options={mapToObject(MINUTES)}
					value={getFormattedTime(field.value || null)?.minutes}
					onChange={handleChange}
				/>
			</div>
			<ErrorMessage name={field.name} />
		</>
	);
};

export default Time;
