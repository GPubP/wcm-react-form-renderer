import { FieldRendererRenderContext } from '../../context';
import { FieldSchema } from '../../core.types';

export interface FieldRendererProps {
	/**
	 * Schema of one field
	 */
	fieldSchema: FieldSchema;
	level?: number;
	renderContext?: Omit<FieldRendererRenderContext, 'wrapperClass'>;
	defaultWrapperClassName?: string;
	/**
	 * Part of validation schema
	 * This is a JSON schema config object
	 * https://json-schema.org/
	 */
	validationProperty?: any;
}
