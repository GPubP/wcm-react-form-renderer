import { Datepicker as AuiDatepicker } from '@acpaas-ui/react-components';
import { getIn } from 'formik';
import { pick } from 'ramda';
import React, { useMemo } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';

const Datepicker: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema }: InputFieldProps) => {
	const config = fieldSchema.config || {};
	const { field, form } = fieldProps;

	const touch = getIn(form.touched, field.name);
	const error = getIn(form.errors, field.name);

	const state = !!error && !!touch ? 'error' : '';

	// Pick only the known properties from the config object
	const fieldConfigProps = useMemo(
		() =>
			pick(
				[
					'required',
					'mask',
					'format',
					'locale',
					'activeDate',
					'selectedDates',
					'open',
					'autoClose',
					'disabled',
					'readOnly',
					'noWeekends',
					'minDate',
					'description',
					'maxDate',
					'qa',
					'size',
				],
				config
			),
		[config]
	);

	return (
		<>
			<AuiDatepicker
				id={fieldSchema.name}
				state={state}
				label={fieldSchema.label}
				onChange={(e: string) => {
					const event = {
						target: {
							id: fieldSchema.name,
							value: e,
						},
					};

					field.onChange(event);
				}}
				activeDate={field.value}
				{...fieldConfigProps}
			/>
			{!config.skipErrorMessage ? <ErrorMessage name={field.name} /> : null}
		</>
	);
};

export default Datepicker;
