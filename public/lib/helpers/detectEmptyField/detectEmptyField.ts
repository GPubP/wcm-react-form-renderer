import { FieldInputProps } from 'formik';

import { FieldSchema } from '../../core.types';

export const detectEmptyField = (
	fieldSchema: FieldSchema,
	field: FieldInputProps<any>
): boolean => {
	if (fieldSchema.semanticType === 'textWithStyle') {
		return !field.value.text;
	}

	return false;
};
