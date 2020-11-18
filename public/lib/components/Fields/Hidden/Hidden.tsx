import { Field } from 'formik';
import React from 'react';

import { ErrorMessage } from '../../ErrorMessage';

import { HiddenProps } from './Hidden.types';

const Hidden: React.FC<HiddenProps> = ({ fieldSchema }) => {
	return (
		<>
			<Field id={fieldSchema.name} label={fieldSchema.label} type="hidden"></Field>
			<ErrorMessage name={fieldSchema.name} />
		</>
	);
};

export default Hidden;
