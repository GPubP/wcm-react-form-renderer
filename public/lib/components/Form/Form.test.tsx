import { render, RenderResult } from '@testing-library/react';
import React from 'react';

import { FieldDataType, FormValues } from '../../core.types';

import Form from './Form';
import { FormProps } from './Form.types';

jest.mock('schema-to-yup', () => ({
	buildYup: () => ({}),
}));

const renderForm = (props?: Partial<FormProps<FormValues>>): RenderResult => {
	const validationSchema = {};
	const errorMessages = {};
	const defaultProps: FormProps<FormValues> = {
		validationSchema,
		errorMessages,
		onSubmit: () => {
			return;
		},
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
	it('should display a blank form when no schema is given', async () => {
		const { findByTestId } = renderForm();
		const formikForm = await findByTestId('formik-form');

		// Since there are no fields only the button is visible to the user
		expect(formikForm.children.length).toBe(1);
	});

	it('should display a full form when a schema is given', async () => {
		const { findByTestId } = renderForm({
			schema: {
				fields: [
					{
						name: 'name',
						module: 'core',
						type: 'text',
						// TODO: Investigate why we need to cast the dataType
						dataType: 'string' as FieldDataType,
						label: 'name',
					},
					{
						name: 'lastname',
						module: 'core',
						type: 'text',
						// TODO: Investigate why we need to cast the dataType
						dataType: 'string' as FieldDataType,
						label: 'lastname',
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
						// TODO: Investigate why we need to cast the dataType
						dataType: 'string' as FieldDataType,
						label: 'name',
					},
					{
						name: 'lastname',
						module: 'core',
						type: 'text',
						// TODO: Investigate why we need to cast the dataType
						dataType: 'string' as FieldDataType,
						label: 'lastname',
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
});
