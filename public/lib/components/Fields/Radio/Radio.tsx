import { RadioGroup } from '@acpaas-ui/react-components';
import { pick } from 'ramda';
import React, { FC, useMemo } from 'react';

import { useSelectFirstOptionWhenHidden } from '../../../hooks';
import { InputFieldProps } from '../../../services/fieldRegistry';
import { filterAllowedOptions } from '../../../utils';
import { ErrorMessage } from '../../ErrorMessage';

const InputRadio: FC<InputFieldProps> = ({
	fieldProps,
	fieldSchema,
	fieldHelperProps,
}: InputFieldProps) => {
	const {
		name,
		label,
		config = {
			options: [],
			hideWhenOnlyOneAllowedOption: false,
		},
	} = fieldSchema;
	const { field } = fieldProps;

	/**
	 * Hooks
	 */
	const options = useMemo(
		() => filterAllowedOptions(config.options, config.allowedOptions, field.name),
		[config.options, config.allowedOptions, field.name]
	);
	const showField = useSelectFirstOptionWhenHidden(config, field.value, fieldHelperProps);

	const fieldConfigProps = useMemo(
		() => pick(['required', 'disabled', 'className', 'description', 'inline', 'qa'], config),
		[config]
	);

	return (
		<>
			{showField && (
				<>
					<RadioGroup
						id={name}
						label={label}
						options={options}
						{...field}
						{...fieldConfigProps}
					/>
					<ErrorMessage name={field.name} />
				</>
			)}
		</>
	);
};

export default InputRadio;
