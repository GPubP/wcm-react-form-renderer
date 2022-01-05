import { Button, Textarea } from '@acpaas-ui/react-components';
import {
	ActionBar,
	ActionBarContentSection,
	ControlledModal,
} from '@acpaas-ui/react-editorial-components';
import { FormikOnChangeHandler, SelectOption } from '@redactie/utils';
import classnames from 'classnames/bind';
import { Field, Formik, FormikValues } from 'formik';
import debounce from 'lodash.debounce';
import React, { useState } from 'react';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../../../connectors';

import { csvToArray } from './KeyValueModal.helpers';
import styles from './KeyValueModal.module.scss';
import { KeyValuePairsModalProps } from './KeyValueModal.types';

const cx = classnames.bind(styles);

const KeyValuePairsModal: React.FC<KeyValuePairsModalProps> = ({
	onCancel,
	onSubmit,
	show,
	maxValues,
	currentValues,
	labelCopy,
	valueCopy,
}) => {
	const [t] = useCoreTranslation();
	const [initialValues, setInitialValues] = useState<{ csv: string }>({ csv: '' });
	const [keyValuePairs, setKeyValuePairs] = useState<SelectOption[]>([]);
	const [warning, setWarning] = useState<string>('');

	const handleChange = (values: FormikValues): void => {
		setWarning('');
		const res = csvToArray(values.csv);

		if (res.warning) {
			setWarning(res.warning);
			return;
		}

		if (res.keyValuePairs.length > maxValues - currentValues) {
			setWarning('Het aantal ingegeven waarden overschrijft het maximaal toegelaten aantal.');
			return;
		}

		setKeyValuePairs(res.keyValuePairs);
	};

	const debouncedChange = debounce(handleChange, 500);

	const handleSubmit = (): void => {
		setInitialValues({ csv: '' });
		setKeyValuePairs([]);
		onSubmit(keyValuePairs);
	};

	return (
		<ControlledModal className={cx('o-key-value-modal')} show={show} size="large">
			<div className={cx('o-key-value-modal__body')}>
				<div className="u-margin-top u-margin-left u-margin-right">
					<h3>Opties toevoegen</h3>
				</div>
				<Formik initialValues={initialValues} enableReinitialize onSubmit={debouncedChange}>
					{() => {
						return (
							<>
								<FormikOnChangeHandler onChange={debouncedChange} />
								<div className="u-margin">
									<div className="row">
										<div className="col-xs-12">
											<Field as={Textarea} id="csv" name="csv" />
											<small className="u-block u-text-light">
												Voer tekst in CSV formaat in, gebruik een
												&quot;,&quot; als scheidingsteken. Bijvoorbeeld:
												label,sleutel
											</small>
										</div>
									</div>
									{warning && (
										<p className="small u-margin-top-xs u-margin-bottom-xs u-text-danger">
											{warning}
										</p>
									)}
									{keyValuePairs.length > 0 && (
										<div className="u-margin-top">
											<h5 className="u-margin-bottom">Toegevoegde opties</h5>
											{keyValuePairs.map((keyValue, index) => {
												return (
													<div
														className={'u-flex row u-margin-bottom'}
														key={`keyValue-${index}`}
													>
														<div className="col-xs-6">
															<label className="u-block u-margin-bottom-xs">
																{labelCopy}
															</label>
															<p
																className={cx(
																	'a-key-value-wrapper'
																)}
															>
																{keyValue.label}
															</p>
														</div>
														<div className="col-xs-6">
															<label className="u-block u-margin-bottom-xs">
																{valueCopy}
															</label>
															<p
																className={cx(
																	'a-key-value-wrapper'
																)}
															>
																{keyValue.value}
															</p>
														</div>
													</div>
												);
											})}
										</div>
									)}
								</div>
							</>
						);
					}}
				</Formik>
			</div>
			<ActionBar disablePortal isOpen>
				<ActionBarContentSection>
					<div className="u-text-right">
						<Button className="u-margin-right" negative onClick={() => onCancel()}>
							{t(CORE_TRANSLATIONS.BUTTON_CANCEL)}
						</Button>
						<Button onClick={handleSubmit} disabled={!!warning}>
							{t(CORE_TRANSLATIONS.BUTTON_ADD)}
						</Button>
					</div>
				</ActionBarContentSection>
			</ActionBar>
		</ControlledModal>
	);
};

export default KeyValuePairsModal;
