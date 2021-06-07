import { Button } from '@acpaas-ui/react-components';
import { FormikProps } from 'formik';
import { isNil } from 'ramda';
import React, { FC, useState } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';

import { CreateTimePeriodsFormState } from './CreateTimePeriodsForm';
import { INITIAL_CREATE_FORM_STATE } from './CreateTimePeriodsForm/CreateTimePeriodsForm.const';
import { CreateTimePeriodsModal } from './CreateTimePeriodsModal';
import { EditTimePeriodsForm } from './EditTimePeriodsForm';
import { TimePeriodsFormState, TimePeriodsValue } from './TimePeriods.types';

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

	// Don't show modal in repeater context
	const [showModal, setShowModal] = useState(isRepeated ?? false);

	/**
	 * Methods
	 */

	const onCancel = (resetForm: FormikProps<CreateTimePeriodsFormState>['resetForm']): void => {
		resetForm({ values: INITIAL_CREATE_FORM_STATE });
		setShowModal(false);

		if (config?.onDelete && isRepeated) {
			// Remove item from repeater values
			config.onDelete();
		}
	};

	const onSetFieldValue = (values: TimePeriodsFormState): void => {
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
