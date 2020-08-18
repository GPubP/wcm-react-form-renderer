import { Checkbox } from '@acpaas-ui/react-components';
import classNames from 'classnames';
import { FieldArray } from 'formik';
import React, { ChangeEvent, FC, useMemo } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { filterAllowedOptions } from '../../../utils';
import { ErrorMessage } from '../../ErrorMessage';

const CheckboxList: FC<InputFieldProps> = ({ fieldProps, fieldSchema }) => {
	const {
		name,
		label,
		config = {
			required: false,
			options: [],
			allowedOptions: [],
		},
	} = fieldSchema;
	const { field } = fieldProps;
	const labelClass = classNames('a-input', {
		'is-required': config.required,
	});
	const options = useMemo(() => filterAllowedOptions(config.options, config.allowedOptions), [
		config.options,
		config.allowedOptions,
	]);

	return (
		<div>
			<div className={labelClass}>
				<label className="a-input__label">{label}</label>
			</div>
			<FieldArray
				name={name}
				render={arrayHelpers => (
					<div>
						{options.map(option => (
							<Checkbox
								key={`${name}-${option.value}`}
								id={`${name}-${option.value}`}
								label={option.label}
								disabled={!!config.disabled}
								checked={!!field.value?.includes(option.value)}
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									if (e.target.checked) {
										arrayHelpers.push(option.value);
									} else {
										const idx = field.value.indexOf(option.value);
										arrayHelpers.remove(idx);
									}
								}}
							/>
						))}
					</div>
				)}
			/>
			<ErrorMessage name={field.name} />
		</div>
	);
};

export default CheckboxList;
