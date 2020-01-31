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
				label: 'Firstname'
			},
			{
				name: 'lastname',
				module: 'core',
				type: 'text',
				label: 'Lastname'
			},
			{
				name: 'zipcode',
				module: 'core',
				type: 'text',
				label: 'Zipcode'
			},
			{
				name: 'city',
				module: 'core',
				type: 'text',
				label: 'City'
			},
			{
				name: 'country',
				module: 'core',
				type: 'text',
				label: 'Country'
			}
		]
	}

	return (
		<div className="App">
			<RedactionForm onSubmit={onFormSubmit} schema={ form } />
		</div>
	);
}

export default App;
