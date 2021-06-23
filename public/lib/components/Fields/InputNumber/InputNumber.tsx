import { TextField } from '@acpaas-ui/react-components';
import { getIn } from 'formik';
import { pick } from 'ramda';
import React, { useMemo } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';
import { DEFAULT_FIELD_CONFIG_PROPS } from '../Fields.const';

const InputNumber: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema, validationProperty }: InputFieldProps) => {
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
					...DEFAULT_FIELD_CONFIG_PROPS,
					'description',
					'min',
					'max',
					'size',
					'placeholder',
					'iconright',
					'iconleft',
					'addonright',
					'addonleft',
					'loading',
					'errorDescription',
				],
				{
					...config,
					/**
					 * We want to remap the min & max keys because they are used to repeat the field if set in a parent component
					 * minimum & maximum are the _actual_ min & max that come from the content type validation
					 */
					min: validationProperty?.minimum ?? null,
					max: validationProperty?.maximum ?? null
				}
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
