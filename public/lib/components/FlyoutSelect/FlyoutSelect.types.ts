import { FieldSchema } from '../../core.types';

export interface FlyoutSelectProps {
	label: string;
	onSelect: (item: FieldSchema) => void;
	items: FieldSchema[];
}
