import React from 'react';
import { useField } from 'formik';
import { FieldComponentProps } from './FieldComponent.types';

const FieldComponent: React.FC<FieldComponentProps> = ({ fieldConfig, fieldProps, fieldSchema }) => {
	const [, , helpers] = useField(fieldSchema.name);

	return (
		<fieldConfig.component fieldHelperProps={helpers} fieldProps={fieldProps} fieldSchema={fieldSchema}></fieldConfig.component>
	);
};

export default FieldComponent;
