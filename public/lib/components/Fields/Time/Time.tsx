import { Timepicker } from '@acpaas-ui/react-editorial-components';
import React, { ChangeEvent } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry/fieldRegistry.types';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

import { HOURS, MINUTES } from './Time.const';

const Time: React.FC<InputFieldProps> = ({
	fieldProps,
	fieldHelperProps,
	fieldSchema,
}: InputFieldProps) => {
	const { field } = fieldProps;

	/**
	 * Methods
	 */
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

	/**
	 * Render
	 */
	return (
		<>
			<label>{fieldSchema.label} </label>
			<Timepicker
				id={fieldSchema.name}
				hourOptions={HOURS}
				minuteOptions={MINUTES}
				onChange={handleChange}
			/>
			<ErrorMessage name={field.name} />
		</>
	);
};

export default Time;
