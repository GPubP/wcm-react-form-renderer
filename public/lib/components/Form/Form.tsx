import { usePrevious, useTenantContext, useWillUnmount } from '@redactie/utils';
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from 'formik';
import debounce from 'lodash.debounce';
import { equals, isEmpty } from 'ramda';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';

import { CustomValidator, CustomValidatorWorker } from '../../classes';
import { FormContext } from '../../context';
import { FieldSchema, FormValues } from '../../core.types';
import { createInitialValues, isEmptyChildren, isFunction } from '../../utils';
import { FieldRenderer } from '../FieldRenderer';
import { FormikOnChangeHandler } from '../FormikOnChangeHandler';

import { DEFAULT_ALLOWED_HEADERS } from './Form.const';
import { FormProps } from './Form.types';

const RedactionForm: React.FC<FormProps<FormValues>> = ({
	schema,
	onSubmit,
	onChange,
	validationSchema,
	errorMessages,
	initialValues,
	children,
	validateWorker = true,
	delay = 300,
	formikRef,
	useDividers = false,
	allowedHeaders = DEFAULT_ALLOWED_HEADERS,
	activeLanguage,
	...rest
}) => {
	const [initialFormValue, setInitialFormValue] = useState<FormValues | undefined>(initialValues);
	const [validator, setValidator] = useState<CustomValidator | CustomValidatorWorker>();
	const previousErrorMessages = usePrevious(errorMessages);
	const previousValidationSchema = usePrevious(validationSchema);
	const previousValidateWorker = usePrevious(validateWorker);
	const tenantContext = useTenantContext();

	if (!tenantContext && validateWorker) {
		throw new Error(
			'Redactie form renderer must be used within a TenantProvider when validating the form using a web worker. Check @redactie/utils package for more info'
		);
	}

	useEffect(() => {
		if (validator) {
			if (errorMessages && !equals(errorMessages, previousErrorMessages)) {
				validator.setErrorMessages(errorMessages);
			}

			if (validationSchema && !equals(validationSchema, previousValidationSchema)) {
				validator.setSchema(validationSchema);
			}
		}
	}, [
		errorMessages,
		validationSchema,
		previousErrorMessages,
		previousValidationSchema,
		validator,
	]);

	useEffect(() => {
		if (validator && previousValidateWorker === validateWorker) {
			return;
		}

		if (validateWorker) {
			const workerValidator = validator as CustomValidatorWorker;
			if (workerValidator?.terminate && typeof workerValidator.terminate === 'function') {
				workerValidator.terminate();
			}
			setValidator(
				new CustomValidatorWorker(tenantContext.tenantId, validationSchema, errorMessages, {
					allErrors: true,
					messages: true,
					log: !!window.DEBUG,
				})
			);
		}
		setValidator(
			new CustomValidator(validationSchema, errorMessages, {
				allErrors: true,
				messages: true,
				log: !!window.DEBUG,
			})
		);
	}, [
		errorMessages,
		previousValidateWorker,
		tenantContext.tenantId,
		validateWorker,
		validationSchema,
		validator,
	]);

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

	useWillUnmount(() => {
		if (validator && typeof (validator as CustomValidatorWorker).terminate === 'function') {
			(validator as CustomValidatorWorker).terminate();
		}
	});

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
		<FormContext.Provider value={{ useDividers, schema, allowedHeaders, activeLanguage }}>
			<Formik
				innerRef={instance => isFunction(formikRef) && formikRef(instance)}
				initialValues={initialFormValue}
				enableReinitialize={true}
				onSubmit={onFormSubmit}
				validate={values => validator?.validate(values)}
				{...rest}
			>
				{props => (
					<>
						{onChange ? (
							<FormikOnChangeHandler
								onChange={(values: FormikValues) => debouncedOnFormChange(values)}
							/>
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
		</FormContext.Provider>
	);
};

export default RedactionForm;
