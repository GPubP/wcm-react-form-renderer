import { Textarea } from '@acpaas-ui/react-components';
import { pick } from 'ramda';
import React, { useMemo } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';
import { DEFAULT_FIELD_CONFIG_PROPS } from '../Fields.const';

const InputTextarea: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema }: InputFieldProps) => {
	const config = fieldSchema.config || {};
	const { field } = fieldProps;

	const fieldConfigProps = useMemo(
		() => pick([...DEFAULT_FIELD_CONFIG_PROPS, 'placeholder', 'size'], config),
		[config]
	);

	return (
		<div className="a-input">
			<Textarea
				id={fieldSchema.name}
				label={fieldSchema.label}
				{...field}
				{...fieldConfigProps}
			/>
			{config.description && <small>{config.description}</small>}
			<ErrorMessage name={field.name} />
		</div>
	);
};

export default InputTextarea;
