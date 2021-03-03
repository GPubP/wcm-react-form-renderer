// Temp ref to specific form file until acpaas-ui has been fixed
import { TelephoneNumber as AUITelephoneNumber } from '@acpaas-ui/react-components';
import { getIn } from 'formik';
import { pick } from 'ramda';
import React, { useMemo } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';
import { DEFAULT_FIELD_CONFIG_PROPS } from '../Fields.const';

import { TelephoneNumberOutput } from './TelephoneNumber.types';

const TelephoneNumber: React.FC<InputFieldProps> = ({
	fieldProps,
	fieldSchema,
	fieldHelperProps,
}) => {
	const config = fieldSchema.config || {};
	const { field, form } = fieldProps;
	const { setValue } = fieldHelperProps;

	const touch = getIn(form.touched, field.name);
	const error = getIn(form.errors, field.name);

	const state = !!error && !!touch ? 'error' : '';

	// Pick only the known properties from the config object
	const fieldConfigProps = useMemo(
		() =>
			pick(
				[
					...DEFAULT_FIELD_CONFIG_PROPS,
					'description',
					'size',
					'minLength',
					'maxLength',
					'pattern',
					'type',
					'placeholder',
					'mask',
					'iconright',
					'iconleft',
					'loading',
					'errorDescription',
				],
				config
			),
		[config]
	);

	const changeHandler = (newValue: TelephoneNumberOutput): void => setValue(newValue);

	return (
		<div className={config.fieldClassName}>
			<AUITelephoneNumber
				id={fieldSchema.name}
				state={state}
				label={fieldSchema.label}
				onChange={changeHandler}
				value={field.value}
				{...fieldConfigProps}
			/>
			<ErrorMessage name={field.name} />
		</div>
	);
};

export default TelephoneNumber;
