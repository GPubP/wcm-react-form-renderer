import { FormikProps } from 'formik';

export interface CreateTimePeriodsFormProps {
	className?: string;
	children?: (props: FormikProps<any>) => React.ReactNode;
	onSubmit: (values: any) => void;
}
