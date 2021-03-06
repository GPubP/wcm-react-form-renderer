import { AllowedHeader } from '../../components/Form';
import { FormSchema } from '../../core.types';

export interface FormContextValue {
	useDividers: boolean;
	schema?: FormSchema;
	activeLanguage?: string;
	allowedHeaders: readonly AllowedHeader[] | AllowedHeader[];
}
