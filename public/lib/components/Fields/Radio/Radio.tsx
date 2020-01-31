import React from 'react';
import { RadioGroup } from '@acpaas-ui/react-components';

import { InputFieldProps } from '../../../services/fieldregistry/fieldRegistry.types';

const Radio: React.FC<InputFieldProps> = ({
	fieldProps,
	fieldSchema,
}) => {

	const config = fieldSchema.config || {};

	return (
		<RadioGroup
			label={fieldSchema.label}
			{...config}
			{...fieldProps.field}
		/>
	)
}

export default Radio;

