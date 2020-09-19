import React, { FC } from 'react';

import { ViewFieldProps } from '../../../services/viewRegistry';

const EmailView: FC<ViewFieldProps> = ({ value }) => {
	if (!value || typeof value !== 'string') {
		return null;
	}

	return (
		<div className="u-margin-bottom">
			<a href={`mailto:${value}`}>{value}</a>
		</div>
	);
};

export default EmailView;
