import { omit } from 'ramda';
import React, { ChangeEvent, useMemo } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry/fieldRegistry.types';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Datepicker from '../Datepicker/Datepicker';
import Time from '../Time/Time';

import { getDate, getTime, updateDate, updateTime } from './DateTime.helpers';

const DateTimepicker: React.FC<InputFieldProps> = ({
	fieldProps,
	fieldSchema,
	fieldHelperProps,
}) => {
	const config = fieldSchema.config || {};
	const { field } = fieldProps;
	const { setValue } = fieldHelperProps;
	const dateValue = useMemo(() => getDate(field.value), [field.value]);
	const timeValue = useMemo(() => getTime(field.value), [field.value]);

	const handleChange = (inputValue: string, type: string): void => {
		const { value } = field;
		const prevDate = value === '' ? new Date() : new Date(value);

		switch (type) {
			case 'date':
				setValue(updateDate(prevDate, inputValue));
				break;
			case 'time':
				setValue(updateTime(prevDate, inputValue));
				break;
			default:
				break;
		}
	};

	return (
		<>
			{fieldSchema.label && <h6 className="u-margin-bottom">{fieldSchema.label}</h6>}
			{config.description && <p className="u-margin-bottom">{config.description}</p>}
			<div className="row">
				<div className="col-xs-12 col-md-6">
					<Datepicker
						fieldProps={
							{
								...fieldProps,
								field: {
									...field,
									value: dateValue,
									onChange: (event: ChangeEvent<any>) =>
										handleChange(event.target.value, 'date'),
								},
							} as any
						}
						fieldSchema={{
							...fieldSchema,
							config: {
								...config,
								description: 'Geef een datum in',
								skipErrorMessage: true,
							},
							label: fieldSchema.config?.dateLabel || 'Datum',
						}}
						fieldHelperProps={fieldHelperProps}
					/>
				</div>
				<div className="col-xs-12 col-md-6">
					<Time
						fieldProps={{
							...fieldProps,
							field: {
								...fieldProps.field,
								value: timeValue,
								onChange: (event: ChangeEvent<any>) =>
									handleChange(event.target.value, 'time'),
							},
						}}
						fieldSchema={{
							...fieldSchema,
							config: {
								...omit(['description'], fieldSchema.config),
								skipErrorMessage: true,
							},
							label: '',
						}}
						fieldHelperProps={fieldHelperProps}
					/>
				</div>
			</div>
			<ErrorMessage name={field.name} />
		</>
	);
};

export default DateTimepicker;
