import { Button } from '@acpaas-ui/react-components';
import {
	ActionBar,
	ActionBarContentSection,
	ControlledModal,
} from '@acpaas-ui/react-editorial-components';
import classnames from 'classnames/bind';
import { FormikHelpers, FormikProps } from 'formik';
import React from 'react';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../../../connectors';
import {
	CreateTimePeriodsForm,
	CreateTimePeriodsFormState,
	INITIAL_CREATE_FORM_STATE,
} from '../CreateTimePeriodsForm';

import styles from './CreateTimePeriodsModal.module.scss';
import { CreateTimePeriodsModalProps } from './CreateTimePeriodsModal.types';

const cx = classnames.bind(styles);

const CreateTimePeriodsModal: React.FC<CreateTimePeriodsModalProps> = ({
	onCancel,
	onSubmit,
	show,
}) => {
	const [t] = useCoreTranslation();

	const onFormCancel = (
		resetForm: FormikProps<CreateTimePeriodsFormState>['resetForm']
	): void => {
		resetForm({ errors: {}, values: INITIAL_CREATE_FORM_STATE });
		onCancel();
	};

	const onFormSubmit = (
		values: CreateTimePeriodsFormState,
		recurringPeriods: Date[],
		formikHelpers: FormikHelpers<CreateTimePeriodsFormState>
	): void => {
		formikHelpers.resetForm({ errors: {}, values: INITIAL_CREATE_FORM_STATE });
		onSubmit(values, recurringPeriods);
	};

	return (
		<ControlledModal
			className={cx('o-create-time-periods-modal')}
			overlayClassName={cx('o-create-time-periods-overlay')}
			show={show}
			size="large"
		>
			<div className="u-padding">
				<h3>Tijdstippen toevoegen</h3>
			</div>
			<div className="u-bg-light">
				<CreateTimePeriodsForm onSubmit={onFormSubmit}>
					{({ resetForm, submitForm }) => {
						return (
							<ActionBar
								className={cx('o-create-time-periods-modal__actions')}
								disablePortal
								isOpen
							>
								<ActionBarContentSection>
									<div className="u-text-right">
										<Button
											className="u-margin-right"
											negative
											onClick={() => onFormCancel(resetForm)}
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
	);
};

export default CreateTimePeriodsModal;
