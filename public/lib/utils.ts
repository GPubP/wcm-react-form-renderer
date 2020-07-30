import { prop } from 'ramda';
import React from 'react';

import { FormSchema, FormValues, ValidationSchema } from './core.types';

export const addNameSpace = (namespace: string) => (fieldName: string): string =>
	namespace ? `${namespace}.${fieldName}` : fieldName;

export const createInitialValues = (
	schema: FormSchema,
	initialValues: Record<string, any>
): FormValues => {
	if (!Array.isArray(schema.fields)) {
		// TODO: Decide if we want to throw an error here?
		return {};
	}

	return schema.fields.reduce((acc: FormValues, field): FormValues => {
		// check if name already exist
		// TODO: Should we throw an error here?
		if (acc[field.name]) {
			return acc;
		}

		// check if field is a fieldgroup
		if (
			field.dataType === 'object' &&
			field.type === 'fieldgroup' &&
			Array.isArray(field.fields)
		) {
			acc[field.name] = createInitialValues(
				{ fields: field.fields },
				initialValues[field.name]
			);

			return acc;
		}

		// check if field is a repeater
		if (
			field.dataType === 'array' &&
			field.type === 'repeater' &&
			Array.isArray(field.fields)
		) {
			acc[field.name] = [
				{
					...createInitialValues({ fields: field.fields }, initialValues[field.name]),
				},
			];

			return acc;
		}

		if (prop(field.name)(initialValues)) {
			acc[field.name] = initialValues[field.name];
			return acc;
		}

		if (field.defaultValue !== null && field.defaultValue !== undefined) {
			acc[field.name] = field.defaultValue;
			return acc;
		}

		acc[field.name] = '';

		return acc;
	}, {});
};

export const isFunction = (obj: any): obj is Function => typeof obj === 'function';

export const isEmptyChildren = (children: any): boolean => React.Children.count(children) === 0;

export const parseValidationSchema = (
	schema: ValidationSchema,
	path?: string
): ValidationSchema => ({
	...schema,
	properties:
		schema.properties &&
		Object.keys(schema.properties).reduce((acc, key) => {
			const p = path === undefined ? key : `${path}.${key}`;
			if (schema.properties) {
				acc[key] = parseValidationSchema(schema?.properties[key], p);
			}

			return acc;
		}, {} as Record<string, ValidationSchema>),
	items: schema.items && parseValidationSchema(schema.items, `${path}[$]`),
	name: path,
});
