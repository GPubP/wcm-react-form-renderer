import { TimePeriodsValue } from '../TimePeriods.types';

export interface TimePeriodFieldProps {
	label?: string;
	name: string;
	value: TimePeriodsValue;
	onChange: <K extends keyof TimePeriodsValue>(key: K, value: TimePeriodsValue[K]) => void;
}
