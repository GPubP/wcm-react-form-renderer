import { PromiseWorkerMessage, WorkerCtx, WorkerMessageEvent } from '@redactie/utils';
import { FormikValues } from 'formik';

import { CustomValidator } from '../../classes/CustomValidator/CustomValidator';
import {
	CustomValidatorWorkerInitData,
	CustomValidatorWorkerMessage,
	CustomValidatorWorkerMessageTypes,
} from '../../classes/CustomValidatorWorker/CustomValidatorWorker.types';
import { FormProps } from '../../components/Form/Form.types';

const ctx = (self as unknown) as WorkerCtx;
let customValidator: CustomValidator;

ctx.onmessage = (
	e: WorkerMessageEvent<PromiseWorkerMessage<CustomValidatorWorkerMessage>>
): void => {
	const { id, data } = e.data;
	if (data.type === CustomValidatorWorkerMessageTypes.VALIDATE && customValidator) {
		const messageData: FormikValues = data.data;

		ctx.postMessage({
			id,
			data: customValidator.validate(messageData),
		});
		return;
	}

	if (data.type === CustomValidatorWorkerMessageTypes.INIT) {
		const messageData: CustomValidatorWorkerInitData = data.data;
		customValidator = new CustomValidator(
			messageData.schema,
			messageData.errorMessages,
			messageData.options
		);
	}

	if (data.type === CustomValidatorWorkerMessageTypes.SET_SCHEMA && customValidator) {
		const messageData: boolean | object = data.data;
		customValidator.setSchema(messageData);
	}

	if (data.type === CustomValidatorWorkerMessageTypes.SET_ERRORMESSAGES && customValidator) {
		const messageData: FormProps<FormikValues>['errorMessages'] = data.data;
		customValidator.setErrorMessages(messageData);
	}

	ctx.postMessage({
		id,
		data: 'done',
	});
};

export default (null as unknown) as new () => Worker;
