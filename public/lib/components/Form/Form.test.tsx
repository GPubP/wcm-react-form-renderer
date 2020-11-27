/* eslint-disable @typescript-eslint/no-empty-function */
import { render, RenderResult } from '@testing-library/react';
import { FormikProps } from 'formik';
import React from 'react';

import { FormValues } from '../../core.types';

import Form from './Form';
import { FormProps } from './Form.types';

jest.mock('@redactie/schema-to-yup', () => ({
	buildYup: () => ({}),
	ErrorMessageHandler: class ErrorMessageHandlerMock {},
}));

const renderForm = (props?: Partial<FormProps<FormValues>>): RenderResult => {
	const validationSchema = {};
	const errorMessages = {};
	const defaultProps: FormProps<FormValues> = {
		validationSchema,
		errorMessages,
		validateWorker: false,
		onSubmit: () => {
			return;
		},
		log: false,
		schema: { fields: [] },
	};
	return render(
		<Form {...defaultProps} {...props}>
			{() => (
				<>
					<button data-testid="formik-submit-btn" className={'a-button'} type="submit">
						Submit
					</button>
				</>
			)}
		</Form>
	);
};

describe('<Form />', () => {
	it('should display a full form when a schema is given', async () => {
		const { findByTestId } = renderForm({
			schema: {
				fields: [
					{
						name: 'name',
						module: 'core',
						type: 'text',
						dataType: 'string',
						label: 'name',
						uuid: 'some-uuid-1',
					},
					{
						name: 'lastname',
						module: 'core',
						type: 'text',
						dataType: 'string',
						label: 'lastname',
						uuid: 'some-uuid-2',
					},
				],
			},
		});
		const formikForm = await findByTestId('formik-form');

		// Two field plus a button === 3
		expect(formikForm.children.length).toBe(3);
	});

	it('should set the form with initial values', () => {
		const formProps = {
			schema: {
				fields: [
					{
						name: 'name',
						module: 'core',
						type: 'text',
						dataType: 'string',
						label: 'name',
						uuid: 'some-uuid-1',
					},
					{
						name: 'lastname',
						module: 'core',
						type: 'text',
						dataType: 'string',
						label: 'lastname',
						uuid: 'some-uuid-2',
					},
				],
			},
			initialValues: {
				name: 'John',
				lastname: 'Doe',
			},
		};
		const { getByLabelText } = renderForm(formProps);

		expect(getByLabelText(formProps.schema.fields[0].label).getAttribute('value')).toBe(
			formProps.initialValues.name
		);
		expect(getByLabelText(formProps.schema.fields[1].label).getAttribute('value')).toBe(
			formProps.initialValues.lastname
		);
	});

	it('should get access to the formik instance when using the formikRef function', () => {
		let formikReference: FormikProps<FormValues> | undefined;
		const formProps = {
			schema: {
				fields: [],
			},
			initialValues: {},
			formikRef: (instance: FormikProps<FormValues>) => (formikReference = instance),
		};
		renderForm(formProps);
		if (formikReference) {
			expect(formikReference.isValid).toBe(true);
		}
	});

	describe('<Field/>', () => {
		describe('config', () => {
			const formProps = {
				schema: {
					fields: [
						{
							name: 'name',
							module: 'core',
							type: 'text',
							dataType: 'string',
							label: 'name',
							uuid: 'some-uuid-1',
							config: {
								wrapperClassName: 'wrapperClass',
							},
						},
					],
				},
				initialValues: {
					name: 'John',
				},
			};

			it('should add a wrapper class to a field', () => {
				const { container } = renderForm(formProps);
				const element = container.getElementsByClassName('wrapperClass')[0];

				expect(element).toBeTruthy();
			});
		});
	});
});
