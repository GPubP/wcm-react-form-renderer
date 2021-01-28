import React, { FC } from 'react';

import { FieldSchema } from '../../../core.types';
import { ViewFieldProps } from '../../../services/viewRegistry';
import { DynamicRepeaterItem } from '../../Fields/DynamicRepeater';
import { ViewRenderer } from '../../ViewRenderer';

const DynamicRepeaterView: FC<ViewFieldProps> = ({ fieldSchema, value }) => {
	const { fields = [] } = fieldSchema;

	/**
	 * Methods
	 */
	const getFieldSchema = (fieldValue: DynamicRepeaterItem): FieldSchema | null => {
		const fieldSchema = fields.find((field: FieldSchema) => {
			return field.uuid === fieldValue.fieldRef;
		});

		return fieldSchema ? fieldSchema : null;
	};

	if (!Array.isArray(value)) {
		return null;
	}

	return (
		<>
			{value.length > 0 &&
				value.map((v, index) => {
					const baseSchema = getFieldSchema(v);

					if (!baseSchema) {
						return null;
					}

					const schema = {
						...baseSchema,
						name: `${fieldSchema.name}.${index}.value`,
					};

					return <ViewRenderer key={`${index}-${schema.name}`} fieldSchema={schema} />;
				})}
		</>
	);
};

export default DynamicRepeaterView;
