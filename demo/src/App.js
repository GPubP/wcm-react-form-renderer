import React from 'react';
import logo from './logo.svg';
import './App.css';

import { RedactionForm } from 'redactie-form-renderer';

function App() {

	const form = {
		fields: [
			{
				name: 'firstname',
				type: 'text',
				label: 'Firstname'
			},
			{
				name: 'lastname',
				type: 'text',
				label: 'Lastname'
			},
			{
				name: 'lastname-2',
				type: 'text',
				label: 'Lastname'
			},
			{
				name: 'lastname-3',
				type: 'text',
				label: 'Lastname'
			}
		]
	}

  return (
    <div className="App">
			<RedactionForm schema={ form } />
    </div>
  );
}

export default App;
