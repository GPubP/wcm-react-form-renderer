import { FieldProps } from 'formik';

import { FieldSchema } from '../../core.types';
import { FieldConfig } from '../../services/fieldRegistry';

export interface FieldRenderContextValue {
	level: number;
	fieldConfig?: FieldConfig;
	/**
	 * Schema of one field
	 * declaration of how the field would look like
	 */
	fieldSchema?: FieldSchema;
	fieldProps?: FieldProps<any, {}>;
}
