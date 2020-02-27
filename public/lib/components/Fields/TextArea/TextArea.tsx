import { Textarea } from '@acpaas-ui/react-components/packages/form';
import { ErrorMessage } from 'formik';
import React from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry/fieldRegistry.types';
import RendererErrorMessage from '../../ErrorMessage/ErrorMessage';

const InputTextarea: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema }: InputFieldProps) => {
	const config = fieldSchema.config || {};
	const { field } = fieldProps;

	return (
		<>
			<Textarea
				required={fieldSchema.config?.required}
				label={fieldSchema.label}
				{...config}
				{...fieldProps.field}
			/>
			<ErrorMessage component={RendererErrorMessage} name={field.name} />
		</>
	);
};

export default InputTextarea;
