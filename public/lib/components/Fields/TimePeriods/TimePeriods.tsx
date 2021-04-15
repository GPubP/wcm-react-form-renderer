import { Button } from '@acpaas-ui/react-components';
import {
	ActionBar,
	ActionBarContentSection,
	ControlledModal,
} from '@acpaas-ui/react-editorial-components';
import classnames from 'classnames/bind';
import { isNil } from 'ramda';
import React, { FC, useState } from 'react';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../../connectors';
import { InputFieldProps } from '../../../services/fieldRegistry';

import { CreateTimePeriodsForm } from './CreateTimePeriodsForm';
import { EditTimePeriodsForm } from './EditTimePeriodsForm';
import styles from './TimePeriods.module.scss';

const cx = classnames.bind(styles);

const TimePeriods: FC<InputFieldProps> = ({ fieldSchema, fieldProps, fieldHelperProps }) => {
	// const { config = {}, name, label } = fieldSchema;
	const { field } = fieldProps;
	const { setValue } = fieldHelperProps;

	const hasFieldValue = !isNil(field.value);

	// console.log('value', field.value, typeof field.value);
	// console.log('======================================');

	// Keep intitial value when canceling

	/**
	 * Hooks
	 */

	const [showModal, setShowModal] = useState(false);
	const [t] = useCoreTranslation();

	// Auto open modal if value is not set

	/**
	 * Methods
	 */

	const onCancel = (): void => {
		setShowModal(false);
	};

	const onCreate = (values: any): void => {
		console.log(values);
		setValue(values);
	};

	const onEdit = (values: any): void => {
		console.log(values);
	};

	/**
	 * Render
	 */

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
			<ControlledModal className={cx('o-time-periods__modal')} show={showModal} size="large">
				<div className="u-padding">
					<h3>Tijdstippen toevoegen</h3>
				</div>
				<div className="u-bg-light">
					<CreateTimePeriodsForm onSubmit={onCreate}>
						{({ submitForm }) => {
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
												onClick={onCancel}
											>
												Annuleer
											</Button>
											<Button onClick={submitForm}>Voeg toe</Button>
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
		<EditTimePeriodsForm initialState={field.value} onChange={onEdit} />
	);
};

export default TimePeriods;
