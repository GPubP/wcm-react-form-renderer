import { FormSchema } from '../../core.types';

export interface SchemaContextValue {
	schema?: FormSchema;
}

export interface SchemaProviderProps  {
	value: SchemaContextValue;
}
