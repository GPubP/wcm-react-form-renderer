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
				name: 'hobbies',
				module: 'core',
				type: 'checkboxList',
				dataType: 'array',
				label: 'Hobbies',
				config: {
					required: true,
					allowedOptions: ['skateboarding', 'snowboarding', 'surf'],
					options: [
						{
							value: {
								key: '0',
								value: 'skateboarding',
								label: 'Skateboarding',
							},
						},
						{
							value: {
								key: '1',
								value: 'snowboarding',
								label: 'Snowboarding',
							},
						},
						{
							value: {
								key: '2',
								value: 'surf',
								label: 'Surf',
							},
						}
					],
				},
			},
			{
				name: 'address',
				module: 'core',
				type: 'fieldgroup',
				dataType: 'object',
				label: 'Address',
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
									value: {
										key: '0',
										value: 'belgium',
										label: 'Belgium',
									},
								},
								{
									value: {
										key: '1',
										value: 'france',
										label: 'France',
									},
								},
								{
									value: {
										key: '2',
										value: 'germany',
										label: 'Germany',
									},
								},
								{
									value: {
										key: '3',
										value: 'finland',
										label: 'Finland',
									},
								}
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
			{
				name: 'videoEmbed',
				module: 'core',
				type: 'videoEmbed',
				dataType: 'string',
				label: 'Video Embed',
				config: {
					required: true,
				},
			},
		],
	};

	const validationSchema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		type: 'object',
		required: [
			'hobbies',
			'address',
			'time',
		],
		properties: {
			hobbies: {
				type: 'array',
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
			time: {
				type: 'string',
				pattern: '^[0-9]{1,2}:[0-9]{1,2}$',
			},
			videoEmbed: {
				type: 'string',
			}
		},
	};

	const initialValues = {
		hobbies: ['skateboarding', 'snowboarding'],
		address: {
			zipcode: '2350',
			city: 'Vosselaar',
			country: 'belgium',
		},
		time: '10:30',
		videoEmbed: 'youtu.be/SFmpPtl2IQI'
	};

	const errorMessages = {};

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
