import Core from '@redactie/redactie-core';

import ErrorMessage from './lib/components/ErrorMessage/ErrorMessage';
import Form from './lib/components/Form/Form';
import View from './lib/components/View/View';
import { fieldRegistry, viewRegistry } from './lib/services';

// expose module
Core.modules.exposeModuleApi('forms-module', {
	Form,
	View,
	ErrorMessage,
	fieldRegistry,
	viewRegistry,
});

export * from './lib/core.types';
export * from './lib/services/fieldRegistry/fieldRegistry.types';
export * from './lib/services/viewRegistry/viewRegistry.types';
export { default as Form } from './lib/components/Form/Form';
export { default as View } from './lib/components/View/View';
export { default as FormikOnChangeHandler } from './lib/components/FormikOnChangeHandler/FormikOnChangeHandler';
