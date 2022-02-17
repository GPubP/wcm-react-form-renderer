import { TextField } from '@acpaas-ui/react-components';
import { getIn } from 'formik';
import { pick } from 'ramda';
import React, { useEffect, useMemo } from 'react';

import { useFieldRendererContext } from '../../../hooks';
import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';
import { FormRendererFieldInfo } from '../../FormRendererFieldInfo';
import { FormRendererFieldTitle } from '../../FormRendererFieldTitle';
import { DEFAULT_FIELD_CONFIG_PROPS } from '../Fields.const';

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
					...DEFAULT_FIELD_CONFIG_PROPS,
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
					'addonright',
					'addonleft',
					'loading',
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
		<>
			<FormRendererFieldTitle isRequired={config.required} className="u-margin-bottom-xs">
				{fieldSchema.label}
			</FormRendererFieldTitle>
			<TextField id={fieldSchema.name} state={state} {...field} {...fieldConfigProps} />
			<ErrorMessage name={field.name} />
			{config.fieldInfo && <FormRendererFieldInfo content={config.fieldInfo} />}
		</>
	);
};

export default InputText;
