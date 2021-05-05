import { Button } from '@acpaas-ui/react-components';
import {
	ActionBar,
	ActionBarContentSection,
	ControlledModal,
} from '@acpaas-ui/react-editorial-components';
import classnames from 'classnames/bind';
import { FormikProps } from 'formik';
import { isNil } from 'ramda';
import React, { FC, ReactElement, useState } from 'react';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../../connectors';
import { InputFieldProps } from '../../../services/fieldRegistry';

import { CreateTimePeriodsForm, CreateTimePeriodsFormState } from './CreateTimePeriodsForm';
import { INITIAL_CREATE_FORM_STATE } from './CreateTimePeriodsForm/CreateTimePeriodsForm.const';
import { EditTimePeriodsForm } from './EditTimePeriodsForm';
import styles from './TimePeriods.module.scss';
import { TimePeriodsFormState, TimePeriodsValue } from './TimePeriods.types';

const cx = classnames.bind(styles);

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

	// Show modal by default in repeater context
	const [showModal, setShowModal] = useState(isRepeated ?? false);
	const [t] = useCoreTranslation();

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

	const renderAddButton = (): ReactElement | null => {
		// Don't show add button in repeater context, the modal will open by default
		return !isRepeated ? (
			<Button
				onClick={() => setShowModal(true)}
				iconLeft="plus"
				size="small"
				type="transparent"
				htmlType="button"
			>
				Voeg tijdstip toe
			</Button>
		) : null;
	};

	return !hasFieldValue ? (
		<>
			{renderAddButton()}
			<ControlledModal
				className={cx('o-time-periods__modal')}
				overlayClassName={cx('o-time-periods__overlay')}
				show={showModal}
				size="large"
			>
				<div className="u-padding">
					<h3>Tijdstippen toevoegen</h3>
				</div>
				<div className="u-bg-light">
					<CreateTimePeriodsForm onSubmit={onSetFieldValue}>
						{({ resetForm, submitForm }) => {
							return (
								<ActionBar
									className={cx('o-time-periods__modal-actions')}
									disablePortal
									isOpen
								>
									<ActionBarContentSection>
										<div className="u-text-right">
											<Button
												className="u-margin-right"
												negative
												onClick={() => onCancel(resetForm)}
											>
												{t(CORE_TRANSLATIONS.BUTTON_CANCEL)}
											</Button>
											<Button onClick={submitForm}>
												{t(CORE_TRANSLATIONS.BUTTON_ADD)}
											</Button>
										</div>
									</ActionBarContentSection>
								</ActionBar>
							);
						}}
					</CreateTimePeriodsForm>
				</div>
			</ControlledModal>
		</>
	) : (
		<EditTimePeriodsForm
			initialState={fieldValue as TimePeriodsFormState}
			onChange={onSetFieldValue}
		/>
	);
};

export default TimePeriods;
