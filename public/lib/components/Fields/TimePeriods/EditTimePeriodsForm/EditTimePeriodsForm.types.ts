import { TimePeriodsFormState } from '../TimePeriods.types';

export interface EditTimePeriodsFormProps {
	initialState: TimePeriodsFormState;
	onChange: (values: TimePeriodsFormState) => void;
}
