import AJV, { Ajv, RequiredParams, ValidateFunction } from 'ajv';
import addKeywords from 'ajv-keywords';
import { FormikErrors, FormikValues } from 'formik';
import { lensPath, omit, path, prop, set } from 'ramda';

import { FormProps } from '../../components/Form/Form.types';

import { CustomValidatorOptions } from './CustomValidator.types';

export class CustomValidator {
	public readonly ajv: Ajv;
	private _validator: ValidateFunction | null = null;
	private _errorMessages: FormProps<FormikValues>['errorMessages'] = {};
	private _schema: boolean | object = {};

	public get validator(): ValidateFunction | null {
		return this._validator;
	}

	public get schema(): boolean | object {
		return this._schema;
	}

	public get errorMessages(): FormProps<FormikValues>['errorMessages'] {
		return this._errorMessages;
	}

	constructor(
		schema: boolean | Record<string, any>,
		errorMessages: FormProps<FormikValues>['errorMessages'],
		private _options: CustomValidatorOptions = {}
	) {
		this.ajv = new AJV({
			...omit(['log'], this._options),
			$data: true,
		});
		addKeywords(this.ajv);

		this._compile(schema, errorMessages);
	}

	public setErrorMessages(errorMessages: FormProps<FormikValues>['errorMessages']): void {
		this._compile(this._schema, errorMessages);
	}

	public setSchema(schema: boolean | object): void {
		this._compile(schema, this._errorMessages);
	}

	public validate(values: FormikValues): any {
		if (!this._validator) {
			return {};
		}

		const cleanValues = this._removeEmptyPropsFromObject(values);

		this._validator(cleanValues);

		this._log('RAW INPUT', values);
		this._log('CLEANED INPUT', cleanValues);
		this._log('RAW ERRORS', this.validator?.errors || []);

		const result = (this._validator.errors || []).reduce((acc, err): FormikErrors<any> => {
			// Skip higher order validators since another validator while define de real error
			if (['if'].includes(err.keyword)) {
				return acc;
			}

			const concatPath =
				err.keyword === 'required'
					? `${err.dataPath}.${(err.params as RequiredParams).missingProperty}`
					: err.dataPath;
			const path = concatPath
				// Replaces leading dot in path
				.replace(/^\./, '')
				// Replaces ['field-name'] notation to `field-name` (formik expects this)
				.replace(/\['(.*)'\]/g, '$1'); // TODO: look into regex/non-regex speeds
			// Replaces index notation [1] to [$] for errorMessages map
			const errorPath = path.replace(/\[([0-9])\]/g, '[$]'); // TODO: look into split/join (maybe faster?)

			const error =
				typeof this._errorMessages[errorPath] === 'string'
					? (this._errorMessages[errorPath] as string)
					: prop(err.keyword)(this._errorMessages[errorPath] as Record<string, string>) ||
					  err.message ||
					  err.keyword;
			const errorProps = {
				path: errorPath,
				keyword: err.keyword,
				message: err.message || '',
				schemaPath: err.schemaPath,
				params: err.params,
			};

			const lens = lensPath(
				path
					// Replaces index notation [1] to .1 because formik expects this
					.replace(/\[([0-9])\]/g, '.$1')
					.split('.')
					.map(key => {
						const match = key.match(/^([0-9])$/);

						return match ? parseInt(match[0]) : key;
					})
			);

			return set(lens, this._stringReplacer(error, errorProps), acc);
		}, {} as FormikErrors<any>);

		this._log('PARSED ERRORS', result);

		return result;
	}

	private _log(...args: any[]): void {
		if (this._options.log) {
			console.log('CUSTOM VALIDATOR:', ...args);
		}
	}

	private _compile(
		schema: boolean | Record<string, any>,
		errorMessages: FormProps<FormikValues>['errorMessages']
	): void {
		if (this.ajv) {
			this._schema = this._addSchemaToValidator(schema);
			this._errorMessages = errorMessages;

			try {
				this._validator = this.ajv.compile(this._schema);
			} catch (error) {
				console.error('INVALID SCHEMA!', 'Validation has been disabled', error);
			}
		}
	}

	private _stringReplacer(input: string, props: Record<string, any>): string {
		return input.replace(/\${([^{}]*)}/g, (a, b) => {
			const r = path(b.split('.'))(props);
			return typeof r !== 'object' && !(r instanceof Date)
				? (r as string | number | boolean).toString()
				: a;
		});
	}

	private _addSchemaToValidator(schema: boolean | Record<string, object>): boolean | object {
		if (typeof schema === 'boolean') {
			return schema;
		}

		if (schema.schema && !schema.$schema) {
			return {
				...omit(['schema'])(schema),
				$schema: schema.schema,
			};
		}

		return schema;
	}

	private _detectTypeAndRemoveEmptyProps(value: any): any {
		if (['', null, undefined].includes(value)) {
			return null;
		}

		if (Array.isArray(value)) {
			return this._removeEmptyPropsFromArray(value);
		}

		if (typeof value === 'object') {
			return this._removeEmptyPropsFromObject(value);
		}

		return value;
	}

	private _removeEmptyPropsFromArray(arr: any[]): any[] {
		return arr.map(val => this._detectTypeAndRemoveEmptyProps(val));
	}

	private _removeEmptyPropsFromObject(values: FormikValues): Record<string, any> {
		return Object.keys(values).reduce((acc, key: string) => {
			const cleanedValue = this._detectTypeAndRemoveEmptyProps(values[key]);

			if (cleanedValue === null) {
				return acc;
			}

			acc[key] = cleanedValue;

			return acc;
		}, {} as Record<string, any>);
	}
}
