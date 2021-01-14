import { createContext } from 'react';

import { FormContextValue } from './FormContext.types';

const FormContext = createContext<FormContextValue>({
	useDividers: false,
	allowedHeaders: [],
});

export default FormContext;
