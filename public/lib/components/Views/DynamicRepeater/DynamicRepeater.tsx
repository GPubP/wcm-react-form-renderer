import { FormikValues } from 'formik';
import React, { FC } from 'react';

import { FieldSchema } from '../../../core.types';
import { ViewFieldProps } from '../../../services/viewRegistry';
import { ViewRenderer } from '../../ViewRenderer';

const DynamicRepeaterView: FC<ViewFieldProps> = ({ fieldSchema, value }) => {
	const { fields = [] } = fieldSchema;

	/**
	 * Methods
	 */
	const getFieldSchema = (fieldValue: FormikValues): FieldSchema | null => {
		const fieldSchema = fields.find((field: FieldSchema) => {
			return (
				field.config?.preset?._id === fieldValue.type ||
				field.config?.preset === fieldValue.type ||
				field.config?.id === fieldValue.type ||
				field.type === fieldValue.type
			);
		});

		return fieldSchema ? fieldSchema : null;
	};

	if (!Array.isArray(value)) {
		return null;
	}

	return (
		<>
			{value.length > 0 &&
				value
					.map(v => getFieldSchema(v))
					.map((schema, index) => {
						if (!schema) {
							return null;
						}

						return {
							...schema,
							name: `${fieldSchema.name}.${index}.value`,
						};
					})
					.map((schema, index) => {
						return (
							<>
								{schema ? (
									<ViewRenderer
										key={`${index}-${schema.name}`}
										fieldSchema={schema}
									/>
								) : null}
							</>
						);
					})}
		</>
	);
};

export default DynamicRepeaterView;
