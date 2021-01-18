import { createContext } from 'react';

import { FieldRenderContextValue } from './FieldRendererContext.types';

const FieldRendererContext = createContext<FieldRenderContextValue>({
	level: 0,
});

export default FieldRendererContext;
