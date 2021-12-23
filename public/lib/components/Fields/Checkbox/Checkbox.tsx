import { Checkbox } from '@acpaas-ui/react-components';
import { pick } from 'ramda';
import React, { FC, useMemo } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';
import { FormRendererFieldTitle } from '../../FormRendererFieldTitle';
import { DEFAULT_FIELD_CONFIG_PROPS } from '../Fields.const';

const InputCheckbox: FC<InputFieldProps> = ({ fieldSchema, fieldProps, fieldHelperProps }) => {
	const { config = {}, name, label } = fieldSchema;
	const { field } = fieldProps;

	// Pick only the known properties from the config object
	const fieldConfigProps = useMemo(() => pick(DEFAULT_FIELD_CONFIG_PROPS, config), [config]);

	return (
		<div className="a-input">
			<FormRendererFieldTitle isRequired={config.required} className="u-margin-bottom-xs">
				{label}
			</FormRendererFieldTitle>
			<Checkbox
				id={name}
				name={name}
				checked={field.value}
				onChange={() => fieldHelperProps.setValue(!field.value)}
				{...fieldConfigProps}
			/>
			{config.description && <small>{config.description}</small>}
			<ErrorMessage name={field.name} />
		</div>
	);
};

export default InputCheckbox;
