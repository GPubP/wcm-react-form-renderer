import { Icon } from '@acpaas-ui/react-components';
import React, { FC } from 'react';

import { ViewFieldProps } from '../../../services/viewRegistry/viewRegistry.types';

const EmailView: FC<ViewFieldProps> = ({ value }) => {
	if (!value || typeof value !== 'string') {
		return null;
	}

	return (
		<>
			<Icon className="a-icon-sm u-margin-right-xs" name="envelope" />
			<a href={`mailto:${value}`}>{value}</a>
		</>
	);
};

export default EmailView;
