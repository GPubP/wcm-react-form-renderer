import { Textarea } from '@acpaas-ui/react-components/packages/form';
import React from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry/fieldRegistry.types';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

const InputTextarea: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema }: InputFieldProps) => {
	const config = fieldSchema.config || {};
	const { field } = fieldProps;

	return (
		<>
			<Textarea
				id={fieldSchema.name}
				required={fieldSchema.config?.required}
				label={fieldSchema.label}
				{...config}
				{...fieldProps.field}
			/>
			<ErrorMessage name={field.name} />
		</>
	);
};

export default InputTextarea;
