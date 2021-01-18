import { useField } from 'formik';
import { dissocPath } from 'ramda';
import React from 'react';

import { FieldSchema } from '../../core.types';

import { FieldComponentProps } from './FieldComponent.types';

const FieldComponent: React.FC<FieldComponentProps> = ({
	fieldConfig,
	fieldProps,
	fieldSchema,
}: FieldComponentProps) => {
	const [, , helpers] = useField(fieldSchema.name);
	const schema = dissocPath<FieldSchema>(['config', 'wrapperClassName'], fieldSchema || {});

	return (
		<fieldConfig.component
			fieldHelperProps={helpers}
			fieldProps={fieldProps}
			fieldSchema={schema}
		></fieldConfig.component>
	);
};

export default FieldComponent;
