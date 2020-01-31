import React from 'react';
import { Select } from '@acpaas-ui/react-components';

import { InputFieldProps } from '../../../services/fieldregistry/fieldRegistry.types';

const InputSelect: React.FC<InputFieldProps> = ({
	fieldProps,
	fieldSchema,
}) => {

	const config = fieldSchema.config || {};

	return (
		<Select
			label={fieldSchema.label}
			{...config}
			{...fieldProps.field}
		/>
	)
}

export default InputSelect;

