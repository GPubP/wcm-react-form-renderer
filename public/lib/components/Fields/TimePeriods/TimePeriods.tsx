import { Button } from '@acpaas-ui/react-components';
import { isNil, pick } from 'ramda';
import React, { FC, useState } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';

import { CreateTimePeriodsFormState } from './CreateTimePeriodsForm';
import { CreateTimePeriodsModal } from './CreateTimePeriodsModal';
import { TimePeriodField } from './TimePeriodField';
import { TimePeriodsValue } from './TimePeriods.types';

const TimePeriods: FC<InputFieldProps> = ({ fieldProps, fieldHelperProps, fieldSchema }) => {
	const { config, label, name } = fieldSchema;
	const { field } = fieldProps;
	const { setValue } = fieldHelperProps;
	const fieldValue = (field.value as unknown) as TimePeriodsValue;

	const hasFieldValue = !isNil(fieldValue) && fieldValue.startDate && fieldValue.startTime;
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
		const valuesToAdd = pick([], values);
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

	if (!hasFieldValue && isRepeated) {
		return null;
	}

	return !hasFieldValue ? (
		// When repeated the parent will handle the adding of time periods
		!isRepeated ? (
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
		) : null
	) : (
		<TimePeriodField
			label={label}
			name={name}
			value={fieldValue as TimePeriodsValue}
			onChange={onEdit}
		/>
	);
};

export default TimePeriods;
