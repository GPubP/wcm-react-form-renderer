import { Checkbox } from '@acpaas-ui/react-components';
import { pick } from 'ramda';
import React, { FC, useMemo } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';

const InputCheckbox: FC<InputFieldProps> = ({ fieldSchema, fieldProps, fieldHelperProps }) => {
	const { config = {}, name, label } = fieldSchema;
	const { field } = fieldProps;

	// Pick only the known properties from the config object
	const fieldConfigProps = useMemo(
		() => pick(['required', 'disabled', 'className', 'qa'], config),
		[config]
	);

	return (
		<div className="a-input">
			<Checkbox
				id={name}
				name={name}
				label={label}
				checked={field.value}
				onChange={() => fieldHelperProps.setValue(!field.value)}
				{...fieldConfigProps}
			/>
			{config.description && <small>{config.description}</small>}
			<ErrorMessage name={field.name} />
		</div>
	);
};

export default InputCheckbox;
