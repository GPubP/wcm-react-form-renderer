import { useContext } from 'react';

import { FieldRenderContextValue, FieldRendererContext } from '../../context';

const useFieldRendererContext = (): FieldRenderContextValue => {
	return useContext(FieldRendererContext);
};

export default useFieldRendererContext;
