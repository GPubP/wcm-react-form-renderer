import { Datepicker as AuiDatepicker } from '@acpaas-ui/react-components';
import { getIn } from 'formik';
import { pick } from 'ramda';
import React, { useEffect, useMemo, useState } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';
import { DEFAULT_FIELD_CONFIG_PROPS } from '../Fields.const';

import { ALLOWED_DATEPICKER_PROPS, isAUCompleteDateRegex } from './Datepicker.const';

const Datepicker: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema }: InputFieldProps) => {
	const config = fieldSchema.config || {};
	const { field, form } = fieldProps;

	const touch = getIn(form.touched, field.name);
	const error = getIn(form.errors, field.name);

	const state = !!error && !!touch ? 'error' : '';

	const [internalValue, setInternalValue] = useState(field.value);

	// Pick only the known properties from the config object
	const fieldConfigProps = useMemo(
		() => pick([...DEFAULT_FIELD_CONFIG_PROPS, ...ALLOWED_DATEPICKER_PROPS], config),
		[config]
	);

	useEffect(() => {
		if (!field.value) {
			return;
		}

		if (
			new RegExp('^(0[1-9]|1[0-9]|2[0-9]|3[0-1])/(0[1-9]|1[0-2])/20[0-9][0-9]$').test(
				field.value
			)
		) {
			setInternalValue(field.value);
		}

		setInternalValue(new Intl.DateTimeFormat('en-GB').format(new Date(field.value)));
	}, [field.value]);

	return (
		<>
			<AuiDatepicker
				id={fieldSchema.name}
				state={state}
				label={fieldSchema.label}
				// eslint-disable-next-line no-prototype-builtins
				mask={config.hasOwnProperty('mask') ? config.mask : '99/99/9999'}
				// eslint-disable-next-line no-prototype-builtins
				format={config.hasOwnProperty('format') ? config.format : 'DD/MM/YYYY'}
				onChange={(e: string) => {
					const splitDate = e.split('/');
					const event = {
						target: {
							id: fieldSchema.name,
							value: e,
						},
					};

					if (isAUCompleteDateRegex.test(e)) {
						(event.target.value = splitDate.reverse().join('-')), field.onChange(event);
					}

					if (!e.replace(/_|\//g, '')) {
						event.target.value = '';
						field.onChange(event);
					}

					setInternalValue(e);
				}}
				activeDate={internalValue}
				{...fieldConfigProps}
			/>
			{!config.skipErrorMessage ? <ErrorMessage name={field.name} /> : null}
		</>
	);
};

export default Datepicker;
