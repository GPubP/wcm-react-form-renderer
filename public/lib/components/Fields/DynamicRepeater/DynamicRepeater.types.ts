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
	uuid: string;
	type: string;
	fieldRef: string;
	fieldType: string;
	semanticType: string | null;
	multiple: boolean | null;
	preset?: string;
}
