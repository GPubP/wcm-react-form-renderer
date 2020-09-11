import AJV, { Ajv, Options, RequiredParams, ValidateFunction } from 'ajv';
import { FormikErrors, FormikValues } from 'formik';
import { lensPath, prop, set } from 'ramda';

import { FormProps } from '../../components/Form';

export class CustomValidator {
	public readonly ajv: Ajv;
	public readonly validator: ValidateFunction;
	public readonly errorMessages: FormProps<FormikValues>['errorMessages'];

	constructor(
		schema: boolean | object,
		errorMessages: FormProps<FormikValues>['errorMessages'],
		options: Options
	) {
		this.ajv = new AJV(options);
		this.validator = this.ajv.compile(schema);
		this.errorMessages = errorMessages;
	}

	public validate(values: FormikValues): any {
		this.validator(values);

		return (this.validator.errors || []).reduce((acc, err): FormikErrors<any> => {
			// Skip higher order validators since another validator while define de real error
			if (['if'].includes(err.keyword)) {
				return acc;
			}

			const concatPath =
				err.keyword === 'required'
					? `${err.dataPath}.${(err.params as RequiredParams).missingProperty}`
					: err.dataPath;
			const path = concatPath.replace(/^\./, '');
			const errorPath = path.replace(/\[([0-9])\]/g, '[$]');

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

	private stringReplacer(input: string, props: Record<string, string>): string {
		return input.replace(/\${([^{}]*)}/g, (a, b) => {
			const r = props[b];
			return typeof r === 'string' ? r : a;
		});
	}
}
