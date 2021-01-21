import { useContext } from 'react';

import { FieldRenderContextValue, FieldRendererContext } from '../../context';

const useFieldRendererContext = (): FieldRenderContextValue => useContext(FieldRendererContext);

export default useFieldRendererContext;
