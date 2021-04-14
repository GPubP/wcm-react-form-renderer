import { ErrorMessageProps, ErrorMessage as FormikErrorMessage } from 'formik';
import React, { FC, ReactElement } from 'react';

import { ErrorMessage as ErrorMessageType } from './ErrorMessage.types';

const ErrorMessage: FC<ErrorMessageProps> = ({ component, ...rest }) => {
	const renderMessage = (msg: string): ReactElement => (
		<p className="small u-margin-top-xs u-margin-bottom-xs u-text-danger">{msg}</p>
	);

	return (
		<>
			{component ? (
				<FormikErrorMessage component={component} {...rest} />
			) : (
				<FormikErrorMessage {...rest}>
					{msg => {
						return typeof msg === 'string'
							? renderMessage(msg)
							: typeof (msg as ErrorMessageType).__errorMessage === 'string'
							? renderMessage((msg as ErrorMessageType).__errorMessage)
							: null;
					}}
				</FormikErrorMessage>
			)}
		</>
	);
};

export default ErrorMessage;
