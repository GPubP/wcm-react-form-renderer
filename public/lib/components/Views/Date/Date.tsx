import moment from 'moment';
import React, { FC } from 'react';

import { ViewFieldProps } from '../../../services/viewRegistry';

import { DATE_FORMATS } from './Date.const';

const DateView: FC<ViewFieldProps> = ({ fieldSchema, value }) => {
	const {
		config = {
			dateFormat: 'dayMonthAndYear',
		},
	} = fieldSchema;

	if (!value || typeof value !== 'string') {
		return null;
	}

	// incoming date format is YYYY-MM-DD
	const formatDate = moment(value, 'YYYY-MM-DD').format(
		DATE_FORMATS[config.dateFormat] || DATE_FORMATS.dayMonthAndYear
	);

	return <>{formatDate}</>;
};

export default DateView;
