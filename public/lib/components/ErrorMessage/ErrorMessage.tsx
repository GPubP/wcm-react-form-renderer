import classNames from 'classnames/bind';
import { ErrorMessageProps, ErrorMessage as FormikErrorMessage } from 'formik';
import React, { FC } from 'react';

import styles from './ErrorMessage.module.scss';

const cx = classNames.bind(styles);

const ErrorMessage: FC<ErrorMessageProps> = ({ component, ...rest }) => {
	const className = cx('error-message', 'u-bg-danger');

	return (
		<>
			{component ? (
				<FormikErrorMessage component={component} {...rest}></FormikErrorMessage>
			) : (
				<FormikErrorMessage {...rest}>
					{msg => {
						return (
							<div className={className}>
								<p className="u-text-xlight">{msg}</p>
							</div>
						);
					}}
				</FormikErrorMessage>
			)}
		</>
	);
};

export default ErrorMessage;
