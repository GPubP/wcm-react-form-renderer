import { TextField } from '@acpaas-ui/react-components/packages/form';
import { ErrorMessage, getIn } from 'formik';
import React from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry/fieldRegistry.types';
import RendererErrorMessage from '../../ErrorMessage/ErrorMessage';

const InputText: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema }: InputFieldProps) => {
	const config = fieldSchema.config || {};
	const { field, form } = fieldProps;

	const touch = getIn(form.touched, field.name);
	const error = getIn(form.errors, field.name);

	const state = !!error && !!touch ? 'error' : '';

	return (
		<>
			<TextField
				state={state}
				required={fieldSchema.config?.required}
				label={fieldSchema.label}
				{...config}
				{...fieldProps.field}
			/>
			<ErrorMessage component={RendererErrorMessage} name={field.name} />
		</>
	);
};

export default InputText;
