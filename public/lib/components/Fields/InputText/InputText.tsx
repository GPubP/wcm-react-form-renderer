import { TextField } from '@acpaas-ui/react-components';
import { getIn } from 'formik';
import { omit } from 'ramda';
import React, { useEffect } from 'react';

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
				{...omit(['multiLanguage', 'min', 'max'])(config)}
				{...field}
			/>
			<ErrorMessage name={field.name} />
		</div>
	);
};

export default InputText;
