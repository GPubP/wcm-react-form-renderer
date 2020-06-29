import { useField } from 'formik';
import { omit } from 'ramda';
import React from 'react';

import { FieldComponentProps } from './FieldComponent.types';

const FieldComponent: React.FC<FieldComponentProps> = ({
	fieldConfig,
	fieldProps,
	fieldSchema,
}: FieldComponentProps) => {
	const [, , helpers] = useField(fieldSchema.name);
	const schema = omit(['config.wrapperClassName'], fieldSchema || {});

	return (
		<div className={`${fieldSchema.config?.wrapperClassName} u-margin-bottom`}>
			<fieldConfig.component
				fieldHelperProps={helpers}
				fieldProps={fieldProps}
				fieldSchema={schema}
			></fieldConfig.component>
		</div>
	);
};

export default FieldComponent;
