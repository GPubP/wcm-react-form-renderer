import { isObject } from 'formik';
import React, { FC } from 'react';

import { ViewFieldProps } from '../../../services/viewRegistry';

const DefaultView: FC<ViewFieldProps> = ({ fieldSchema, value }) => {
	const { label } = fieldSchema;
	const isObjectValue = isObject(value);

	return (
		<div>
			{label}: {isObjectValue ? JSON.stringify(value) : value}
		</div>
	);
};

export default DefaultView;
