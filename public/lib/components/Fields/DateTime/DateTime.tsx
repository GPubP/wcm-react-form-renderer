import { Button } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import { omit } from 'ramda';
import React, { ChangeEvent, useMemo } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry/fieldRegistry.types';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import { FormRendererFieldTitle } from '../../FormRendererFieldTitle';
import Datepicker from '../Datepicker/Datepicker';
import Time from '../Time/Time';

import { getTime, updateDate, updateTime } from './DateTime.helpers';
import DateTimeStyles from './DateTime.module.scss';

const cx = classNames.bind(DateTimeStyles);

const DateTimepicker: React.FC<InputFieldProps> = ({
	fieldProps,
	fieldSchema,
	fieldHelperProps,
}) => {
	const config = fieldSchema.config || {};
	const { field } = fieldProps;
	const { setValue } = fieldHelperProps;
	const timeValue = useMemo(() => getTime(field.value), [field.value]);

	const handleChange = (inputValue: string, type: string): void => {
		const { value } = field;
		const prevDate = value === '' ? new Date() : new Date(value);

		try {
			switch (type) {
				case 'date':
					setValue(inputValue ? updateDate(prevDate, inputValue) : null);
					break;
				case 'time':
					setValue(updateTime(prevDate, inputValue));
					break;
				default:
					break;
			}
		} catch (e) {
			setValue(inputValue);
		}
	};

	return (
		<>
			{fieldSchema.label && (
				<FormRendererFieldTitle isRequired={config.required} className="u-margin-bottom-xs">
					{fieldSchema.label}
				</FormRendererFieldTitle>
			)}
			{config.description && <p className="u-margin-bottom">{config.description}</p>}
			<div className="row">
				<div className="col-lg-6">
					<Datepicker
						key={field.value}
						fieldProps={
							{
								...fieldProps,
								field: {
									...field,
									onChange: (event: ChangeEvent<any>) =>
										handleChange(event.target.value, 'date'),
								},
							} as any
						}
						fieldSchema={{
							...fieldSchema,
							config: {
								...config,
								description: config.inputDescription || 'Geef een datum in',
								skipErrorMessage: true,
							},
							label: fieldSchema.config?.dateLabel || 'Datum',
						}}
						fieldHelperProps={fieldHelperProps}
					/>
				</div>
				<div className="col-lg-6">
					<div className="u-flex">
						<div className={cx('o-datetime__time')}>
							<Time
								fieldProps={{
									...fieldProps,
									field: {
										...fieldProps.field,
										value: timeValue,
										onChange: (event: ChangeEvent<any>) =>
											handleChange(event.target.value, 'time'),
									},
								}}
								fieldSchema={{
									...fieldSchema,
									config: {
										...omit(['description'], fieldSchema.config),
										skipErrorMessage: true,
									},
									label: '',
								}}
								fieldHelperProps={fieldHelperProps}
							/>
						</div>
						<Button
							className={cx('o-datetime__clear')}
							negative
							size="small"
							icon="trash-o"
							ariaLabel="Reset datetime"
							type="secondary"
							htmlType="button"
							onClick={() => setValue(null)}
						/>
					</div>
				</div>
			</div>
			<ErrorMessage name={field.name} />
		</>
	);
};

export default DateTimepicker;
