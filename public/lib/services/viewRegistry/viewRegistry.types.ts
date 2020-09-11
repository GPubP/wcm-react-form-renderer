import { FieldSchema } from '../../core.types';

export interface ViewFieldProps {
	/**
	 * Fieldschema
	 * This is a partial of FormSchema
	 * But it only holds the schema information for a field
	 */
	fieldSchema: FieldSchema;
	/**
	 * The value of the view
	 */
	value: any;
}

export interface ViewConfig {
	/**
	 * Name of the view
	 * This is a unique identifier
	 */
	name: string;
	/**
	 * module
	 * This prop defines which readaction module
	 * has registered this view.
	 * It is possible to have multiple image views
	 * across modules
	 * On the other hand, it is not possible to have multiple image
	 * views in the same module.
	 */
	module: string;
	/**
	 * The component that will be rendered inside the view
	 */
	component: React.FC<ViewFieldProps>;
}

export interface ViewRegistryConfig {
	[key: string]: {
		[key: string]: ViewConfig;
	};
}
