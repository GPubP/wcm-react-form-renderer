import { PromiseWorker } from '@redactie/utils';
import { Options, ValidateFunction } from 'ajv';
import { FormikErrors, FormikValues } from 'formik';

import { FormProps } from '../../components/Form';

import {
	CustomValidatorWorkerInitData,
	CustomValidatorWorkerMessage,
	CustomValidatorWorkerMessageTypes,
} from './CustomValidatorWorker.types';

export class CustomValidatorWorker {
	public readonly validator: ValidateFunction | null = null;
	public readonly errorMessages: FormProps<FormikValues>['errorMessages'];
	public readonly schema: boolean | object;
	private readonly _promiseWorker: PromiseWorker;
	private readonly _validatorWorkerPath = 'validator.worker';

	constructor(
		tenantId: string,
		schema: boolean | Record<string, any>,
		errorMessages: FormProps<FormikValues>['errorMessages'],
		options: Options
	) {
		this.errorMessages = errorMessages;
		this.schema = schema;
		this._promiseWorker = new PromiseWorker(
			new Worker(
				`/v1/tenants/${tenantId}/bundles/${BFF_MODULE_PUBLIC_PATH}${this._validatorWorkerPath}.umd.js`
			)
		);
		this._promiseWorker.postMessage<
			CustomValidatorWorkerMessage<CustomValidatorWorkerInitData>
		>({
			type: CustomValidatorWorkerMessageTypes.INIT,
			data: {
				schema,
				errorMessages,
				options,
			},
		});
	}

	public validate<Values = any>(values: FormikValues): Promise<FormikErrors<Values>> {
		return this._promiseWorker.postMessage<CustomValidatorWorkerMessage<FormikValues>>({
			type: CustomValidatorWorkerMessageTypes.VALIDATE,
			data: values,
		});
	}

	public terminate(): void {
		this._promiseWorker.terminate();
	}
}
