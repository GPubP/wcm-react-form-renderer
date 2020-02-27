import Core from '@redactie/redactie-core';
import React, { FC } from 'react';

import RedactionForm from './lib/components/Form/Form';
import { FormSchema } from './lib/core.types';
import { fieldRegistry } from './lib/services';

/**
 * for now, FormsRouteComponent is used as Demo code.
 */

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
	};

	const validationSchema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		type: 'object',
		properties: {
			firstname: {
				type: 'string',
				required: true,
			},
			lastname: {
				type: 'string',
				required: true,
			},
		},
	};

	const errorMessages = {
		firstname: {
			required: 'You must enter a name',
		},
		lastname: {
			required: 'You must enter a lastname',
		},
	};

	return (
		<>
			<h1>Forms Module Route</h1>
			<RedactionForm
				validationSchema={validationSchema}
				errorMessages={errorMessages}
				onSubmit={value => {
					console.log('submit', value);
				}}
				schema={form}
			/>
		</>
	);
};

// expose module
Core.modules.exposeModuleApi('forms-module', {
	form: RedactionForm,
	fieldRegistry: fieldRegistry,
});

const sitesModule = Core.modules.getModuleAPI('sites-module');

// expose route on /sites
if (sitesModule) {
	sitesModule.routes.register({
		component: FormsRouteComponent,
		label: 'form',
		path: '/form',
	});
}

export * from './lib/core.types';
export * from './lib/services/fieldRegistry/fieldRegistry.types';

export { RedactionForm };
