import { FieldSchema } from '../../../core.types';

export interface DynamicRepeaterProps {
	/**
	 * Fieldschema
	 * This is a partial of FormSchema
	 * But it only holds the schema information for a field
	 */
	fieldSchema: FieldSchema;
}

export interface DynamicRepeaterItem {
	value: unknown;
	type: string;
	fieldRef: string;
	fieldType: string;
	preset?: string;
}
