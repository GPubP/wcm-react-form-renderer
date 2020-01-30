import { RedactionFormSchema } from '../../core.types';

export interface SchemaContextValue {
	schema?: RedactionFormSchema;
}

export interface SchemaProviderProps  {
	value: SchemaContextValue;
}
