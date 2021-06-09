import { CreateTimePeriodsFormState } from '../CreateTimePeriodsForm';

export interface CreateTimePeriodsModalProps {
	show: boolean;
	onCancel: () => void;
	onSubmit: (values: CreateTimePeriodsFormState, recurringPeriods: number) => void;
}
