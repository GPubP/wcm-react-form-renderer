import { Select } from '@acpaas-ui/react-components/packages/form';
import { omit } from 'ramda';
import React from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';

const InputSelect: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema }: InputFieldProps) => {
	const config = fieldSchema.config || {};
	const { field } = fieldProps;

	return (
		<>
			<Select
				id={fieldSchema.name}
				label={fieldSchema.label}
				{...omit(['multiLanguage', 'min', 'max'])(config)}
				{...field}
			/>
			<ErrorMessage name={field.name} />
		</>
	);
};

export default InputSelect;
