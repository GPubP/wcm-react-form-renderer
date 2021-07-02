import { CreateTimePeriodsFormState } from '../CreateTimePeriodsForm';

export interface CreateTimePeriodsModalProps {
	show: boolean;
	maxValues?: number;
	currentValues?: number;
	onCancel: () => void;
	onSubmit: (values: CreateTimePeriodsFormState, recurringPeriods: Date[]) => void;
}
