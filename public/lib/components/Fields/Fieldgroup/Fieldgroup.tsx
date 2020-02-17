import React from 'react';

import FieldRenderer from '../../FieldRenderer/FieldRenderer';
import { FieldSchema } from '../../../core.types';
import addNamespace from '../../../utils/addNamespace/addNamespace';

import { FieldGroupProps } from './Fieldgroup.types';

const Fieldgroup: React.FC<FieldGroupProps> = ({
	fieldSchema,
}) => {
	const fields = Array.isArray(fieldSchema.fields) ? fieldSchema.fields : [];
	const withNamespace = addNamespace(fieldSchema.name);

	return (
		<div className='field-group'>
			<label>{ fieldSchema.label } </label>
			<div className='field-group__wrapper'>
				{ fields
					.map((fieldSchema): FieldSchema => ({
						...fieldSchema,
						name: withNamespace(fieldSchema.name),
					}))
					.map((fieldSchema, index) => <FieldRenderer key={index} fieldSchema={fieldSchema} />) }
			</div>
		</div>
	);
};

export default Fieldgroup;

