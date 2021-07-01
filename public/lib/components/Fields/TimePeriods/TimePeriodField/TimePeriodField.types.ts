import { FieldOption } from '../../../../core.types';
import { TimePeriodsValue } from '../TimePeriods.types';

export interface TimePeriodFieldProps {
	name: string;
	value: TimePeriodsValue;
	options?: FieldOption[];
	onChange: <K extends keyof TimePeriodsValue>(key: K, value: TimePeriodsValue[K]) => void;
}
