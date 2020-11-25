import React from 'react';
import './App.css';

import { Form, FormSchema, View } from '@redactie/form-renderer-module';

const App = () => {
	const onFormSubmit = (values: any) => {
		alert(JSON.stringify(values));
	};

	const onChange = (values: any) => {
		console.log('change', values);
	};

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
				},
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
				},
			},
			{
				name: 'hobbies',
				module: 'core',
				type: 'checkboxList',
				dataType: 'array',
				label: 'Hobbies',
				config: {
					required: true,
					allowedOptions: ['skateboarding', 'snowboarding'],
					options: [
						{
							key: '0',
							value: 'skateboarding',
							label: 'Skateboarding',
						},
						{
							key: '1',
							value: 'snowboarding',
							label: 'Snowboarding',
						},
						{
							key: '2',
							value: 'surf',
							label: 'Surf',
						},
					],
				},
			},
			{
				name: 'termsAndConditions',
				module: 'core',
				type: 'checkbox',
				dataType: 'boolean',
				label: 'I accept the Terms and conditions',
				config: {
					required: true,
				},
			},
			{
				name: 'address',
				module: 'core',
				type: 'fieldgroup',
				dataType: 'object',
				label: 'Adres',
				config: {
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non odio in risus lobortis ornare. Aenean id diam risus.',
				},
				fields: [
					{
						name: 'zipcode',
						module: 'core',
						type: 'text',
						dataType: 'string',
						label: 'Zipcode',
						config: {
							wrapperClassName: 'col-xs-6',
							required: true,
							placeholder: 'zipcode',
							description: 'Description text',
						},
					},
					{
						name: 'city',
						module: 'core',
						type: 'text',
						dataType: 'string',
						label: 'City',
						config: {
							wrapperClassName: 'col-xs-6',
							required: true,
							placeholder: 'city',
						},
					},
					{
						name: 'country',
						module: 'core',
						type: 'select',
						dataType: 'string',
						label: 'Country',
						config: {
							required: true,
							wrapperClassName: 'col-xs-12',
							allowedOptions: ['belgium', 'france'],
							options: [
								{
									key: '0',
									value: 'belgium',
									label: 'Belgium',
								},
								{
									key: '1',
									value: 'france',
									label: 'France',
								},
								{
									key: '2',
									value: 'germany',
									label: 'Germany',
								},
								{
									key: '3',
									value: 'finland',
									label: 'Finland',
								},
							],
						},
					},
				],
			},
			{
				name: 'ages',
				module: 'core',
				type: 'radio',
				dataType: 'string',
				label: 'Ages',
				config: {
					required: true,
					options: [
						{
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
						},
					],
				},
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
				},
			},
			{
				name: 'time',
				module: 'core',
				type: 'time',
				dataType: 'string',
				label: 'Time',
				config: {
					required: true,
				},
			},
			{
				name: 'dateTime',
				module: 'core',
				type: 'dateTime',
				dataType: 'string',
				label: 'Datum en tijd',
				config: {
					required: true,
					dateLabel: 'Datum',
				},
			},
			{
				name: 'children',
				module: 'core',
				type: 'repeater',
				dataType: 'array',
				label: 'Children',
				config: {
					min: 4,
					max: 5,
					description: 'Add new children',
				},
				fields: [
					{
						name: 'firstname',
						module: 'core',
						type: 'text',
						dataType: 'string',
						label: 'Firstname',
						config: {
							required: true,
							wrapperClassName: 'col-xs-6',
						},
					},
					{
						name: 'lastname',
						module: 'core',
						type: 'text',
						dataType: 'string',
						label: 'Lastname',
						config: {
							required: true,
							wrapperClassName: 'col-xs-6',
						},
					},
				],
			},
			{
				name: 'dynamicRepeater',
				module: 'core',
				type: 'dynamicRepeater',
				dataType: 'array',
				label: 'Vrije paragrafen',
				config: {
					min: 0,
					max: 5,
					description: 'Add dynamic content',
				},
				fields: [
					{
						name: 'textfield',
						module: 'core',
						type: 'text',
						dataType: 'string',
						label: 'Textfield',
						config: {
							placeholder: 'placeholder',
							id: '1',
							fieldType: { _id: 'type-text-id', uuid: 'type-text-id' },
						},
					},
					{
						name: 'textarea',
						module: 'core',
						type: 'textarea',
						dataType: 'string',
						label: 'Textarea',
						config: {
							placeholder: 'placeholder',
							id: '2',
						},
					},
					{
						name: 'repeater',
						module: 'core',
						type: 'repeater',
						dataType: 'array',
						label: 'Repeater',
						config: {
							min: 4,
							max: 5,
							description: 'Add new children',
							id: '3',
						},
						fields: [
							{
								name: 'firstname',
								module: 'core',
								type: 'text',
								dataType: 'string',
								label: 'Firstname',
								config: {
									required: true,
									wrapperClassName: 'col-xs-6',
								},
							},
							{
								name: 'lastname',
								module: 'core',
								type: 'text',
								dataType: 'string',
								label: 'Lastname',
								config: {
									required: true,
									wrapperClassName: 'col-xs-6',
								},
							},
						],
					},
					{
						name: 'address',
						module: 'core',
						type: 'fieldgroup',
						dataType: 'object',
						label: 'Adres',
						config: {
							id: '4',
							description:
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non odio in risus lobortis ornare. Aenean id diam risus.',
						},
						fields: [
							{
								name: 'zipcode',
								module: 'core',
								type: 'text',
								dataType: 'string',
								label: 'Zipcode',
								config: {
									wrapperClassName: 'col-xs-6',
									required: true,
									placeholder: 'zipcode',
									description: 'Description text',
								},
							},
							{
								name: 'city',
								module: 'core',
								type: 'text',
								dataType: 'string',
								label: 'City',
								config: {
									wrapperClassName: 'col-xs-6',
									required: true,
									placeholder: 'city',
								},
							},
							{
								name: 'country',
								module: 'core',
								type: 'select',
								dataType: 'string',
								label: 'Country',
								config: {
									required: true,
									wrapperClassName: 'col-xs-12',
									options: [
										{
											key: '0',
											value: 'belgium',
											label: 'Belgium',
										},
										{
											key: '1',
											value: 'france',
											label: 'France',
										},
										{
											key: '2',
											value: 'germany',
											label: 'Germany',
										},
										{
											key: '3',
											value: 'finland',
											label: 'Finland',
										},
									],
								},
							},
						],
					},
					{
						name: 'time',
						module: 'core',
						type: 'time',
						dataType: 'string',
						label: 'Time',
						config: {
							required: true,
						},
					},
				],
			},
		],
	};

	const validationSchema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		type: 'object',
		required: [
			'firstname',
			'lastname',
			'hobbies',
			'termsAndConditions',
			'ages',
			'address',
			'questions',
			'time',
			'dateTime',
		],
		properties: {
			firstname: {
				type: 'string',
			},
			lastname: {
				type: 'string',
			},
			hobbies: {
				type: 'array',
			},
			termsAndConditions: {
				type: 'boolean',
			},
			address: {
				type: 'object',
				properties: {
					zipcode: {
						type: 'string',
						minLength: 4,
					},
					city: {
						type: 'string',
						minLength: 1,
					},
				},
			},
			ages: {
				type: 'string',
			},
			questions: {
				type: 'string',
			},
			children: {
				type: 'array',
				minItems: 4,
				items: {
					type: 'object',
					required: ['firstname', 'lastname'],
					properties: {
						firstname: {
							type: 'string',
							minLength: 1,
						},
						lastname: {
							type: 'string',
							minLength: 1,
						},
					},
				},
			},
			time: {
				type: 'string',
				pattern: '^[0-9]{1,2}:[0-9]{1,2}$',
			},
			dateTime: {
				type: 'string',
				format: 'date-time',
			},
			dynamicRepeater: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						fieldType: {
							type: 'string',
						},
						type: {
							type: 'string',
						},
						value: {},
					},
					allOf: [
						{
							if: { properties: { fieldType: { const: 'type-text-id' } } },
							then: { properties: { value: { minLength: 3 } } },
						},
					],
				},
			},
		},
	};

	const initialValues = {
		firstname: 'John',
		lastname: 'Doe',
		hobbies: ['skateboarding', 'snowboarding'],
		address: {
			zipcode: '',
			city: '',
			// country: 'belgium',
		},
		ages: '8-10 jaar',
		questions: 'no questions',
		time: '10:30',
		children: [
			{
				firstname: 'glenn',
				lastname: 'verschooren',
			},
			{
				firstname: 'mieke',
				lastname: 'scheirs',
			},
		],
		dynamicRepeater: [
			{
				value: 'maarten',
				type: '1',
				fieldType: 'type-text-id',
			},
			{
				value: 'de weerdt',
				type: '2',
			},
			{
				value: [
					{
						firstname: 'glenn',
						lastname: 'verschooren',
					},
					{
						firstname: 'mieke',
						lastname: 'scheirs',
					},
				],
				type: '3',
			},
			{
				value: {
					zipcode: '2500',
					city: 'Lier',
					country: 'belgium',
				},
				type: '4',
			},
		],
	};

	const errorMessages = {
		firstname: {
			required: 'You must enter a name',
			minLength: 'You must enter a name',
		},
		lastname: {
			required: 'You must enter a lastname',
			minLength: 'You must enter a lastname',
		},
		'address.zipcode': {
			// eslint-disable-next-line no-template-curly-in-string
			required: '${path} You must enter a zipcode',
			// eslint-disable-next-line no-template-curly-in-string
			minLength: '${path} You must enter a zipcode',
		},
		children: {
			minItems: 'Fill in at least two children',
		},
		'children[$].firstname': {
			required: 'You muster enter the name of the child',
		},
		'children[$].lastname': {
			required: 'You muster enter the lastname of the child',
		},
		'dynamicRepeater[$].value': {
			minLength: 'Give me minimum 3',
		},
		$required: 'this is a default required message',
	};

	return (
		<div className="App">
			<div className="header">
				<h1>Redaction Form Renderer Module</h1>
			</div>
			<div className="u-margin-top">
				<h2>Form</h2>
				<div className="u-margin-top-xs">
					<Form
						validationSchema={validationSchema}
						errorMessages={errorMessages}
						onSubmit={onFormSubmit}
						initialValues={initialValues}
						onChange={onChange}
						validateWorker={false}
						schema={form}
					>
						{props => (
							<>
								<button
									data-testid="formik-submit-btn"
									className={'a-button'}
									type="submit"
								>
									Verstuur
								</button>
							</>
						)}
					</Form>
				</div>
			</div>
			<div className="u-margin-top">
				<h2>View</h2>
				<div className="u-margin-top-xs">
					<View schema={form} values={initialValues} />
				</div>
			</div>
		</div>
	);
};

export default App;
