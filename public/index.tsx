import Core from '@redactie/redactie-core';

import ErrorMessage from './lib/components/ErrorMessage/ErrorMessage';
import Form from './lib/components/Form/Form';
import { fieldRegistry } from './lib/services';

// expose module
Core.modules.exposeModuleApi('forms-module', {
	Form,
	ErrorMessage,
	fieldRegistry,
});

export * from './lib/core.types';
export * from './lib/services/fieldRegistry/fieldRegistry.types';
