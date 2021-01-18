import React from 'react';

import { FieldSchema } from '../../../core.types';
import { addNameSpace } from '../../../utils';
import { FieldRenderer } from '../../FieldRenderer';
import { FormRendererFieldTitle } from '../../FormRendererFieldTitle';

import { FieldGroupProps } from './Fieldgroup.types';

const Fieldgroup: React.FC<FieldGroupProps> = ({ fieldSchema }) => {
	const config = fieldSchema.config || {};
	const fields = Array.isArray(fieldSchema.fields) ? fieldSchema.fields : [];
	const withNamespace = addNameSpace(fieldSchema.name);
	const isRequired = config.required;

	return (
		<div className={config.wrapperClassName}>
			{fieldSchema.label && (
				<FormRendererFieldTitle isRequired={isRequired} className="u-margin-bottom">
					{fieldSchema.label}
				</FormRendererFieldTitle>
			)}
			{config.description && <p className="u-margin-bottom">{config.description}</p>}
			<div className="row">
				{fields
					.map(
						(fieldSchema): FieldSchema => ({
							...fieldSchema,
							name: withNamespace(fieldSchema.name),
						})
					)
					.map((fieldSchema, index) => (
						<FieldRenderer
							key={`${index}-${fieldSchema.name}`}
							fieldSchema={fieldSchema}
						/>
					))}
			</div>
		</div>
	);
};

export default Fieldgroup;
