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

	const handleChange = (inputValue: string, type: string): void => {
		const { value } = field;
		const prevDate = value === '' ? new Date() : new Date(value);

		switch (type) {
			case 'date':
				field.onChange({
					target: {
						id: fieldSchema.name,
						value: updateDate(prevDate, inputValue),
					},
				});
				break;
			case 'time':
				field.onChange({
					target: {
						id: fieldSchema.name,
						value: updateTime(prevDate, inputValue),
					},
				});
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
				<div className="col-xs-12 col-md-6 u-margin-bottom-xs">
					<Datepicker
						fieldProps={{
							...fieldProps,
							field: {
								...fieldProps.field,
								value: useMemo(() => getDate(field.value), [field.value]),
								onChange: (event: ChangeEvent<any>) =>
									handleChange(event.target.value, 'date'),
							},
						}}
						fieldSchema={{
							...fieldSchema,
							config: {
								...config,
								description: 'Geef een datum in',
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
								value: useMemo(() => getTime(field.value), [field.value]),
								onChange: (event: ChangeEvent<any>) =>
									handleChange(event.target.value, 'time'),
							},
						}}
						fieldSchema={{
							...fieldSchema,
							config: omit(['description'], fieldSchema.config),
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
