import { Form, Formik, FormikHelpers } from 'formik';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { buildYup } from 'schema-to-yup';

import * as coreTypes from '../../core.types';
import { getInitialValues } from '../../utils';
import FieldRenderer from '../FieldRenderer/FieldRenderer';
import SchemaProvider from '../SchemaProvider/SchemaProvider';

import { FormProps } from './Form.types';

const RedactionForm: React.FC<FormProps> = ({
	schema,
	onSubmit,
	validationSchema,
	errorMessages,
	...rest
}: FormProps) => {
	const [initialValues, setInitialValues] = useState();
	const [yupValidationSchema, setYupValidationSchema] = useState();

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
	 * Convert a JSON schema to a Yup schema
	 */
	const initYupValidationSchema = useCallback(() => {
		setYupValidationSchema(
			buildYup(validationSchema, {
				errMessages: errorMessages,
			})
		);
	}, [validationSchema, errorMessages]);

	/**
	 * Get the initial values everytime the given schema has changed
	 */
	useEffect(() => {
		initInitialValues();
		initYupValidationSchema();
	}, [initInitialValues, initYupValidationSchema]);

	const onFormSubmit = (
		values: coreTypes.FormValues,
		actions: FormikHelpers<coreTypes.FormValues>
	): void => {
		if (onSubmit) {
			onSubmit(values);
		}
		actions.setSubmitting(false);
	};

	const renderFields = (fields: coreTypes.FieldSchema[]): ReactNode => {
		return fields.map((fieldSchema, index) => (
			<FieldRenderer key={index} fieldSchema={fieldSchema} />
		));
	};

	// wait till the initial values are created
	if (!initialValues) {
		return null;
	}

	return (
		<SchemaProvider value={{ schema }}>
			<Formik
				data-testid="formik-form"
				initialValues={initialValues}
				onSubmit={onFormSubmit}
				validationSchema={yupValidationSchema}
				{...rest}
			>
				{props => (
					<Form noValidate onSubmit={props.handleSubmit} data-testid="formik-form">
						{renderFields(schema.fields)}
						<button className={'a-button'} type="submit">
							Submit
						</button>
					</Form>
				)}
			</Formik>
		</SchemaProvider>
	);
};

export default RedactionForm;
