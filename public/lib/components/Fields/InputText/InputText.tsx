import { TextField } from '@acpaas-ui/react-components';
import { getIn } from 'formik';
import { pick } from 'ramda';
import React, { useEffect, useMemo } from 'react';

import { useFieldRendererContext } from '../../../hooks';
import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';

const InputText: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema }: InputFieldProps) => {
	const config = fieldSchema.config || {};
	const { field, form } = fieldProps;

	const touch = getIn(form.touched, field.name);
	const error = getIn(form.errors, field.name);

	const state = !!error && !!touch ? 'error' : '';
	const showField = config.required || !config.hideWhenNotRequired;
	const { renderContext, setWrapperClass } = useFieldRendererContext();

	// Pick only the known properties from the config object
	const fieldConfigProps = useMemo(
		() =>
			pick(
				[
					'required',
					'disabled',
					'className',
					'description',
					'size',
					'minLength',
					'maxLength',
					'pattern',
					'min',
					'max',
					'type',
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

	useEffect(() => {
		if (!showField && renderContext.wrapperClass && setWrapperClass) {
			setWrapperClass('');
		}
	}, [renderContext.wrapperClass, setWrapperClass, showField]);

	if (!showField) {
		return null;
	}

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
