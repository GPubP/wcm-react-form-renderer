import { Datepicker as AuiDatepicker } from '@acpaas-ui/react-components';
import { getIn } from 'formik';
import moment from 'moment';
import { pick } from 'ramda';
import React, { useEffect, useMemo, useState } from 'react';
import 'moment/locale/nl';

import { isDeprecatedDateFormat } from '../../../helpers';
import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';
import { FormRendererFieldTitle } from '../../FormRendererFieldTitle';
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

		if (isDeprecatedDateFormat(field.value)) {
			setInternalValue(field.value);
			return;
		}

		const dateValue = new Date(field.value);

		if (isNaN(dateValue.getTime())) {
			return;
		}

		setInternalValue(new Intl.DateTimeFormat('en-GB').format(dateValue));
	}, [field.value]);

	return (
		<>
			{fieldSchema.label && !config.nested && (
				<FormRendererFieldTitle isRequired={config.required} className="u-margin-bottom-xs">
					{fieldSchema.label}
				</FormRendererFieldTitle>
			)}
			<AuiDatepicker
				id={fieldSchema.name}
				state={state}
				label={config.nested && fieldSchema.label}
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
				locale={'nl'}
			/>
			{!config.skipErrorMessage ? <ErrorMessage name={field.name} /> : null}
		</>
	);
};

export default Datepicker;
