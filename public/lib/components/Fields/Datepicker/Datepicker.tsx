import { Datepicker as AuiDatepicker } from '@acpaas-ui/react-components';
import { getIn } from 'formik';
import { pick } from 'ramda';
import React, { useMemo } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';
import { DEFAULT_FIELD_CONFIG_PROPS } from '../Fields.const';

const Datepicker: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema }: InputFieldProps) => {
	const config = fieldSchema.config || {};
	const { field, form } = fieldProps;

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
					'mask',
					'format',
					'locale',
					'selectedDates',
					'open',
					'autoClose',
					'readOnly',
					'noWeekends',
					'minDate',
					'maxDate',
					'size',
				],
				config
			),
		[config]
	);

	const date = useMemo(() => {
		if (!field.value) {
			return;
		}

		if (new RegExp('^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]d{4}$').test(field.value)) {
			return field.value;
		}

		return new Intl.DateTimeFormat('en-GB').format(new Date(field.value));
	}, [field.value]);

	return (
		<>
			<AuiDatepicker
				id={fieldSchema.name}
				state={state}
				label={fieldSchema.label}
				onChange={(e: string) => {
					const splitDate = e.split('/');

					const event = {
						target: {
							id: fieldSchema.name,
							value: new Date(
								parseInt(splitDate[2]),
								parseInt(splitDate[1]) - 1,
								parseInt(splitDate[0])
							).toISOString(),
						},
					};

					field.onChange(event);
				}}
				activeDate={date}
				{...fieldConfigProps}
			/>
			{!config.skipErrorMessage ? <ErrorMessage name={field.name} /> : null}
		</>
	);
};

export default Datepicker;
