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
			<div className="a-timepicker u-margin-top-xs">
				<Select
					id={`${fieldSchema.name}-hours`}
					required={config.required}
					label={config.hours?.label || 'Uren'}
					options={mapToObject(HOURS)}
					placeholder={
						getFormattedTime(field.value || null)?.hours ||
						config.hours?.placeholder ||
						'hh'
					}
					onChange={handleChange}
				/>
				<span className="a-timepicker__separator">:</span>
				<Select
					id={`${fieldSchema.name}-minutes`}
					required={config.required}
					label={config.minutes?.label || 'Minuten'}
					options={mapToObject(MINUTES)}
					placeholder={
						getFormattedTime(field.value || null)?.minutes ||
						config.minutes?.placeholder ||
						'mm'
					}
					onChange={handleChange}
				/>
			</div>
			<ErrorMessage name={field.name} />
		</>
	);
};

export default Time;
