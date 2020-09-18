import moment from 'moment';
import React, { FC } from 'react';

import { ViewFieldProps } from '../../../services/viewRegistry';

const TimeView: FC<ViewFieldProps> = ({ value }) => {
	if (!value || typeof value !== 'string') {
		return null;
	}

	const formatDate = moment(value, 'HH:mm').format('HH[u]mm');

	return <div className="u-margin-bottom">{formatDate}</div>;
};

export default TimeView;
