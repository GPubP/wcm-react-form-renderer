import { TextField } from '@acpaas-ui/react-components/packages/form';
import { getIn } from 'formik';
import { omit } from 'ramda';
import React from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry/fieldRegistry.types';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

const InputNumber: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema }: InputFieldProps) => {
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
				type="number"
				{...omit(['multiLanguage', 'min', 'max'])(config)}
				{...field}
			/>
			<ErrorMessage name={field.name} />
		</>
	);
};

export default InputNumber;
