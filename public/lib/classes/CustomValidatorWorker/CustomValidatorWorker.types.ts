import { Options } from 'ajv';
import { FormikValues } from 'formik';

import { FormProps } from '../../components/Form';

export enum CustomValidatorWorkerMessageTypes {
	INIT = 'init',
	VALIDATE = 'validate',
	SET_SCHEMA = 'set schema',
	SET_ERRORMESSAGES = 'set errormessages',
}

export interface CustomValidatorWorkerMessage<Data = any> {
	data: Data;
	type: CustomValidatorWorkerMessageTypes;
}

export interface CustomValidatorWorkerInitData {
	schema: boolean | object;
	errorMessages: FormProps<FormikValues>['errorMessages'];
	options: Options;
}
