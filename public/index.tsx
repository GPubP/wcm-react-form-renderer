import Core from '@redactie/redactie-core';

import { CustomValidator } from './lib/classes/CustomValidator/CustomValidator';
import { ErrorMessage } from './lib/components/ErrorMessage';
import { Form } from './lib/components/Form';
import { View } from './lib/components/View';
import { parseFields } from './lib/helpers';
import { fieldRegistry } from './lib/services/fieldRegistry';
import { viewRegistry } from './lib/services/viewRegistry';

// expose module
Core.modules.exposeModuleApi('forms-module', {
	Form,
	View,
	ErrorMessage,
	CustomValidator,
	fieldRegistry,
	viewRegistry,
	parseFields,
});

export * from './lib/core.types';
export * from './lib/services/fieldRegistry/fieldRegistry.types';
export * from './lib/services/viewRegistry/viewRegistry.types';
export { default as Form } from './lib/components/Form/Form';
export { default as View } from './lib/components/View/View';
export { default as FormikOnChangeHandler } from './lib/components/FormikOnChangeHandler/FormikOnChangeHandler';
export { CustomValidator } from './lib/classes/CustomValidator';
