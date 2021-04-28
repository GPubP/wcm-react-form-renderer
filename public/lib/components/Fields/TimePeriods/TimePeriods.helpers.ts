import moment from 'moment';
import { DateSchema } from 'yup';

export const parseDate = (value: string): Date => {
	// Check strict on date format
	const parsedValue = moment(value, 'DD/MM/YYYY', true);
	// Return date object when it's valid, otherwise 'Invalid Date'
	return parsedValue.isValid() ? parsedValue.toDate() : new Date('');
};

export function transformDate(this: DateSchema, value: Date | string, originalValue: string): Date {
	if (this.isType(value)) {
		return value as Date;
	}

	return parseDate(originalValue);
}
