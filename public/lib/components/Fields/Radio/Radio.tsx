import { RadioGroup } from '@acpaas-ui/react-components';
import { omit } from 'ramda';
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

	return (
		<>
			{showField && (
				<>
					<RadioGroup
						id={name}
						label={label}
						options={options}
						{...omit(['multiLanguage', 'min', 'max', 'options'])(config)}
						{...field}
					/>
					<ErrorMessage name={field.name} />
				</>
			)}
		</>
	);
};

export default InputRadio;
