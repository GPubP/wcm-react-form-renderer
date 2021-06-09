import { v4 as uuid } from 'uuid';

import {
	TimePeriodsRepeaterInitialValue,
	TimePeriodsRepeaterValue,
} from './TimePeriodsRepeater.types';

export const generateTimePeriodValues = (
	valueToRepeat: TimePeriodsRepeaterInitialValue,
	repeatAmount: number
): TimePeriodsRepeaterValue[] => {
	const values = [];

	for (let i = 0; i < repeatAmount; i++) {
		values.push({
			uuid: uuid(),
			...valueToRepeat,
		});
	}

	return values;
};
