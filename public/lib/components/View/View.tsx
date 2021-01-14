import { Formik } from 'formik';
import React, { FC, ReactNode } from 'react';

import { FormContext } from '../../context';
import { FieldSchema } from '../../core.types';
import { ViewRenderer } from '../ViewRenderer';

import { ViewProps } from './View.types';

const View: FC<ViewProps> = ({ schema, values }) => {
	/**
	 * Methods
	 */
	const renderViews = (fields: FieldSchema[]): ReactNode =>
		fields.map((fieldSchema, index) => (
			<ViewRenderer key={`${index}-${fieldSchema.name}`} fieldSchema={fieldSchema} />
		));

	const noopSubmit = (): void => {
		return;
	};

	/**
	 * go through the schema
	 */
	return (
		<FormContext.Provider value={{ useDividers: false, schema, allowedHeaders: [] }}>
			<Formik onSubmit={noopSubmit} initialValues={values} enableReinitialize>
				{() => renderViews(schema.fields)}
			</Formik>
		</FormContext.Provider>
	);
};

export default View;
