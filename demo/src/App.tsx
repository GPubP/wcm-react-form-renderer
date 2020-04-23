import React from 'react';
import './App.css';

import { Form, FormSchema } from '@redactie/form-renderer-module';

const App = () => {

	const onFormSubmit = (values: any) => {
		alert(JSON.stringify(values));
	}

	const onChange = (values: any) => {
		console.log("change", values);
	}

	const form: FormSchema = {
		fields: [
			{
				name: 'firstname',
				module: 'core',
				type: 'text',
				dataType: 'string',
				label: 'Firstname',
				config: {
					required: true,
					placeholder: 'firstname',
				}
			},
			{
				name: 'lastname',
				module: 'core',
				type: 'text',
				dataType: 'string',
				label: 'Lastname',
				config: {
					required: true,
					placeholder: 'lastname',
				}
			},
			{
				name: 'address',
				module: 'core',
				type: 'fieldgroup',
				dataType: 'object',
				label: 'Adres',
				fields: [
					{
						name: 'zipcode',
						module: 'core',
						type: 'text',
						dataType: 'string',
						label: 'Zipcode',
						config: {
							required: true,
							placeholder: 'zipcode',
						}
					},
					{
						name: 'city',
						module: 'core',
						type: 'text',
						dataType: 'string',
						label: 'City',
						config: {
							required: true,
							placeholder: 'city',
						}
					},
					{
						name: 'country',
						module: 'core',
						type: 'select',
						dataType: 'string',
						label: 'Country',
						config: {
							required: true,
							options: [{
								key: '0',
								value: 'belgium',
								label: 'Belgium',
							}, {
								key: '1',
								value: 'france',
								label: 'France',
							}, {
								key: '2',
								value: 'germany',
								label: 'Germany',
							}, {
								key: '3',
								value: 'finland',
								label: 'Finland',
							}]
						}
					},
				]
			},
			{
				name: 'ages',
				module: 'core',
				type: 'radio',
				dataType: 'string',
				label: 'Ages',
				config: {
					required: true,
					options: [{
						key: '0',
						value: '1-5 jaar',
						label: '1-5 jaar',
					},
					{
						key: '1',
						value: '6-7 jaar',
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
				dataType: 'string',
				label: 'Questions',
				config: {
					required: true,
					placeholder: 'Questions?',
				}
			},
			{
				name: 'time',
				module: 'core',
				type: 'time',
				dataType: 'string',
				label: 'Time',
				config: {
					required: true,
				}
			},
		]
	}

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
			address: {
				type: 'object',
				properties: {
					zipcode: {
						type: 'string',
						required: true,
					},
					city: {
						type: 'string',
						required: true,
					},
					country: {
						type: 'string',
						required: true,
					}
				}
			},
			ages: {
				type: 'string',
				required: true,
			},
			questions: {
				type: 'string',
				required: true,
			},
			time: {
				type: 'string',
				required: true,
			},
		},
	};

	const initialValues = {
		firstname: 'John',
		lastname: 'Doe',
		address: {
			zipcode: '2500',
			city: 'Lier',
			country: 'belgium',
		},
		ages: '8-10 jaar',
		questions: 'no questions',
		time: '2020-04-23T01:40:00.000Z',
	};

	const errorMessages = {
		firstname: {
			required: 'You must enter a name',
		},
		lastname: {
			required: 'You must enter a lastname',
		},
		zipcode: {
			required: '${path} You must enter a zipcode',
		},
		$required: 'this is a default required message',
	};

	return (
		<div className='App'>
			<div className='header'>
				<h1>Redaction Form Renderer Module</h1>
			</div>
			<Form
				validationSchema={validationSchema}
				errorMessages={errorMessages}
				onSubmit={onFormSubmit}
				initialValues={initialValues}
				onChange={onChange}
				schema={form}>
					{(props) => (
						<>
							<button data-testid="formik-submit-btn" className={'a-button'} type="submit">
								Verstuur
							</button>
						</>
					)}
			</Form>
		</div>
	);
}

export default App;
