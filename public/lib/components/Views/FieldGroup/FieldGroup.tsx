import React, { FC } from 'react';

import { FieldSchema } from '../../../core.types';
import { ViewFieldProps } from '../../../services/viewRegistry';
import { addNameSpace } from '../../../utils';
import { ViewRenderer } from '../../ViewRenderer';

const FieldGroupView: FC<ViewFieldProps> = ({ fieldSchema }) => {
	const { fields = [] } = fieldSchema;
	const withNamespace = addNameSpace(fieldSchema.name);

	return (
		<>
			{fields.map((schema: FieldSchema, index) => {
				const fieldGroupSchema = {
					...schema,
					name: withNamespace(schema.name),
				};

				return (
					<ViewRenderer
						key={`${index}-${fieldGroupSchema.name}`}
						fieldSchema={fieldGroupSchema}
					/>
				);
			})}
		</>
	);
};

export default FieldGroupView;
