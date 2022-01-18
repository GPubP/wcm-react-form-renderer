import { Button, Select } from '@acpaas-ui/react-components';
import { omit, pick } from 'ramda';
import React, { FC, useEffect, useMemo } from 'react';

import { useSelectFirstOptionWhenHidden } from '../../../hooks';
import useFieldRendererContext from '../../../hooks/useFieldRendererContext/useFieldRendererContext';
import { InputFieldProps } from '../../../services/fieldRegistry';
import { filterAllowedOptions } from '../../../utils';
import { ErrorMessage } from '../../ErrorMessage';
import { FormRendererFieldTitle } from '../../FormRendererFieldTitle';
import { DEFAULT_FIELD_CONFIG_PROPS } from '../Fields.const';

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
	const { renderContext, setWrapperClass } = useFieldRendererContext();
	const { setValue } = fieldHelperProps;

	/**
	 * Hooks
	 */
	const options = useMemo(() => filterAllowedOptions(config.options, config.allowedOptions), [
		config.options,
		config.allowedOptions,
	]);
	const showField = useSelectFirstOptionWhenHidden(config, field.value, fieldHelperProps);

	const fieldConfigProps = useMemo(
		() =>
			pick(
				[...DEFAULT_FIELD_CONFIG_PROPS, 'inline', 'loading', 'placeholder', 'size'],
				config
			),
		[config]
	);

	useEffect(() => {
		if (!showField && renderContext.wrapperClass && setWrapperClass) {
			setWrapperClass('');
		}
	}, [renderContext.wrapperClass, setWrapperClass, showField]);

	return (
		<>
			{showField && (
				<div className="a-input">
					<FormRendererFieldTitle
						isRequired={config.required}
						className="u-margin-bottom-xs"
					>
						{label}
					</FormRendererFieldTitle>
					<div className="row u-flex-align-center">
						{/* <div>

						</div> */}
						<Select
							className="col-xs-11"
							id={name}
							options={options}
							value={value}
							{...omit(['value'])(field)}
							{...fieldConfigProps}
						/>
						{config.description && <small>{config.description}</small>}
						<Button
							className={''}
							negative
							size="small"
							icon="trash-o"
							type="secondary"
							htmlType="button"
							onClick={() => setValue(undefined)}
						/>
					</div>
					<ErrorMessage name={field.name} />
				</div>
			)}
		</>
	);
};

export default InputSelect;
