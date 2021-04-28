import moment from 'moment';
import React from 'react';

import { ViewFieldProps } from '../../../services/viewRegistry';
import { TimePeriodsValue } from '../../Fields/TimePeriods';

import { DATE_FORMAT, TIME_FORMAT } from './TimePeriods.const';

const TimePeriodsView: React.FC<ViewFieldProps> = ({ value }) => {
	const { startDate = '', startHour = '', endHour, allDay } = value as TimePeriodsValue;

	if (!startDate || !startHour) {
		return null;
	}

	const getDurationString = (): string => {
		if (allDay) {
			return 'volledige dag';
		}

		const formattedStart = moment(startHour).format(TIME_FORMAT);

		if (endHour) {
			return `van ${formattedStart} tot ${moment(endHour).format(TIME_FORMAT)}`;
		}
		return `vanaf ${formattedStart}`;
	};

	return <>{`${moment(startDate).format(DATE_FORMAT)} ${getDurationString()}`}</>;
};

export default TimePeriodsView;
