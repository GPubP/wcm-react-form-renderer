import { registerFormsModule } from './lib/api';

registerFormsModule();

export * from './lib/core.types';
export * from './lib/services/fieldRegistry/fieldRegistry.types';
export * from './lib/services/viewRegistry/viewRegistry.types';
export * from './lib/context/FieldRendererContext/FieldRendererContext.types';
export * from './lib/context/FormContext/FormContext.types';
export * from './lib/helpers/parseFields/parseFields.types';
export * from './lib/helpers/getValueSyncMap/getValueSyncMap.types';
export { default as Form } from './lib/components/Form/Form';
export { default as View } from './lib/components/View/View';
export { default as CompareView } from './lib/components/CompareView/CompareView';
export { default as FormikOnChangeHandler } from './lib/components/FormikOnChangeHandler/FormikOnChangeHandler';
export { CustomValidator } from './lib/classes/CustomValidator';
export { FieldRendererStyles } from './lib/components/FieldRenderer';
