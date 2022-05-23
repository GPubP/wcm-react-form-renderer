import Core from '@redactie/redactie-core';

import * as API from './api';

export const registerFormsModule = (): void => {
	Core.modules.exposeModuleApi('forms-module', API);
};

export { API };
