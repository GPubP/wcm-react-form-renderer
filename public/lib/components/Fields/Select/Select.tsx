import { Select } from '@acpaas-ui/react-components/packages/form';
import { omit } from 'ramda';
import React, { FC, useEffect, useMemo } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { filterAllowedOptions } from '../../../utils';
import { ErrorMessage } from '../../ErrorMessage';

const InputSelect: FC<InputFieldProps> = ({
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
	const value = field.value !== '' ? field.value : undefined;
	const showField = !(
		config.hideWhenOnlyOneAllowedOption &&
		Array.isArray(config.allowedOptions) &&
		config.allowedOptions.length === 1
	);

	/**
	 * Hooks
	 */
	const options = useMemo(() => filterAllowedOptions(config.options, config.allowedOptions), [
		config.options,
		config.allowedOptions,
	]);

	useEffect(() => {
		// Automatically select the first allowed option when the select field is hidden from the user
		if (!showField && field.value !== config.allowedOptions[0]) {
			fieldHelperProps.setValue(config.allowedOptions[0]);
		}
	}, [config, config.allowedOptions, field.value, fieldHelperProps, showField]);

	return (
		<>
			{showField && (
				<>
					<Select
						id={name}
						label={label}
						options={options}
						value={value}
						{...omit(['multiLanguage', 'min', 'max', 'options'])(config)}
						{...omit(['value'])(field)}
					/>
					<ErrorMessage name={field.name} />
				</>
			)}
		</>
	);
};

export default InputSelect;
