import { PromiseWorkerMessage, WorkerCtx, WorkerMessageEvent } from '@redactie/utils';
import { FormikValues } from 'formik';

import { CustomValidator } from '../../classes/CustomValidator/CustomValidator';
import {
	CustomValidatorWorkerInitData,
	CustomValidatorWorkerMessage,
	CustomValidatorWorkerMessageTypes,
} from '../../classes/CustomValidatorWorker/CustomValidatorWorker.types';

const ctx = (self as unknown) as WorkerCtx;
let customValidator: CustomValidator;

ctx.onmessage = (
	e: WorkerMessageEvent<PromiseWorkerMessage<CustomValidatorWorkerMessage>>
): void => {
	const { id, data } = e.data;
	if (data.type === CustomValidatorWorkerMessageTypes.INIT) {
		const messageData: CustomValidatorWorkerInitData = data.data;
		customValidator = new CustomValidator(
			messageData.schema,
			messageData.errorMessages,
			messageData.options
		);
		ctx.postMessage({
			id,
			data: 'done',
		});
		return;
	}

	if (data.type === CustomValidatorWorkerMessageTypes.VALIDATE) {
		const messageData: FormikValues = data.data;
		if (customValidator) {
			ctx.postMessage({
				id,
				data: customValidator.validate(messageData),
			});
		}
	}
};

export default (null as unknown) as new () => Worker;
