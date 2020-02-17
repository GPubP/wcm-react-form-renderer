//import React, { FC } from 'react';
import Core from '@redactie/redactie-core';

import RedactionForm from './lib/components/Form/Form';
//import { FormSchema } from './lib/core.types';
import { fieldRegistry } from './lib/services';


/**
 * FormsRouteComponent can be used to test the FormsComponent in the Redactie POC
 * Steps to make it work:
 * 	- prepare the ckeditor module for testing in poc
 * 	- uncomment following code and imports
 * 	- add " && cp dist/redactie-form-renderer.umd.js ../core-app/public/redactie-form-renderer.js" to the build script in package.json

const FormsRouteComponent: FC = () => {

	const form: FormSchema = {
		fields: [
			{
				name: 'firstname',
				module: 'ckeditor-module',
				type: 'ckeditor',
				dataType: 'string',
				label: 'Firstname',
			},
			{
				name: 'lastname',
				module: 'core',
				type: 'text',
				dataType: 'string',
				label: 'Lastname',
				config: {
					placeholder: 'lastname',
				},
			},
		],
	}

	return (
		<>
			<h1>Forms Module Route</h1>
			<RedactionForm onSubmit={(value) => { console.log('submit', value) }} schema={form} />
		</>
	)
};

// register formsrenderer route
Core.routes.register({
	path: '/formsrenderer',
	component: FormsRouteComponent,
	label: 'Forms Renderer',
});

*
*
*/

// expose module
Core.modules.exposeModuleApi('forms-module', {
	'form': RedactionForm,
	'fieldRegistry': fieldRegistry,
});

export * from './lib/core.types';
export * from './lib/services/fieldRegistry/fieldRegistry.types';

export {
	RedactionForm,
};
