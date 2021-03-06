import { RepeaterValue } from '../Repeater';
import { TimePeriodsValue } from '../TimePeriods/TimePeriods.types';

export type TimePeriodsRepeaterValue = RepeaterValue<TimePeriodsValue | undefined>;
export type TimePeriodsRepeaterInitialValue = Pick<TimePeriodsRepeaterValue, 'value'>;
