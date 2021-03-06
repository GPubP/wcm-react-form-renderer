import { Checkbox } from '@acpaas-ui/react-components';
import classNames from 'classnames';
import { FieldArray } from 'formik';
import React, { ChangeEvent, FC, useMemo } from 'react';

import { useSelectFirstOptionWhenHidden } from '../../../hooks';
import { InputFieldProps } from '../../../services/fieldRegistry';
import { filterAllowedOptions } from '../../../utils';
import { ErrorMessage } from '../../ErrorMessage';
import { FormRendererFieldTitle } from '../../FormRendererFieldTitle';

const CheckboxList: FC<InputFieldProps> = ({ fieldProps, fieldSchema, fieldHelperProps }) => {
	const {
		name,
		label,
		config = {
			required: false,
			options: [],
			hideWhenOnlyOneAllowedOption: false,
		},
	} = fieldSchema;
	const { field } = fieldProps;
	const labelClass = classNames('a-input', {
		'is-required': config.required,
	});

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
					<div className={labelClass}>
						{label && (
							<FormRendererFieldTitle
								isRequired={config.required}
								isSynced={config.synced}
								className="u-margin-bottom-xs"
							>
								{label}
							</FormRendererFieldTitle>
						)}
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
										checked={
											Array.isArray(field.value) &&
											field.value.includes(option.value)
										}
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
					{config.description && <small>{config.description}</small>}
					<ErrorMessage name={field.name} />
				</div>
			)}
		</>
	);
};

export default CheckboxList;
