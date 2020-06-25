import React from 'react';

import { FieldSchema } from '../../../core.types';
import { addNameSpace } from '../../../utils';
import FieldRenderer from '../../FieldRenderer/FieldRenderer';

import { FieldGroupProps } from './Fieldgroup.types';

const Fieldgroup: React.FC<FieldGroupProps> = ({ fieldSchema }) => {
	const config = fieldSchema.config || {};
	const fields = Array.isArray(fieldSchema.fields) ? fieldSchema.fields : [];
	const withNamespace = addNameSpace(fieldSchema.name);

	return (
		<div className={config.wrapperClassName}>
			<h6 className="u-margin-bottom-xs">{fieldSchema.label}</h6>
			{config.description ? <p className="u-margin-bottom "> {config.description} </p> : null}
			<div className="row">
				{fields
					.map(
						(fieldSchema): FieldSchema => ({
							...fieldSchema,
							name: withNamespace(fieldSchema.name),
						})
					)
					.map((fieldSchema, index) => (
						<FieldRenderer key={index} fieldSchema={fieldSchema} />
					))}
			</div>
		</div>
	);
};

export default Fieldgroup;
