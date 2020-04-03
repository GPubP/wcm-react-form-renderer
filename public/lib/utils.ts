import React from 'react';

import { FormSchema, FormValues } from './core.types';

export const addNameSpace = (namespace: string) => (fieldName: string): string =>
	namespace ? `${namespace}.${fieldName}` : fieldName;

export const createInitialValues = (schema: FormSchema): FormValues => {
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
			acc[field.name] = createInitialValues({ fields: field.fields });

			return acc;
		}

		acc[field.name] = '';

		return acc;
	}, {});
};

export const isFunction = (obj: any): obj is Function => typeof obj === 'function';

export const isEmptyChildren = (children: any): boolean => React.Children.count(children) === 0;
