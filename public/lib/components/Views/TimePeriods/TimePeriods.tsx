import moment from 'moment';
import React from 'react';

import { ViewFieldProps } from '../../../services/viewRegistry';
import { TimePeriodsValue } from '../../Fields/TimePeriods';

import {
	DATE_FORMAT,
	DATE_INPUT_FORMAT,
	TIME_FORMAT,
	TIME_INPUT_FORMAT,
} from './TimePeriods.const';

const TimePeriodsView: React.FC<ViewFieldProps> = ({ value }) => {
	if (!value || (!value.startDate && !value.startTime)) {
		return null;
	}

	const { startDate = '', startTime = '', endTime, allDay } = value as TimePeriodsValue;
	const formattedStartDate = moment(startDate, DATE_INPUT_FORMAT, true).format(DATE_FORMAT);

	const getDurationString = (): string => {
		if (allDay) {
			return 'volledige dag';
		}

		const formattedStart = moment(startTime, TIME_INPUT_FORMAT, true).format(TIME_FORMAT);

		if (endTime) {
			const formattedEnd = moment(endTime, TIME_INPUT_FORMAT, true).format(TIME_FORMAT);
			return `van ${formattedStart} tot ${formattedEnd}`;
		}
		return `vanaf ${formattedStart}`;
	};

	return <>{`${formattedStartDate} ${getDurationString()}`}</>;
};

export default TimePeriodsView;
