export interface WeekDayMultiSelectProps {
	className?: string;
	label?: string;
	name: string;
	options?: { label: string; value: string | number }[];
	required?: boolean;
	value?: (string | number)[];
	onChange?: () => void;
	onBlur?: () => void;
}
