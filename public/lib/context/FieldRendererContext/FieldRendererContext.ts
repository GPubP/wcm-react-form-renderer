import { createContext } from 'react';

import { FieldRenderContextValue } from './FieldRendererContext.types';

const FieldRendererContext = createContext<FieldRenderContextValue>({
	/* Use -1 because first level immediatly does a +1 when rendering a field */
	level: -1,
});

export default FieldRendererContext;
