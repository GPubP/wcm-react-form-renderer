import React, { ReactNode, useCallback, useState, useEffect } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';

import SchemaProvider from '../SchemaProvider/SchemaProvider';
import FieldRenderer from '../FieldRenderer/FieldRenderer';
import * as coreTypes from '../../core.types'
import { getInitialValues } from '../../utils';

import { FormProps } from './Form.types';

const RedactionForm: React.FC<FormProps> = ({ schema, onSubmit, ...rest }) => {
	const [initialValues, setInitialValues] = useState();

	/**
	 * Calculate the initial values of the form
	 * We need this because Even if your form is empty by default,
	 * you must initialize all fields with initial values otherwise React
	 * will throw an error saying that you have changed an input from uncontrolled to controlled.
	 */
	const initInitialValues = useCallback(() => {
		setInitialValues(getInitialValues(schema));
	}, [schema]);

	/**
	 * Get the initial values everytime the given schema has changed
	 */
	useEffect(() => {
		initInitialValues();
	}, [initInitialValues])

	const onFormSubmit = (values: coreTypes.FormValues, actions: FormikHelpers<coreTypes.FormValues>): void => {
		if (onSubmit) {
			onSubmit(values);
		}
		actions.setSubmitting(false);
	}

	const renderFields = (fields: coreTypes.FieldSchema[]): ReactNode => {
		return fields.map((fieldSchema, index) => <FieldRenderer key={index} fieldSchema={fieldSchema} />);
	}

	// wait till the initial values are created
	if (!initialValues) {
		return null;
	}

	return (
		<SchemaProvider value={{ schema }}>
			<Formik
				data-testid='formik-form'
				initialValues={initialValues}
				onSubmit={onFormSubmit}
				{...rest}
			>
				<Form data-testid='formik-form'>
					{renderFields(schema.fields)}
					<button className={'a-button'} type='submit'>Submit</button>
				</Form>
			</Formik>
		</SchemaProvider>
	)
}

export default RedactionForm;
