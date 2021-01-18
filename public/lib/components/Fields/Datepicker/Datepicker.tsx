import { Datepicker as AuiDatepicker } from '@acpaas-ui/react-components';
import { getIn } from 'formik';
import { omit } from 'ramda';
import React from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';

const Datepicker: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema }: InputFieldProps) => {
	const config = fieldSchema.config || {};
	const { field, form } = fieldProps;

	const touch = getIn(form.touched, field.name);
	const error = getIn(form.errors, field.name);

	const state = !!error && !!touch ? 'error' : '';

	return (
		<>
			<AuiDatepicker
				id={fieldSchema.name}
				state={state}
				label={fieldSchema.label}
				{...omit(['multiLanguage', 'min', 'max'])(config)}
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
			/>
			{!config.skipErrorMessage ? <ErrorMessage name={field.name} /> : null}
		</>
	);
};

export default Datepicker;
