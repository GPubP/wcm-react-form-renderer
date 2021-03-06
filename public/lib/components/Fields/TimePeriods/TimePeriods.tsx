import { Button } from '@acpaas-ui/react-components';
import { isNil, pick } from 'ramda';
import React, { FC, useState } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';

import { CreateTimePeriodsFormState } from './CreateTimePeriodsForm';
import { CreateTimePeriodsModal } from './CreateTimePeriodsModal';
import { TimePeriodField } from './TimePeriodField';
import { TIME_PERIOD_VALUE_KEYS } from './TimePeriodField/TimePeriodField.const';
import { TimePeriodsValue } from './TimePeriods.types';

const TimePeriods: FC<InputFieldProps> = ({ fieldProps, fieldHelperProps, fieldSchema }) => {
	const { config, name } = fieldSchema;
	const { field } = fieldProps;
	const { setValue } = fieldHelperProps;
	const fieldValue = (field.value as unknown) as TimePeriodsValue;

	const hasFieldValue = !isNil(fieldValue);
	const isRepeated = config?.isRepeated ?? false;

	/**
	 * Hooks
	 */

	const [showModal, setShowModal] = useState(false);

	/**
	 * Methods
	 */

	const onCancel = (): void => {
		setShowModal(false);
	};

	const onCreate = (values: CreateTimePeriodsFormState): void => {
		const valuesToAdd = pick(TIME_PERIOD_VALUE_KEYS, values);

		setValue(valuesToAdd);
		setShowModal(false);
	};

	const onEdit = <K extends keyof TimePeriodsValue>(key: K, value: TimePeriodsValue[K]): void => {
		setValue({
			...fieldValue,
			[key]: value,
		});
	};

	/**
	 * Render
	 */

	if (isRepeated) {
		// When repeated the parent will handle the adding of time periods
		return (
			<TimePeriodField
				name={name}
				value={fieldValue as TimePeriodsValue}
				onChange={onEdit}
				options={config?.options}
			/>
		);
	}

	return !hasFieldValue ? (
		<>
			<Button
				onClick={() => setShowModal(true)}
				iconLeft="plus"
				size="small"
				type="transparent"
				htmlType="button"
			>
				Voeg tijdstip toe
			</Button>
			<CreateTimePeriodsModal show={showModal} onCancel={onCancel} onSubmit={onCreate} />
		</>
	) : (
		<TimePeriodField
			name={name}
			value={fieldValue as TimePeriodsValue}
			onChange={onEdit}
			options={config?.options}
		/>
	);
};

export default TimePeriods;
