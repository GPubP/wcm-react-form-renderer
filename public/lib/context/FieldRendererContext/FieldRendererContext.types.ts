import { FieldProps } from 'formik';

import { FieldSchema } from '../../core.types';
import { FieldConfig } from '../../services/fieldRegistry';

export interface FieldRendererRenderContext {
	wrappedInCard?: boolean;
	wrappedInDashedContainer?: boolean;
	wrapperClass: string;
	renderAsRequired?: boolean;
}
export interface FieldRenderContextValue {
	level: number;
	renderContext: FieldRendererRenderContext;
	setWrapperClass: (className: string) => void;
	fieldConfig?: FieldConfig;
	/**
	 * Schema of one field
	 * declaration of how the field would look like
	 */
	fieldSchema?: FieldSchema;
	fieldProps?: FieldProps<any, {}>;
	parentContext?: FieldRenderContextValue;
}
