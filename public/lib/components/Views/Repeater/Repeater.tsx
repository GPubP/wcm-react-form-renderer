import React, { FC } from 'react';

import { FieldSchema } from '../../../core.types';
import { ViewFieldProps } from '../../../services/viewRegistry';
import { ViewRenderer } from '../../ViewRenderer';

const RepeaterView: FC<ViewFieldProps> = ({ value, fieldSchema }) => {
	const { fields = [] } = fieldSchema;

	if (!Array.isArray(value)) {
		return null;
	}

	return (
		<>
			{value.length > 0 &&
				value.map((v, index) => {
					return fields.map((schema: FieldSchema) => {
						const viewSchema = {
							...schema,
							name: `${fieldSchema.name}.${index}.${schema.name}`,
						};

						return (
							<ViewRenderer
								key={`${index}-${viewSchema.name}`}
								fieldSchema={viewSchema}
							/>
						);
					});
				})}
		</>
	);
};

export default RepeaterView;
