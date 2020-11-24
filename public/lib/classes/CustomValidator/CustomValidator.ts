import AJV, { Ajv, Options, RequiredParams, ValidateFunction } from 'ajv';
import addKeywords from 'ajv-keywords';
import { FormikErrors, FormikValues } from 'formik';
import { lensPath, omit, path, prop, set } from 'ramda';

import { FormProps } from '../../components/Form';

export class CustomValidator {
	public readonly ajv: Ajv;
	public readonly validator: ValidateFunction | null = null;
	public readonly errorMessages: FormProps<FormikValues>['errorMessages'];
	public readonly schema: boolean | object;

	constructor(
		schema: boolean | Record<string, any>,
		errorMessages: FormProps<FormikValues>['errorMessages'],
		options: Options
	) {
		this.ajv = new AJV({
			...options,
			$data: true,
		});
		this.schema = this.addSchemaToValidator(schema);
		this.errorMessages = errorMessages;

		addKeywords(this.ajv);

		try {
			this.validator = this.ajv.compile(this.schema);
		} catch (error) {
			console.error('INVALID SCHEMA!', 'Validation has been disabled', error);
		}
	}

	public validate(values: FormikValues): any {
		if (!this.validator) {
			return {};
		}

		const cleanValues = this.removeEmptyPropsFromObject(values);

		this.validator(cleanValues);

		return (this.validator.errors || []).reduce((acc, err): FormikErrors<any> => {
			// Skip higher order validators since another validator while define de real error
			if (['if'].includes(err.keyword)) {
				return acc;
			}

			const concatPath =
				err.keyword === 'required'
					? `${err.dataPath}.${(err.params as RequiredParams).missingProperty}`
					: err.dataPath;
			const path = concatPath.replace(/^\./, ''); // TODO: look into regex/non-regex speeds
			const errorPath = path.replace(/\[([0-9])\]/g, '[$]'); // TODO: look into split/join (maybe faster?)

			const error =
				typeof this.errorMessages[errorPath] === 'string'
					? (this.errorMessages[errorPath] as string)
					: prop(err.keyword)(this.errorMessages[errorPath] as Record<string, string>) ||
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
					.replace(/\[([0-9])\]/g, '.$1')
					.split('.')
					.map(key => {
						const match = key.match(/^([0-9])$/);

						return match ? parseInt(match[0]) : key;
					})
			);

			return set(lens, this.stringReplacer(error, errorProps), acc);
		}, {} as FormikErrors<any>);
	}

	private stringReplacer(input: string, props: Record<string, any>): string {
		return input.replace(/\${([^{}]*)}/g, (a, b) => {
			const r = path(b.split('.'))(props);
			return typeof r !== 'object' && !(r instanceof Date)
				? (r as string | number | boolean).toString()
				: a;
		});
	}

	private addSchemaToValidator(schema: boolean | Record<string, object>): boolean | object {
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

	private detectTypeAndRemoveEmptyProps(value: any): any {
		if (['', null, undefined].includes(value)) {
			return null;
		}

		if (Array.isArray(value)) {
			return this.removeEmptyPropsFromArray(value);
		}

		if (typeof value === 'object') {
			return this.removeEmptyPropsFromObject(value);
		}

		return value;
	}

	private removeEmptyPropsFromArray(arr: any[]): any[] {
		return arr.map(val => this.detectTypeAndRemoveEmptyProps(val));
	}

	private removeEmptyPropsFromObject(values: FormikValues): Record<string, any> {
		return Object.keys(values).reduce((acc, key: string) => {
			const cleanedValue = this.detectTypeAndRemoveEmptyProps(values[key]);

			if (cleanedValue === null) {
				return acc;
			}

			acc[key] = cleanedValue;

			return acc;
		}, {} as Record<string, any>);
	}
}
