import { Button } from '@acpaas-ui/react-components';
import { isNil } from 'ramda';
import React, { FC, useState } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';

import { CreateTimePeriodsModal } from './CreateTimePeriodsModal';
import { EditTimePeriodsForm } from './EditTimePeriodsForm';
import { TimePeriodsValue } from './TimePeriods.types';

const TimePeriods: FC<InputFieldProps> = ({ fieldProps, fieldHelperProps, fieldSchema }) => {
	const { config } = fieldSchema;
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
		// TODO: remove if unnecessary
		// resetForm({ values: INITIAL_CREATE_FORM_STATE });
		setShowModal(false);
	};

	const onSetFieldValue = (values: TimePeriodsFormState): void => {
	const onSetFieldValue = (values: TimePeriodsValue): void => {
		setValue(values);
		setShowModal(false);
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
				<CreateTimePeriodsModal
					show={showModal}
					onCancel={onCancel}
					onSubmit={onSetFieldValue}
				/>
			</>
		) : null
	) : (
		<EditTimePeriodsForm
			initialState={fieldValue as TimePeriodsFormState}
			onChange={onSetFieldValue}
		/>
	);
};

export default TimePeriods;
