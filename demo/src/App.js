import React from 'react';
import './App.css';

import { RedactionForm } from 'redactie-form-renderer';

function App() {

	const onFormSubmit = (values) => {
		alert(JSON.stringify(values));
	}

	const form = {
		fields: [
			{
				name: 'firstname',
				module: 'core',
				type: 'text',
				label: 'Firstname',
				config: {
					placeholder: 'firstname',
				}
			},
			{
				name: 'lastname',
				module: 'core',
				type: 'text',
				label: 'Lastname',
				config: {
					placeholder: 'lastname',
				}
			},
			{
				name: 'zipcode',
				module: 'core',
				type: 'text',
				label: 'Zipcode',
				config: {
					placeholder: 'zipcode',
				}
			},
			{
				name: 'zipcode-1',
				module: 'core',
				type: 'text',
				label: 'Zipcode',
				config: {
					placeholder: 'zipcode',
				}
			},
			{
				name: 'city',
				module: 'core',
				type: 'text',
				label: 'City',
				config: {
					placeholder: 'city',
				}
			},
			{
				name: 'country',
				module: 'core',
				type: 'select',
				label: 'Country',
				config: {
					options: [{
						key: '0',
						value: 'belgium',
						label: 'Belgium',
					},{
						key: '1',
						value: 'france',
						label: 'France',
					},{
						key: '2',
						value: 'germany',
						label: 'Germany',
					},{
						key: '3',
						value: 'finland',
						label: 'Finland',
					}]
				}
			},
			{
				name: 'ages',
				module: 'core',
				type: 'radio',
				label: 'Ages',
				config: {
					options: [{
						key: '0',
						value: '1-5 jaar',
						label: '1-5 jaar',
					},
					{
						key: '1',
						value:'6-7 jaar',
						label: '6-7 jaar',
					},
					{
						key: '2',
						value: '8-10 jaar',
						label: '8-10 jaar',
					},
					{
						key: '3',
						value: '11-12 jaar',
						label: '11-12 jaar',
					}],
				}
			},
			{
				name: 'questions',
				module: 'core',
				type: 'textarea',
				label: 'Questions',
				config: {
					placeholder: 'Questions?',
				}
			}
		]
	}

	return (
		<div className='App'>
			<div className='header'>
				<h1>Redaction Form Renderer Module</h1>
			</div>
			<RedactionForm onSubmit={onFormSubmit} schema={ form } />
		</div>
	);
}

export default App;
