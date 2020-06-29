import { ErrorMessageHandler } from '@redactie/schema-to-yup';

export class CustomErrorMessageHandler extends ErrorMessageHandler {
	public path: string;

	constructor(typeHandler: any, config: any) {
		super(typeHandler, config);
		this.path = typeHandler.constraints?.name;
	}

	public errMessageFor(msgName: string): string {
		const { errMessages, path } = this;
		const errMsg = errMessages[path];

		return errMsg ? errMsg[msgName] : errMessages[`$${msgName}`];
	}
}

export const createErrorMessageHandler = (
	typeHandler: any,
	config = {}
): CustomErrorMessageHandler => {
	return new CustomErrorMessageHandler(typeHandler, config);
};
