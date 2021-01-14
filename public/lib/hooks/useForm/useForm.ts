import { useContext } from 'react';

import { FormContext, FormContextValue } from '../../context';

const useForm = (): FormContextValue => {
	return useContext(FormContext);
};

export default useForm;
