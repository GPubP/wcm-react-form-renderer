import { Timepicker } from '@acpaas-ui/react-editorial-components';
import React from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry/fieldRegistry.types';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

const Time: React.FC<InputFieldProps> = ({
	fieldProps,
	fieldHelperProps,
	fieldSchema,
}: InputFieldProps) => {
	const { field } = fieldProps;

	const handleChange = (event: string): void => {
		fieldHelperProps.setValue(event);
	};

	/**
	 * Render
	 */
	return (
		<>
			<label className="a-input__label">{fieldSchema.label}</label>
			<Timepicker
				id={fieldSchema.name}
				onChange={handleChange}
				value={field.value}
				required={fieldSchema.config?.required}
			/>
			<ErrorMessage name={field.name} />
		</>
	);
};

export default Time;
