import { FormSchema } from '../../core.types';

export interface SchemaContextValue {
	/**
	 * Form schema
	 */
	schema?: FormSchema;
}

export interface SchemaProviderProps {
	/**
	 * Context value
	 */
	value: SchemaContextValue;

	/**
	 * Nested components
	 */
	children?: React.ReactNode;
}
