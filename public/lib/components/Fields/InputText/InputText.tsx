import { TextField } from '@acpaas-ui/react-components';
import { getIn } from 'formik';
import { pick } from 'ramda';
import React, { useMemo } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';

const InputText: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema }: InputFieldProps) => {
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
					// ALLOWED HTML PROPS
					'size',
					'minLength',
					'maxLength',
					'pattern',
					'min',
					'max',
					'required',
					'type',
					// COMPONENT PROPS
					'description',
					'placeholder',
					'mask',
					'iconright',
					'iconleft',
					'loading',
					'qa',
					'errorDescription',
				],
				config
			),
		[config]
	);

	return (
		<div className={config.fieldClassName}>
			<TextField
				id={fieldSchema.name}
				state={state}
				label={fieldSchema.label}
				{...field}
				{...fieldConfigProps}
			/>
			<ErrorMessage name={field.name} />
		</div>
	);
};

export default InputText;
