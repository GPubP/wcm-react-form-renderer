import { Timepicker } from '@acpaas-ui/react-editorial-components';
import { pick } from 'ramda';
import React, { useMemo } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry/fieldRegistry.types';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

const Time: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema }) => {
	const { config = {}, label = '' } = fieldSchema;
	const { field } = fieldProps;
	const trimmedLabel = label?.trim();

	// Pick only the known properties from the config object
	const fieldConfigProps = useMemo(
		() =>
			pick(
				[
					'required',
					'disabled',
					'className',
					'hourLabel',
					'minuteLabel',
					'secondLabel',
					'millisecondLabel',
					'hourPlaceholder',
					'minutePlaceholder',
					'secondPlaceholder',
					'millisecondPlaceholder',
					'hourStep',
					'minuteStep',
					'secondStep',
					'millisecondStep',
				],
				config
			),
		[config]
	);

	/**
	 * Render
	 */
	return (
		<>
			{trimmedLabel && trimmedLabel !== '' && (
				<h6 className="u-margin-bottom">{fieldSchema.label}</h6>
			)}
			{config.description && <p className="u-margin-bottom">{config.description}</p>}
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
				key={field.value}
				{...fieldConfigProps}
			/>
			{!config.skipErrorMessage ? <ErrorMessage name={field.name} /> : null}
		</>
	);
};

export default Time;
