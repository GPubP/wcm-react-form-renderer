import { FormikValues, useFormikContext, FieldArray, Field } from 'formik';
import React from 'react';

import { FieldSchema } from '../../../core.types';
import FieldRenderer from '../../FieldRenderer/FieldRenderer';

import { RepeaterProps } from './Repeater.types';

const Repeater: React.FC<RepeaterProps> = ({ fieldSchema }) => {
	const config = fieldSchema.config || {};
	const fields = Array.isArray(fieldSchema.fields) ? fieldSchema.fields : [];

	const { values } = useFormikContext<FormikValues>();
	const value = values[fieldSchema.name];

	// render a field array

	console.log(value);

	return (
		<>
			<FieldArray
				name={fieldSchema.name}
				render={arrayHelpers => (
					<div>
						{value && value.length > 0
							? value.map((value: any, index: number) => {
									return fields
										.map(
											(schema): FieldSchema => ({
												...schema,
												name: `${fieldSchema.name}.${index}.${schema.name}`,
											})
										)
										.map((schema, index) => (
											<FieldRenderer key={index} fieldSchema={schema} />
										));
							  })
							: null}
					</div>
				)}
			></FieldArray>
		</>
	);
};

export default Repeater;
