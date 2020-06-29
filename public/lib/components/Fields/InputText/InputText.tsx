import { TextField } from '@acpaas-ui/react-components/packages/form';
import { getIn } from 'formik';
import React from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry/fieldRegistry.types';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

const InputText: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema }: InputFieldProps) => {
	const config = fieldSchema.config || {};
	const { field, form } = fieldProps;

	const touch = getIn(form.touched, field.name);
	const error = getIn(form.errors, field.name);

	const state = !!error && !!touch ? 'error' : '';

	return (
		<>
			<TextField
				id={fieldSchema.name}
				state={state}
				label={fieldSchema.label}
				{...config}
				{...fieldProps.field}
			/>
			<ErrorMessage name={field.name} />
		</>
	);
};

export default InputText;
