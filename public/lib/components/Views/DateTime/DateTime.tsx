import moment from 'moment';
import React, { FC } from 'react';

import { ViewFieldProps } from '../../../services/viewRegistry';

import { DATE_FORMATS } from './DateTime.const';

const DateTimeView: FC<ViewFieldProps> = ({ fieldSchema, value }) => {
	const {
		config = {
			dateFormat: 'dayMonthAndYear',
		},
	} = fieldSchema;

	if (!value || typeof value !== 'string') {
		return null;
	}

	const formatDate = moment(value).format(
		DATE_FORMATS[config.dateFormat] || DATE_FORMATS.dayAndMonth
	);

	return <div className="u-margin-bottom">{formatDate}</div>;
};

export default DateTimeView;
