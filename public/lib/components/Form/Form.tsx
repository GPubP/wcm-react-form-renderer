import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from 'formik';
import debounce from 'lodash.debounce';
import { isEmpty } from 'ramda';
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { CustomValidator } from '../../classes/CustomValidator';
import { FieldSchema, FormValues } from '../../core.types';
import { createInitialValues, isEmptyChildren, isFunction } from '../../utils';
import { FieldRenderer } from '../FieldRenderer';
import { FormikOnChangeHandler } from '../FormikOnChangeHandler';
import { SchemaProvider } from '../SchemaProvider';

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
	formikRef,
	...rest
}) => {
	const [initialFormValue, setInitialFormValue] = useState<FormValues | undefined>(initialValues);
	const validator = useMemo(
		() =>
			new CustomValidator(validationSchema, errorMessages, {
				allErrors: true,
				messages: true,
			}),
		[errorMessages, validationSchema]
	);

	/**
	 * Calculate the initial values of the form
	 * We need this because Even if your form is empty by default,
	 * you must initialize all fields with initial values otherwise React
	 * will throw an error saying that you have changed an input from uncontrolled to controlled.
	 */
	const initInitialValues = useCallback(() => {
		if (isEmpty(initialFormValue || {}) && schema) {
			setInitialFormValue(createInitialValues(schema, initialValues || {}));
		}
	}, [schema]); // eslint-disable-line react-hooks/exhaustive-deps

	/**
	 * Get the initial values everytime the given schema has changed
	 */
	useEffect(() => {
		initInitialValues();
	}, [initInitialValues]);

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
			<FieldRenderer key={`${index}-${fieldSchema.name}`} fieldSchema={fieldSchema} />
		));
	};

	// wait till the initial values are created
	if (isEmpty(initialFormValue) || !initialFormValue) {
		return null;
	}

	return (
		<SchemaProvider value={{ schema }}>
			<Formik
				innerRef={instance => isFunction(formikRef) && formikRef(instance)}
				initialValues={initialFormValue}
				enableReinitialize={true}
				onSubmit={onFormSubmit}
				validate={values => validator.validate(values)}
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
