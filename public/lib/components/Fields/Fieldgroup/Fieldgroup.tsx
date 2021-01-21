import { Button, Card, CardBody } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import { useField } from 'formik';
import React, { ReactElement, useEffect, useState } from 'react';

import { FieldSchema } from '../../../core.types';
import { useFieldRendererContext } from '../../../hooks';
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
	const { renderContext } = useFieldRendererContext();
	const [showFieldGroup, setShowFieldGroup] = useState<boolean>(false);

	useEffect(() => {
		setShowFieldGroup(
			config.required ||
				renderContext?.wrappedInCard ||
				renderContext?.wrappedInDashedContainer ||
				(typeof formikField.value === 'object' && formikField.value !== null)
		);
	}, [config.required, fieldSchema.name, formikField.value, renderContext]);

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
	const renderAsRequiredField = (): ReactElement => (
		<div className={cx('field-group__item')}>
			<div className={cx('field-group__item__fields', 'u-margin-right-xs')}>
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
			</div>
		</div>
	);

	const renderFields = (): ReactElement => (
		<div className="row">
			{fields
				.map(
					(fieldSchema): FieldSchema => ({
						...fieldSchema,
						name: withNamespace(fieldSchema.name),
					})
				)
				.map((fieldSchema, index) => (
					<FieldRenderer key={`${index}-${fieldSchema.name}`} fieldSchema={fieldSchema} />
				))}
		</div>
	);

	const renderFieldsWrappper = (): ReactElement => {
		if (config.required) {
			return renderAsRequiredField();
		}

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
				{renderContext?.wrappedInCard || renderContext?.wrappedInDashedContainer ? (
					renderFields()
				) : (
					<>
						<Card className={cx('field-group__item__fields', 'u-margin-right-xs')}>
							<CardBody>{renderFields()}</CardBody>
						</Card>
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
					</>
				)}
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
			{renderFieldsWrappper()}
		</div>
	);
};

export default Fieldgroup;
