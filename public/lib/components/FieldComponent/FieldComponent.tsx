import React from 'react';
import { useField } from 'formik'
import {FieldComponentProps} from './FieldComponent.types'

const FieldComponent: React.FC<FieldComponentProps> = ({field, fieldProps, fieldSchema}) => {
	const [,, helpers] = useField(fieldSchema.name);

	return (
		<field.component fieldHelperProps={helpers} fieldProps={fieldProps} fieldSchema={fieldSchema}></field.component>
	)
}

export default FieldComponent
