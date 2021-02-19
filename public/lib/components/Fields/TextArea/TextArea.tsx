import { Textarea } from '@acpaas-ui/react-components';
import { pick } from 'ramda';
import React, { useMemo } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';

const InputTextarea: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema }: InputFieldProps) => {
	const config = fieldSchema.config || {};
	const { field } = fieldProps;

	const fieldConfigProps = useMemo(
		() => pick(['disabled', 'placeholder', 'className', 'required', 'size', 'qa'], config),
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
