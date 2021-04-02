import { Button, Card, CardBody } from '@acpaas-ui/react-components';
import classNames from 'classnames/bind';
import { useField } from 'formik';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../../connectors';
import { FieldSchema } from '../../../core.types';
import { useFieldRendererContext } from '../../../hooks';
import { addNameSpace } from '../../../utils';
import { FieldRenderer } from '../../FieldRenderer';
import { FormRendererFieldTitle } from '../../FormRendererFieldTitle';

import styles from './Fieldgroup.module.scss';
import { FieldGroupProps } from './Fieldgroup.types';

const cx = classNames.bind(styles);

const Fieldgroup: React.FC<FieldGroupProps> = ({ fieldSchema }) => {
	const [t] = useCoreTranslation();
	const config = fieldSchema.config || {};
	const fields = Array.isArray(fieldSchema.fields) ? fieldSchema.fields : [];
	const withNamespace = addNameSpace(fieldSchema.name);

	/**
	 * HOOKS
	 */
	const [formikField, , helpers] = useField(fieldSchema.name);
	const { renderContext } = useFieldRendererContext();
	const [showFieldGroup, setShowFieldGroup] = useState<boolean>(false);
	const clearItem = useCallback((): void => {
		helpers.setValue('');
		setShowFieldGroup(false);
	}, [helpers]);
	const createFieldGroup = useCallback((): void => {
		if (typeof formikField.value !== 'object') {
			helpers.setValue({});
		}

		setShowFieldGroup(true);
	}, [formikField.value, helpers]);

	useEffect(
		() =>
			config.required ||
			renderContext?.wrappedInCard ||
			renderContext?.wrappedInDashedContainer ||
			(typeof formikField.value === 'object' && formikField.value !== null)
				? createFieldGroup()
				: clearItem(),
		[config.required, fieldSchema.name, renderContext] // eslint-disable-line
	);

	/**
	 * RENDER
	 */
	const renderAsRequiredField = (): ReactElement => (
		<div className={cx('field-group__item')}>
			<div className={cx('field-group__item__fields', 'u-margin-right-xs')}>
				<div className={cx('field-group__item__fields_row-wrapper', 'row')}>
					{fields
						.map(
							(childFieldSchema): FieldSchema => ({
								...childFieldSchema,
								name: withNamespace(childFieldSchema.name),
							})
						)
						.map((childFieldSchema, index) => (
							<FieldRenderer
								key={`${index}-${childFieldSchema.name}`}
								fieldSchema={childFieldSchema}
								defaultWrapperClassName="col-xs-12"
							/>
						))}
				</div>
			</div>
		</div>
	);

	const renderFields = (): ReactElement => (
		<div className={cx('field-group__item__fields_row-wrapper', 'row')}>
			{fields
				.map(
					(childFieldSchema): FieldSchema => ({
						...childFieldSchema,
						name: withNamespace(childFieldSchema.name),
					})
				)
				.map((childFieldSchema, index) => (
					<FieldRenderer
						key={`${index}-${childFieldSchema.name}`}
						fieldSchema={childFieldSchema}
						defaultWrapperClassName="col-xs-12"
					/>
				))}
		</div>
	);

	const renderFieldsWrappper = (): ReactElement => {
		if (config.required || renderContext.renderAsRequired) {
			return renderAsRequiredField();
		}

		if (!showFieldGroup) {
			return (
				<div className={cx('field-group__item', 'field-group__item--hidden')}>
					<div
						className={cx('field-group__item__fields', 'field-group__item__no-fields')}
					>
						{t(CORE_TRANSLATIONS['TABLE_NO-ITEMS'])}
					</div>
					<div className="u-margin-top-xs">
						<Button
							onClick={() => createFieldGroup()}
							iconLeft="plus"
							size="small"
							disabled={config.disabled}
							type="transparent"
							htmlType="button"
							className={cx('no-text-decoration')}
						>
							Voeg {fieldSchema.label?.toLocaleLowerCase()} toe
						</Button>
					</div>
				</div>
			);
		}

		return (
			<div className={cx('field-group__item')}>
				<>
					<Card className={cx('field-group__item__fields', 'u-margin-right-xs')}>
						<CardBody>{renderFields()}</CardBody>
					</Card>
					<div>
						<Button
							onClick={() => clearItem()}
							negative
							icon="trash-o"
							disabled={config.disabled}
							ariaLabel="Delete item"
							type="secondary"
							htmlType="button"
						/>
					</div>
				</>
				{/* )} */}
			</div>
		);
	};

	return (
		<>
			{fieldSchema.label && (
				<FormRendererFieldTitle isRequired={config.required} className="u-margin-bottom">
					{fieldSchema.label}
				</FormRendererFieldTitle>
			)}
			{config.description && <p className="u-margin-bottom">{config.description}</p>}
			{renderFieldsWrappper()}
		</>
	);
};

export default Fieldgroup;
