import { TextField } from '@acpaas-ui/react-components';
import { getIn } from 'formik';
import { omit } from 'ramda';
import React from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';

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
				min={config.minimum}
				max={config.maximum}
				{...omit(['multiLanguage', 'min', 'max'])(config)}
				{...field}
			/>
			<ErrorMessage name={field.name} />
		</>
	);
};

export default InputNumber;
