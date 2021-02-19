import { createContext } from 'react';

import { FieldRenderContextValue } from './FieldRendererContext.types';

const FieldRendererContext = createContext<FieldRenderContextValue>({
	/* Use -1 because first level immediatly does a +1 when rendering a field */
	level: -1,
	renderContext: {
		wrapperClass: 'col-xs-12',
	},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setWrapperClass: () => {},
});

export default FieldRendererContext;
