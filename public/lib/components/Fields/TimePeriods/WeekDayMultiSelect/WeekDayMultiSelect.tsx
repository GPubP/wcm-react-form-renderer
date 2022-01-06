import classnames from 'classnames/bind';
import { FieldArray } from 'formik';
import React, { ChangeEvent } from 'react';

import { FormRendererFieldTitle } from '../../../FormRendererFieldTitle';

import styles from './WeekDayMultiSelect.module.scss';
import { WeekDayMultiSelectProps } from './WeekDayMultiSelect.types';

const cx = classnames.bind(styles);

const WeekDayMultiSelect: React.FC<WeekDayMultiSelectProps> = ({
	className,
	label,
	name,
	options = [],
	required,
	value = [],
}) => {
	const inputClassNames = cx(className, 'a-input', 'weekday-multiselect', {
		'is-required': !!required,
	});
	return (
		<div className={inputClassNames}>
			{label && (
				<FormRendererFieldTitle isRequired={required} className="u-margin-bottom-xs">
					{label}
				</FormRendererFieldTitle>
			)}
			<div className={cx('weekday-multiselect__wrapper')}>
				<FieldArray name={name}>
					{arrayHelpers =>
						options.map((option, index) => {
							const optionId = `${option.value}-${index}`;
							return (
								<label
									key={optionId}
									className={cx('weekday-multiselect__option')}
									htmlFor={optionId}
								>
									<input
										className={cx('weekday-multiselect__input')}
										checked={
											Array.isArray(value) && value.includes(option.value)
										}
										id={optionId}
										name={optionId}
										onChange={(e: ChangeEvent<HTMLInputElement>) => {
											if (e.target.checked) {
												arrayHelpers.push(option.value);
											} else {
												const idx = value.indexOf(option.value);
												arrayHelpers.remove(idx);
											}
										}}
										type="checkbox"
									/>
									<span className={cx('weekday-multiselect__label')}>
										{option.label}
									</span>
								</label>
							);
						})
					}
				</FieldArray>
			</div>
		</div>
	);
};

export default WeekDayMultiSelect;
