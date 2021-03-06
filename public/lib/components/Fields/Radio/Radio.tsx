import { RadioGroup } from '@acpaas-ui/react-components';
import { pick } from 'ramda';
import React, { FC, useMemo } from 'react';

import { useSelectFirstOptionWhenHidden } from '../../../hooks';
import { InputFieldProps } from '../../../services/fieldRegistry';
import { filterAllowedOptions } from '../../../utils';
import { ErrorMessage } from '../../ErrorMessage';
import { FormRendererFieldTitle } from '../../FormRendererFieldTitle';
import { DEFAULT_FIELD_CONFIG_PROPS } from '../Fields.const';

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
		() => pick([...DEFAULT_FIELD_CONFIG_PROPS, 'description', 'inline'], config),
		[config]
	);

	return (
		<>
			{showField && (
				<>
					<FormRendererFieldTitle
						isRequired={config.required}
						isSynced={config.synced}
						className="u-margin-bottom-xs"
					>
						{label}
					</FormRendererFieldTitle>
					<RadioGroup id={name} options={options} {...field} {...fieldConfigProps} />
					<ErrorMessage name={field.name} />
				</>
			)}
		</>
	);
};

export default InputRadio;
