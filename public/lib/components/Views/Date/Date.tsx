import moment from 'moment';
import React, { FC } from 'react';

import { isDeprecatedDateFormat } from '../../../helpers';
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

	if (isDeprecatedDateFormat(value)) {
		formattedDate = moment(value, 'DD/MM/YYYY').format(
			DATE_FORMATS[config.dateFormat] || DATE_FORMATS.dayMonthAndYear
		);
	}

	formattedDate = moment(value, 'YYYY-MM-DD').format(
		DATE_FORMATS[config.dateFormat] || DATE_FORMATS.dayMonthAndYear
	);

	return <>{formattedDate}</>;
};

export default DateView;
