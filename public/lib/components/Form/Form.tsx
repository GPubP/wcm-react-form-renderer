import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from 'formik';
import debounce from 'lodash.debounce';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { buildYup } from 'schema-to-yup';

import { FieldSchema, FormValues } from '../../core.types';
import { createInitialValues, isEmptyChildren, isFunction } from '../../utils';
import FieldRenderer from '../FieldRenderer/FieldRenderer';
import FormikOnChangeHandler from '../FormikOnChangeHandler/FormikOnChangeHandler';
import SchemaProvider from '../SchemaProvider/SchemaProvider';

import { FormProps } from './Form.types';

const RedactionForm: React.FC<FormProps<FormValues>> = ({
	schema,
	onSubmit,
	onChange,
	validationSchema,
	errorMessages,
	initialValues,
	children,
	delay = 300,
	...rest
}) => {
	const [initialFormValue, setInitialFormValue] = useState<FormValues | undefined>(initialValues);
	const [yupValidationSchema, setYupValidationSchema] = useState();

	/**
	 * Calculate the initial values of the form
	 * We need this because Even if your form is empty by default,
	 * you must initialize all fields with initial values otherwise React
	 * will throw an error saying that you have changed an input from uncontrolled to controlled.
	 */
	const initInitialValues = useCallback(() => {
		if (!initialFormValue) {
			setInitialFormValue(createInitialValues(schema));
		}
	}, [schema, initialFormValue]);

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

	const onFormSubmit = (values: FormValues, actions: FormikHelpers<FormValues>): void => {
		if (onSubmit) {
			onSubmit(values, actions);
		}
		actions.setSubmitting(false);
	};

	const onFormChange = (values: FormValues): void => {
		if (onChange) {
			return onChange(values);
		}
	};
	const debouncedOnFormChange = debounce(onFormChange, delay);

	const renderFields = (fields: FieldSchema[]): ReactNode => {
		return fields.map((fieldSchema, index) => (
			<FieldRenderer key={index} fieldSchema={fieldSchema} />
		));
	};

	// wait till the initial values are created
	if (!initialFormValue) {
		return null;
	}

	return (
		<SchemaProvider value={{ schema }}>
			<Formik
				initialValues={initialFormValue}
				onSubmit={onFormSubmit}
				validationSchema={yupValidationSchema}
				{...rest}
			>
				{props => (
					<>
						{onChange ? (
							<FormikOnChangeHandler
								onChange={(values: FormikValues) => debouncedOnFormChange(values)}
							></FormikOnChangeHandler>
						) : null}
						<Form noValidate onSubmit={props.handleSubmit} data-testid="formik-form">
							{renderFields(schema.fields)}
							{isFunction(children)
								? (children as (bag: FormikProps<FormValues>) => React.ReactNode)(
										props
								  )
								: !isEmptyChildren(children)
								? React.Children.only(children)
								: null}
						</Form>
					</>
				)}
			</Formik>
		</SchemaProvider>
	);
};

export default RedactionForm;
