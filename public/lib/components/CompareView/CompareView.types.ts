import { FormikValues } from 'formik';

import { FormSchema } from '../../core.types';

export interface CompareViewMeta {
	label: string;
	slug: Record<string, string>;
	description: string | undefined;
	created: string;
	lastEditor: string;
	lastModified: string;
}

export interface CompareViewProps {
	/**
	 * Form schema
	 */
	schema: FormSchema;
	/**
	 * Initialvalues
	 */
	fromValues: FormikValues;
	/**
	 * Initialvalues
	 */
	toValues: FormikValues;
	/**
	 * Meta information
	 */
	fromMeta: CompareViewMeta;
	/**
	 * Meta information
	 */
	toMeta: CompareViewMeta;
}
