import { useContext } from 'react';

import { FormContext, FormContextValue } from '../../context';

const useFormContext = (): FormContextValue => {
	return useContext(FormContext);
};

export default useFormContext;
