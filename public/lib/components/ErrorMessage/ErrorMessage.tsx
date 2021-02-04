import classNames from 'classnames/bind';
import { ErrorMessageProps, ErrorMessage as FormikErrorMessage } from 'formik';
import React, { FC, ReactElement } from 'react';

import styles from './ErrorMessage.module.scss';
import { ErrorMessage as ErrorMessageType } from './ErrorMessage.types';

const cx = classNames.bind(styles);

const ErrorMessage: FC<ErrorMessageProps> = ({ component, ...rest }) => {
	const className = cx('error-message', 'u-bg-danger');

	const renderMessage = (msg: string): ReactElement => (
		<div className={className}>
			<p className="u-text-xlight">{msg}</p>
		</div>
	);

	return (
		<>
			{component ? (
				<FormikErrorMessage component={component} {...rest}></FormikErrorMessage>
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
