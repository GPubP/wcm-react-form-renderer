import { useContext } from 'react';

import { FormContext, FormContextValue } from '../../context';

const useFormContext = (): FormContextValue => useContext(FormContext);

export default useFormContext;
