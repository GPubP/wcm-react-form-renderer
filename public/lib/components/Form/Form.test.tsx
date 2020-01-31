import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { FieldDataType } from '../../core.types';

import Form from './Form';
import { FormProps } from './Form.types';

const renderForm = (props?: Partial<FormProps>): RenderResult => {
	const defaultProps: FormProps = {
		onSubmit: () => {
			return;
		},
		schema: { fields: [] },
	}
	return render(<Form {...defaultProps} {...props}/>)
}

describe('<Form />', () => {
	it('should display a blank form when no schema is given', async() => {
		const { findByTestId } = renderForm();
		const formikForm = await findByTestId('formik-form');

		// Since there are no fields only the button is visible to the user
		expect(formikForm.children.length).toBe(1);
	});

	it('should display a full form when a schema is given', async() => {
		const { findByTestId } = renderForm({
			schema: {
				fields: [{
					name: 'name',
					module: 'core',
					type: 'text',
					// TODO: Investigate why we need to cast the dataType
					dataType: 'string' as FieldDataType,
					label: 'name',
				},{
					name: 'lastname',
					module: 'core',
					type: 'text',
					// TODO: Investigate why we need to cast the dataType
					dataType: 'string' as FieldDataType,
					label: 'lastname',
				}],
			},
		});
		const formikForm = await findByTestId('formik-form');

		// Two field plus a button === 3
		expect(formikForm.children.length).toBe(3);

	})

	// Test is not working properly
	// TODO: Fix this test if possible
	// it('should submit the form when clicking on the submit button', async() => {
	// 	const props = {
	// 		schema: {
	// 			fields: [{
	// 				name: 'name',
	// 				module: 'core',
	// 				type: 'text',
	// 				// TODO: Investigate why we need to cast the dataType
	// 				dataType: 'string' as FieldDataType,
	// 				label: 'name',
	// 			}],
	// 		},
	// 		onSubmit: jest.fn(),
	// 	}

	// 	const { findByRole } = renderForm(props);
	// 	const spySubmit = spyOn(props, 'onSubmit');
	// 	const submitButton = await findByRole('button');

	// 	await act( async () => {
	// 		fireEvent.click(submitButton);
	// 	});
	// 	expect(spySubmit).toHaveBeenCalledWith({
	// 		name: '',
	// 	});
	// });
});
