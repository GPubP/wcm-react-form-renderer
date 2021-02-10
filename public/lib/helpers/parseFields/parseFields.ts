import { omit } from 'ramda';

import { ContentTypeFieldSchema, FieldSchema, Preset } from '../../core.types';

import { ParseFieldsOptions } from './parseFields.types';

export const parseFields = (
	fields: ContentTypeFieldSchema[] = [],
	options?: ParseFieldsOptions
): FieldSchema[] => {
	const parseOptions: ParseFieldsOptions = {
		noHiddenFields: false,
		noDisabledFields: false,
		...(options ? options : {}),
	};

	const getFieldSchema = (field: ContentTypeFieldSchema): FieldSchema => {
		const {
			generalConfig = {
				min: 0,
				max: 1,
				hidden: false,
				guideline: '',
			},
			config = {
				fields: [],
			},
			name,
			fieldType = {
				data: {
					module: 'core',
					componentName: 'text',
					generalConfig: {
						defaultGuideline: '',
						defaultLabel: '',
					},
				},
			},
			dataType,
			label,
			preset,
			uuid,
			defaultValue,
		} = field;
		const isMultiple = (generalConfig.max || 0) > 1;
		const isDisabled = parseOptions.noDisabledFields
			? false
			: parseOptions.parentGeneralConfig?.disabled || generalConfig.disabled || false;
		const isHidden = parseOptions.noHiddenFields ? false : !!generalConfig.hidden;
		const isPreset = !!preset;
		const formField: FieldSchema = {
			name,
			label,
			uuid,
			module: fieldType?.data?.module,
			type: fieldType?.data?.componentName,
			view: preset
				? preset.data?.viewComponentName
					? preset.data?.viewComponentName
					: preset.data?.name
				: '',
			dataType: dataType.data.type,
			fields: parseFields(config.fields, {
				...parseOptions,
				parentGeneralConfig: {
					...generalConfig,
					...(parseOptions.parentGeneralConfig || {}),
				},
			}),
			hidden: isHidden,
			config: {
				...config,
				...generalConfig,
				hidden: isHidden,
				disabled: isDisabled,
				description: generalConfig.guideline,
				preset: preset as Preset,
				fieldType,
				dataType,
			},
			defaultValue,
		};

		if (isMultiple) {
			/**
			 * Use default guideline and label when rendering a field type in multiple mode
			 */
			if (!isPreset) {
				formField.config = {
					...formField.config,
					description: fieldType.data.generalConfig.defaultGuideline,
				};
				// TODO: label is required in the form renderer
				// Fix this when the label is not required anymore
				formField.label = (fieldType.data.generalConfig.defaultLabel as unknown) as string;
			}

			/**
			 * Remove the guideline and label from the preset when rendering a preset in multiple mode
			 * The label and guideline will be visible on top of the repeater field
			 */
			if (isPreset) {
				formField.config = omit(['description'], formField.config);
				// TODO: label is required in the form renderer
				// Fix this when the label is not required anymore
				formField.label = (null as unknown) as string;
			}

			return {
				name,
				label,
				uuid,
				module: 'core',
				type: 'repeater',
				dataType: 'array',
				hidden: isHidden,
				defaultValue,
				config: {
					...config,
					...generalConfig,
					...formField.config,
					description: generalConfig.guideline,
					disabled: isDisabled,
					hidden: isHidden,
				},
				fields: [
					{
						...omit(['defaultValue'], formField),
						name: 'value',
					} as FieldSchema,
				],
			};
		}

		return formField;
	};

	return fields.reduce((acc, field) => {
		acc.push(getFieldSchema(field));

		return acc;
	}, [] as FieldSchema[]);
};
