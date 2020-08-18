import { RadioGroup } from '@acpaas-ui/react-components/packages/form';
import { omit } from 'ramda';
import React, { FC, useMemo } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { filterAllowedOptions } from '../../../utils';
import { ErrorMessage } from '../../ErrorMessage';

const InputRadio: FC<InputFieldProps> = ({ fieldProps, fieldSchema }: InputFieldProps) => {
	const {
		name,
		label,
		config = {
			options: [],
			allowedOptions: [],
		},
	} = fieldSchema;
	const { field } = fieldProps;
	const options = useMemo(() => filterAllowedOptions(config.options, config.allowedOptions), [
		config.options,
		config.allowedOptions,
	]);

	return (
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
	);
};

export default InputRadio;
