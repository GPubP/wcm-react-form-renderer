import { Button, Card, CardBody } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import { useField } from 'formik';
import React, { ReactElement, useEffect, useState } from 'react';

import { FieldSchema } from '../../../core.types';
import { addNameSpace } from '../../../utils';
import { FieldRenderer } from '../../FieldRenderer';
import { FormRendererFieldTitle } from '../../FormRendererFieldTitle';

import styles from './Fieldgroup.module.scss';
import { FieldGroupProps } from './Fieldgroup.types';

const cx = classNames.bind(styles);

const Fieldgroup: React.FC<FieldGroupProps> = ({ fieldSchema }) => {
	const config = fieldSchema.config || {};
	const fields = Array.isArray(fieldSchema.fields) ? fieldSchema.fields : [];
	const withNamespace = addNameSpace(fieldSchema.name);

	/**
	 * HOOKS
	 */
	const [formikField, , helpers] = useField(fieldSchema.name);
	const [showFieldGroup, setShowFieldGroup] = useState<boolean>(false);

	useEffect(() => {
		setShowFieldGroup(
			config.required || (typeof formikField.value === 'object' && formikField.value !== null)
		);
	}, [config.required, fieldSchema.name, formikField.value]);

	/**
	 * METHODS
	 */

	const clearItem = (): void => {
		helpers.setValue(undefined);
		setShowFieldGroup(false);
	};

	/**
	 * RENDER
	 */
	const renderFields = (): ReactElement => {
		if (!showFieldGroup) {
			return (
				<div className={cx('field-group__item', 'field-group__item--hidden')}>
					<div className={cx('field-group__item__fields')}>
						Er zijn geen items om weer te geven.
					</div>
					<div className="u-margin-top">
						<Button
							onClick={() => setShowFieldGroup(true)}
							iconLeft="plus"
							size="small"
							disabled={config.disabled}
							type="primary"
							htmlType="button"
							negative
						>
							Voeg {fieldSchema.label?.toLocaleLowerCase()} toe
						</Button>
					</div>
				</div>
			);
		}

		return (
			<div className={cx('field-group__item')}>
				<Card className={cx('field-group__item__fields', 'u-margin-right-xs')}>
					<CardBody>
						<div className="row">
							{fields
								.map(
									(fieldSchema): FieldSchema => ({
										...fieldSchema,
										name: withNamespace(fieldSchema.name),
									})
								)
								.map((fieldSchema, index) => (
									<FieldRenderer
										key={`${index}-${fieldSchema.name}`}
										fieldSchema={fieldSchema}
									/>
								))}
						</div>
					</CardBody>
				</Card>
				{!config.required ? (
					<div>
						<Button
							onClick={() => clearItem()}
							negative
							icon="trash"
							disabled={config.disabled}
							ariaLabel="Delete item"
							type="secondary"
							htmlType="button"
						/>
					</div>
				) : null}
			</div>
		);
	};

	return (
		<div className={config.wrapperClassName}>
			{fieldSchema.label && (
				<FormRendererFieldTitle isRequired={config.required} className="u-margin-bottom">
					{fieldSchema.label}
				</FormRendererFieldTitle>
			)}
			{config.description && <p className="u-margin-bottom">{config.description}</p>}
			{renderFields()}
		</div>
	);
};

export default Fieldgroup;
