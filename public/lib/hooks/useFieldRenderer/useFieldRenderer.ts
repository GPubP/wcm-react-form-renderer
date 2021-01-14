import { useContext } from 'react';

import { FieldRenderContextValue, FieldRendererContext } from '../../context';

const useFieldRenderer = (): FieldRenderContextValue => {
	return useContext(FieldRendererContext);
};

export default useFieldRenderer;
