import React from 'react';

import { SchemaContextValue, SchemaProviderProps } from './SchemaProvider.types';

const SchemaContext = React.createContext<SchemaContextValue>({});

/**
 * Use the context api to allow each field inside the form to access the form schema
 */
const SchemaProvider: React.FC<SchemaProviderProps> = ({
	value,
	children,
}: SchemaProviderProps) => (
	<SchemaContext.Provider value={value}>{children}</SchemaContext.Provider>
);

export default SchemaProvider;
