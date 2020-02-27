import { RadioGroup } from '@acpaas-ui/react-components/packages/form';
import { ErrorMessage } from 'formik';
import React from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry/fieldRegistry.types';
import RendererErrorMessage from '../../ErrorMessage/ErrorMessage';

const Radio: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema }: InputFieldProps) => {
	const config = fieldSchema.config || {};
	const { field } = fieldProps;

	return (
		<>
			<RadioGroup
				required={fieldSchema.config?.required}
				label={fieldSchema.label}
				{...config}
				{...fieldProps.field}
			/>
			<ErrorMessage component={RendererErrorMessage} name={field.name} />
		</>
	);
};

export default Radio;
