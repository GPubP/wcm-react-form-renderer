import classNames from 'classnames/bind';
import React, { FC } from 'react';

import styles from './ErrorMessage.module.scss';

const cx = classNames.bind(styles);

const ErrorMessage: FC<{}> = ({ children }) => {
	const className = cx('errorMessage', 'u-bg-danger');

	return (
		<div className={className}>
			<p className="u-text-xlight">{children}</p>
		</div>
	);
};

export default ErrorMessage;
