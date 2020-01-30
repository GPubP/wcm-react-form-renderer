
/**
 * A list of allowed field types
 */
export type FieldDataType = 'string' | 'number' | 'date' | 'array' | 'object';

export interface FormSchema {
	/**
	 * Form fields
	 * They describe how each field will look like
	 */
	fields: Field[];
}

export interface FormValues {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export interface Field {
	/**
	 * Field name
	 */
	name: string;
	/**
	 * Field type
	 */
	type: string;
	/**
	 * Field Data type
	 */
	dataType: FieldDataType;
	/**
	 * Field label
	 */
	label: string;
	/**
	 * Field options
	 * You can give any option you want
	 */
	options?: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[key: string]: any;
	};
	/**
	 * nested form fields
	 */
	fields?: Field[];
}


