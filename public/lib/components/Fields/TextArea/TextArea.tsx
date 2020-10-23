import { Textarea } from '@acpaas-ui/react-components/packages/form';
import { omit } from 'ramda';
import React from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';

const InputTextarea: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema }: InputFieldProps) => {
	const config = fieldSchema.config || {};
	const { field } = fieldProps;

	return (
		<div className="a-input">
			<Textarea
				id={fieldSchema.name}
				label={fieldSchema.label}
				{...omit(['multiLanguage', 'min', 'max'])(config)}
				{...field}
			/>
			{config.description && <small>{config.description}</small>}
			<ErrorMessage name={field.name} />
		</div>
	);
};

export default InputTextarea;
