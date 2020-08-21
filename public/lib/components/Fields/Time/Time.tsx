import { Timepicker } from '@acpaas-ui/react-editorial-components';
import React from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry/fieldRegistry.types';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

const Time: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema }) => {
	const { field } = fieldProps;

	/**
	 * Render
	 */
	return (
		<>
			{fieldSchema.label && <h6 className="u-margin-bottom-xs">{fieldSchema.label}</h6>}
			<Timepicker
				id={fieldSchema.name}
				onChange={(e: string) => {
					const event = {
						target: {
							id: fieldSchema.name,
							value: e,
						},
					};

					field.onChange(event);
				}}
				value={field.value}
				{...fieldSchema.config}
			/>
			<ErrorMessage name={field.name} />
		</>
	);
};

export default Time;