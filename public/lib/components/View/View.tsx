import { Formik } from 'formik';
import React, { FC, ReactNode } from 'react';

import { FieldSchema } from '../../core.types';
import SchemaProvider from '../SchemaProvider/SchemaProvider';
import ViewRenderer from '../ViewRenderer/ViewRenderer';

import { ViewProps } from './View.types';

const View: FC<ViewProps> = ({ schema, values }) => {
	/**
	 * Methods
	 */
	const renderViews = (fields: FieldSchema[]): ReactNode =>
		fields.map((fieldSchema, index) => <ViewRenderer key={index} fieldSchema={fieldSchema} />);

	const noopSubmit = (): void => {
		return;
	};

	/**
	 * go through the schema
	 */
	return (
		<SchemaProvider value={{ schema }}>
			<Formik onSubmit={noopSubmit} initialValues={values} enableReinitialize>
				{() => renderViews(schema.fields)}
			</Formik>
		</SchemaProvider>
	);
};

export default View;
