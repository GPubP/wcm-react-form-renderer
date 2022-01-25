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

	let formattedDate = value;

	// incoming date format is YYYY-MM-DD
	if (new RegExp('^\\d{4}[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$').test(value)) {
		formattedDate = moment(value, 'YYYY-MM-DD').format(
			DATE_FORMATS[config.dateFormat] || DATE_FORMATS.dayMonthAndYear
		);
	}

	// incoming date format is DD/MM/YYYY
	if (new RegExp('^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\\/(0[1-9]|1[0-2])\\/\\d{4}$').test(value)) {
		formattedDate = moment(value, 'DD/MM/YYYY').format(
			DATE_FORMATS[config.dateFormat] || DATE_FORMATS.dayMonthAndYear
		);
	}

	return <>{formattedDate}</>;
};

export default DateView;
