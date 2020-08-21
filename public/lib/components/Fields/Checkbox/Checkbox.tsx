import { Checkbox } from '@acpaas-ui/react-components';
import { omit } from 'ramda';
import React, { FC } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';

const InputCheckbox: FC<InputFieldProps> = ({ fieldSchema, fieldProps, fieldHelperProps }) => {
	const { config = {}, name, label } = fieldSchema;
	const { field } = fieldProps;
	return (
		<>
			<Checkbox
				id={name}
				name={name}
				label={label}
				{...omit(['multiLanguage', 'min', 'max'])(config)}
				checked={field.value}
				onChange={() => fieldHelperProps.setValue(!field.value)}
			/>
			<ErrorMessage name={field.name} />
		</>
	);
};

export default InputCheckbox;