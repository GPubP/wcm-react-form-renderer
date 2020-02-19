import { Select } from '@acpaas-ui/react-components/packages/form';
import React from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry/fieldRegistry.types';

const InputSelect: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema }: InputFieldProps) => {
	const config = fieldSchema.config || {};

	return <Select label={fieldSchema.label} {...config} {...fieldProps.field} />;
};

export default InputSelect;
