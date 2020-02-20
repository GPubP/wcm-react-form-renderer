import { useField } from 'formik';
import React from 'react';

import { FieldComponentProps } from './FieldComponent.types';

const FieldComponent: React.FC<FieldComponentProps> = ({
	fieldConfig,
	fieldProps,
	fieldSchema,
}: FieldComponentProps) => {
	const [, , helpers] = useField(fieldSchema.name);

	return (
		<fieldConfig.component
			fieldHelperProps={helpers}
			fieldProps={fieldProps}
			fieldSchema={fieldSchema}
		></fieldConfig.component>
	);
};

export default FieldComponent;
