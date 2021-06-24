import { FieldProps } from 'formik';

import { FieldSchema } from '../../core.types';
import { FieldConfig } from '../../services/fieldRegistry/fieldRegistry.types';

export interface FieldComponentProps {
	fieldConfig: FieldConfig;
	fieldProps: FieldProps<any, {}>;
	/**
	 * Schema of one field
	 * declaration of how the field would look like
	 */
	fieldSchema: FieldSchema;
}
