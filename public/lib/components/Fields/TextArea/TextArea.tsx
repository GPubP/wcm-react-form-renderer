import React from 'react';
import { Textarea } from '@acpaas-ui/react-components';

import { InputFieldProps } from '../../../services/fieldrregistry/fieldRegistry.types';

const InputTextarea: React.FC<InputFieldProps> = ({
	fieldProps,
	fieldSchema,
}) => {

	const config = fieldSchema.config || {};

	return (
		<Textarea
			label={fieldSchema.label}
			{...config}
			{...fieldProps.field}
		/>
	)
}

export default InputTextarea;

