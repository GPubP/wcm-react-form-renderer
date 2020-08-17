import React, { FC } from 'react';

import { FieldSchema } from '../../../core.types';
import { ViewFieldProps } from '../../../services/viewRegistry/viewRegistry.types';
import ViewRenderer from '../../ViewRenderer/ViewRenderer';

const RepeaterView: FC<ViewFieldProps> = ({ value, fieldSchema }) => {
	const { fields = [] } = fieldSchema;

	if (!Array.isArray(value)) {
		return null;
	}

	return (
		<>
			{value.length > 0 &&
				value.map((v, index) => {
					return (
						<>
							{fields
								.map((schema: FieldSchema) => ({
									...schema,
									name: `${fieldSchema.name}.${index}.${schema.name}`,
								}))
								.map((schema, index) => (
									<ViewRenderer key={index} fieldSchema={schema} />
								))}
						</>
					);
				})}
		</>
	);
};

export default RepeaterView;
