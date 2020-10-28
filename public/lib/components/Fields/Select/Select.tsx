import { Select } from '@acpaas-ui/react-components/packages/form';
import { omit } from 'ramda';
import React, { FC, useMemo } from 'react';

import { useSelectFirstOptionWhenHidden } from '../../../hooks';
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

	/**
	 * Hooks
	 */
	const options = useMemo(() => filterAllowedOptions(config.options, config.allowedOptions), [
		config.options,
		config.allowedOptions,
	]);
	const showField = useSelectFirstOptionWhenHidden(config, field.value, fieldHelperProps);

	return (
		<>
			{showField && (
				<div className="a-input">
					<Select
						id={name}
						label={label}
						options={options}
						value={value}
						{...omit(['multiLanguage', 'min', 'max', 'options'])(config)}
						{...omit(['value'])(field)}
					/>
					{config.description && <small>{config.description}</small>}
					<ErrorMessage name={field.name} />
				</div>
			)}
		</>
	);
};

export default InputSelect;
