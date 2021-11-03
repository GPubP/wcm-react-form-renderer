import { FormikValues } from 'formik';

import { FormSchema } from '../../core.types';

export interface CompareViewMeta {
	label: string;
	slug: string;
	description: string;
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
