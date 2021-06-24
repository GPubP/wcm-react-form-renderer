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
}
