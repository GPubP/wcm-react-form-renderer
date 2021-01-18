import Core from '@redactie/redactie-core';

import { CustomValidator, CustomValidatorWorker } from './lib/classes';
import { ErrorMessage } from './lib/components/ErrorMessage';
import { Form } from './lib/components/Form';
import { FormRendererFieldTitle } from './lib/components/FormRendererFieldTitle';
import { View } from './lib/components/View';
import { FieldRendererContext } from './lib/context';
import { parseFields } from './lib/helpers';
import { useFieldRendererContext, useFormContext } from './lib/hooks';
import { fieldRegistry } from './lib/services/fieldRegistry';
import { viewRegistry } from './lib/services/viewRegistry';

// Expose module
Core.modules.exposeModuleApi('forms-module', {
	Form,
	View,
	ErrorMessage,
	CustomValidator,
	CustomValidatorWorker,
	fieldRegistry,
	viewRegistry,
	parseFields,
	useFieldRendererContext,
	useFormContext,
	FieldRendererContext,
	FormRendererFieldTitle,
});

export * from './lib/core.types';
export * from './lib/services/fieldRegistry/fieldRegistry.types';
export * from './lib/services/viewRegistry/viewRegistry.types';
export * from './lib/context/FieldRendererContext/FieldRendererContext.types';
export * from './lib/context/FormContext/FormContext.types';
export { DEFAULT_ALLOWED_HEADERS } from './lib/components/Form';
export { default as Form } from './lib/components/Form/Form';
export { default as View } from './lib/components/View/View';
export { default as FormikOnChangeHandler } from './lib/components/FormikOnChangeHandler/FormikOnChangeHandler';
export { CustomValidator } from './lib/classes/CustomValidator';
export { FieldRendererStyles } from './lib/components/FieldRenderer';
