export interface KeyValuePairsModalProps {
	show: boolean;
	maxValues: number;
	currentValues: number;
	labelCopy: string;
	valueCopy: string;
	onCancel: () => void;
	onSubmit: (values: any) => void;
}
