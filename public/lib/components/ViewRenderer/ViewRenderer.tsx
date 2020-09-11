import { Field, FieldProps } from 'formik';
import React, { FC, useMemo } from 'react';

import { FieldConfig, fieldRegistry } from '../../services/fieldRegistry';
import { ViewConfig, ViewFieldProps, viewRegistry } from '../../services/viewRegistry';

import { ViewRendererProps } from './ViewRenderer.types';

const ViewRenderer: FC<ViewRendererProps> = ({ fieldSchema }) => {
	const getFieldConfig = (): FieldConfig | undefined =>
		fieldRegistry.get(fieldSchema.module, fieldSchema.type);
	const getViewConfig = (): ViewConfig | undefined =>
		viewRegistry.get(fieldSchema.module, fieldSchema.view);

	// only get the field config when field schema has changed
	const fieldConfig: FieldConfig | undefined = useMemo(getFieldConfig, [fieldSchema]);
	const viewConfig: ViewConfig | undefined = useMemo(getViewConfig, [fieldSchema]);
	const ViewComponent: FC<ViewFieldProps> | undefined = useMemo(() => {
		if (viewConfig) {
			return viewConfig.component;
		}

		if (fieldConfig?.viewComponent) {
			return fieldConfig.viewComponent;
		}
	}, [viewConfig, fieldConfig]);

	// Don't render anything when there is no field config available
	if (!fieldConfig || !ViewComponent) {
		return null;
	}

	const renderView = (): React.ReactNode => (
		<Field name={fieldSchema.name}>
			{(fieldProps: FieldProps<any, {}>): React.ReactNode => (
				<ViewComponent fieldSchema={fieldSchema} value={fieldProps.field.value} />
			)}
		</Field>
	);

	return <>{renderView()}</>;
};

export default ViewRenderer;
