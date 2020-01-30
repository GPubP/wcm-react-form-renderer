import React, { ReactNode, useCallback, useState, useEffect } from 'react';
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';

import SchemaProvider from '../SchemaProvider/SchemaProvider';
import * as coreTypes from '../../core.types'
import { getInitialValues } from '../../utils';

import { FormProps } from './Form.types';

const RedactionForm: React.FC<FormProps> = ({ schema, ...rest }) => {
	const [initialValues, setInitialValues] = useState();

	/**
	 * TODO:
	 * - Create an innerform component that handles the inner form logic
	 * - create a Field component that gets the Formik FieldProps
	 *
	 */

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
	}, [schema])

	const onFormSubmit = (values: coreTypes.FormValues, actions: FormikHelpers<coreTypes.FormValues>): void => {
		actions.setSubmitting(false);
	}

	const renderFields = (fields: coreTypes.Field[]): ReactNode => {
		return fields.map((fieldSchema, index) => (
			// dataType === array => user FieldArray
			// dataType === object

			// if fieldgroup
			// run fieldgroup component


			// if field
			// run field

			/**
			 * get field component from type
			 * give each component the field schema + fromik field options
			 */

			<Field key={index} name={fieldSchema.name} render={(props: FieldProps<string, {}>): ReactNode => (
				// field handler
				<div>
					<input type="text" {...props.field} value={props.field.value as any | ''}></input>
				</div>
			)}/>
		));
	}

	// wait till the initial values are created
	if (!initialValues) {
		return null;
	}

	return (
		<SchemaProvider value={{ schema }}>
			<Formik
				initialValues={initialValues}
				onSubmit={onFormSubmit}
				{...rest}
			>
				{props => (
					<Form>
						{renderFields(schema.fields)}
						<button type="submit">Submit</button>
					</Form>
				)}
			</Formik>
		</SchemaProvider>
	)
}

export default RedactionForm;
