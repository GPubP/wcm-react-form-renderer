import { FieldSchema } from '../../../core.types';

export interface RepeaterProps {
	/**
	 * Fieldschema
	 * This is a partial of FormSchema
	 * But it only holds the schema information for a field
	 */
	fieldSchema: FieldSchema;
}

export interface RepeaterValue<V = any> {
	uuid: string;
	value: V;
}
