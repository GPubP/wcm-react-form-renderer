import { FieldSchema } from '../../../core.types';

export interface DynamicRepeaterProps {
	/**
	 * Fieldschema
	 * This is a partial of FormSchema
	 * But it only holds the schema information for a field
	 */
	fieldSchema: FieldSchema;
}
