import { TextField } from '@acpaas-ui/react-components';
import { getIn } from 'formik';
import { pick } from 'ramda';
import React, { useMemo } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';
import { FormRendererFieldTitle } from '../../FormRendererFieldTitle';
import { DEFAULT_FIELD_CONFIG_PROPS } from '../Fields.const';

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
					...DEFAULT_FIELD_CONFIG_PROPS,
					'description',
					/**
					 * We temporarily disable the min & max properties since they're handled by the validationSchema on the form itself.
					 * The current `min` & `max` in `config` come from the generalConfig in regards field repeating,
					 * not actual min & max of the num field.
					 */
					// 'min',
					// 'max',
					'size',
					'placeholder',
					'iconright',
					'iconleft',
					'addonright',
					'addonleft',
					'loading',
					'errorDescription',
				],
				config
			),
		[config]
	);

	return (
		<>
			<FormRendererFieldTitle isRequired={config.required} className="u-margin-bottom-xs">
				{fieldSchema.label}
			</FormRendererFieldTitle>
			<TextField
				id={fieldSchema.name}
				state={state}
				type="number"
				{...field}
				{...fieldConfigProps}
			/>
			<ErrorMessage name={field.name} />
		</>
	);
};

export default InputNumber;
