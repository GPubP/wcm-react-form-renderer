import React from 'react';
import { TextField } from '@acpaas-ui/react-components/packages/form';

import { InputFieldProps } from '../../../services/fieldRegistry/fieldRegistry.types';

const InputText: React.FC<InputFieldProps> = ({
	fieldProps,
	fieldSchema,
}) => {

	const config = fieldSchema.config || {};

	return (
		<TextField
			label={fieldSchema.label}
			{...config}
			{...fieldProps.field}
		/>
	)
}

export default InputText;

