import { FieldSchema } from '../../core.types';

export interface FlyoutSelectProps {
	onSelect: (item: FieldSchema) => void;
	items: FieldSchema[];
}
