import React from 'react';
import { TextField } from '@acpaas-ui/react-components';

import { InputFieldProps } from '../../../services/fieldregistry/fieldRegistry.types';

const InputText: React.FC<InputFieldProps> = ({
	fieldProps,
	fieldSchema,
}) => {
	return (
		<TextField
			label={fieldSchema.label}
			{...fieldProps.field}
		/>
	)
}

export default InputText;

