import classNames from 'classnames/bind';
import { Formik, FormikValues } from 'formik';
import moment from 'moment';
import { equals, isEmpty } from 'ramda';
import React, { FC, ReactElement, ReactNode, useEffect, useState } from 'react';

import { FormContext } from '../../context';
import { FieldSchema, FormSchema } from '../../core.types';
import { CompareViewRenderer } from '../CompareViewRenderer';

import { DATE_FORMATS } from './CompareView.const';
import CompareViewStyles from './CompareView.module.scss';
import { CompareViewProps } from './CompareView.types';

const cx = classNames.bind(CompareViewStyles);

const CompareView: FC<CompareViewProps> = ({ schema, fromValues, toValues, fromMeta, toMeta }) => {
	const [initialValues, setInitialValues] = useState<FormikValues>({});
	const [formSchema, setFormSchema] = useState<FormSchema>();
	const [fromFieldSchema, setFromFieldSchema] = useState<{ [fieldName: string]: FieldSchema }>(
		{}
	);
	const [toFieldSchema, setToFieldSchema] = useState<{ [fieldName: string]: FieldSchema }>({});

	/**
	 * Hooks
	 */

	useEffect(() => {
		if (!fromValues || !toValues) {
			return;
		}

		const mappedFromValues = Object.keys(fromValues).reduce((acc, key) => {
			return {
				...acc,
				[`from-${key}`]: fromValues[key],
			};
		}, {});
		const mappedToValues = Object.keys(toValues).reduce((acc, key) => {
			return {
				...acc,
				[`to-${key}`]: toValues[key],
			};
		}, {});

		setInitialValues({
			...mappedFromValues,
			...mappedToValues,
		});
	}, [fromValues, toValues]);

	useEffect(() => {
		if (!schema) {
			return;
		}

		const mappedFromFields = schema.fields.reduce(
			(acc: { [fieldName: string]: FieldSchema }, field) => {
				return {
					...acc,
					[field.name]: {
						...field,
						name: `from-${field.name}`,
					},
				};
			},
			{}
		);
		const mappedToFields = schema.fields.reduce(
			(acc: { [fieldName: string]: FieldSchema }, field) => {
				return {
					...acc,
					[field.name]: {
						...field,
						name: `to-${field.name}`,
					},
				};
			},
			{}
		);

		setFromFieldSchema(mappedFromFields);
		setToFieldSchema(mappedToFields);
		setFormSchema({
			fields: [...Object.values(mappedFromFields), ...Object.values(mappedToFields)],
		});
	}, [schema]);
	/**
	 * Methods
	 */
	const renderViews = (fields: FieldSchema[]): ReactNode => {
		return fields.map((fieldSchema, index) => {
			if (
				equals(
					initialValues[fromFieldSchema[fieldSchema.name].name],
					initialValues[toFieldSchema[fieldSchema.name].name]
				)
			) {
				return;
			}

			return (
				<div key={`${index}-${fieldSchema.name}`} className={cx('m-compare-view')}>
					<div className={cx('m-compare-view__from')}>
						<CompareViewRenderer fieldSchema={fromFieldSchema[fieldSchema.name]} />
					</div>
					<div className={cx('m-compare-view__to')}>
						<CompareViewRenderer fieldSchema={toFieldSchema[fieldSchema.name]} />
					</div>
					{index !== fields.length - 1 && (
						<div className={cx('m-compare-view__divider')} />
					)}
				</div>
			);
		});
	};

	const renderMeta = (meta: any): ReactElement => {
		return (
			<>
				{meta.description ? (
					<p className={cx('a-description')}>{meta.description}</p>
				) : (
					<p className={cx('a-description')}>Geen beschrijving ingevuld</p>
				)}
				<div className="u-margin-top">
					<p>
						<span className="u-text-bold">Slug:</span> {meta.slug.nl}
					</p>
				</div>
				<div className="u-margin-top">
					<p>
						<span className="u-text-bold">Aangemaakt op:</span>{' '}
						{moment(meta.created).format(DATE_FORMATS.dateAndTime)}
					</p>
				</div>
				<div className="u-margin-top">
					<p>
						<span className="u-text-bold">Laatst aangepast op:</span>{' '}
						{moment(meta.lastModified).format(DATE_FORMATS.dateAndTime)}
					</p>
				</div>
				<div>
					<p>
						<span className="u-text-bold">Door:</span>{' '}
						{meta.lastEditor?.firstname
							? `${meta.lastEditor?.firstname} ${meta.lastEditor?.lastname}`
							: 'Onbekend'}
					</p>
				</div>
			</>
		);
	};

	const renderMetaViews = (): ReactElement => {
		if (!fromMeta || !toMeta) {
			return <></>;
		}

		return (
			<div className={cx('m-compare-view')}>
				<>
					<div className={cx('m-compare-view__from')}>
						<h4>{fromMeta.label}</h4>
					</div>
					<div className={cx('m-compare-view__to')}>
						<h4>{toMeta.label}</h4>
					</div>
					<div className={cx('m-compare-view__divider', 'u-margin-top')} />
				</>
				<div className={cx('m-compare-view__from')}>{renderMeta(fromMeta)}</div>
				<div className={cx('m-compare-view__to')}>{renderMeta(toMeta)}</div>
				<div className={cx('m-compare-view__divider', 'u-margin-top')} />
			</div>
		);
	};

	const noopSubmit = (): void => {
		return;
	};

	/**
	 * go through the schema
	 */
	return (
		<FormContext.Provider
			value={{ useDividers: false, schema: formSchema, allowedHeaders: [] }}
		>
			{renderMetaViews()}
			<Formik onSubmit={noopSubmit} initialValues={initialValues} enableReinitialize>
				{() => !isEmpty(fromFieldSchema) && renderViews(schema?.fields || [])}
			</Formik>
		</FormContext.Provider>
	);
};

export default CompareView;
