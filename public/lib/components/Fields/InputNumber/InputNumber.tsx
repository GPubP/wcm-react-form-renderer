import { TextField } from '@acpaas-ui/react-components';
import { getIn } from 'formik';
import { pick } from 'ramda';
import React, { useMemo } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';

const InputNumber: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema }: InputFieldProps) => {
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
					// HTML PROPS NUMBER FIELD
					'min',
					'max',
					// COMPONENT PROPS
					'description',
					'required',
					'placeholder',
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
		<>
			<TextField
				id={fieldSchema.name}
				state={state}
				label={fieldSchema.label}
				type="number"
				{...field}
				{...fieldConfigProps}
			/>
			<ErrorMessage name={field.name} />
		</>
	);
};

export default InputNumber;
