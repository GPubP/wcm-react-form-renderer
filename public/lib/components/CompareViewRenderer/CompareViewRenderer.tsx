import classNames from 'classnames/bind';
import { Field, FieldProps } from 'formik';
import React, { FC, useMemo } from 'react';

import { FieldConfig, fieldRegistry } from '../../services/fieldRegistry';
import { ViewConfig, ViewFieldProps, viewRegistry } from '../../services/viewRegistry';

import CompareViewRendererStyles from './CompareViewRenderer.module.scss';
import { CompareViewRendererProps } from './CompareViewRenderer.types';

const cx = classNames.bind(CompareViewRendererStyles);

const CompareViewRenderer: FC<CompareViewRendererProps> = ({ fieldSchema }) => {
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

	const renderView = (): React.ReactNode => (
		<div className="u-margin-bottom">
			<Field name={fieldSchema.name}>
				{(fieldProps: FieldProps<any, {}>): React.ReactNode => {
					if (!fieldProps.field.value) {
						return (
							<div className={cx('m-compare-view-renderer__empty-state')}>
								Component bestaat niet in deze revisie
							</div>
						);
					}

					if (!fieldConfig || !ViewComponent) {
						return (
							<div className={cx('m-compare-view-renderer__empty-state')}>
								{fieldSchema.label} gewijzigd (Kan niet getoond worden)
							</div>
						);
					}

					if (!fieldProps?.field?.value?.text) {
						return (
							<div className={cx('m-compare-view-renderer__empty-state')}>
								Niets ingevuld
							</div>
						);
					}

					return (
						<ViewComponent fieldSchema={fieldSchema} value={fieldProps.field.value} />
					);
				}}
			</Field>
		</div>
	);

	return <>{renderView()}</>;
};

export default CompareViewRenderer;
