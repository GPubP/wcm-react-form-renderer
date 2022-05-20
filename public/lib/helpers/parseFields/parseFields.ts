import { omit } from 'ramda';

import {
	ContentTypeFieldSchema,
	FieldSchema,
	FieldType,
	Preset,
	PresetDetail,
} from '../../core.types';

import { ParseFieldsOptions } from './parseFields.types';

/**
 * Return the view component name
 * The view component is used to visualize the field when using the ViewRenderer component
 */
const getViewComponentName = (
	fieldType?: FieldType,
	preset?: Preset | PresetDetail
): string | undefined => {
	if (preset) {
		// Most of the time a preset is based on a fieldType `fieldgroup`
		// By default the field type component name is used to render the view. This means that when we don't set the
		// view the system will use the default view component based on the field type, which is in this case the fieldGroup
		// view component.
		// We don't want that to happen, that is why we always set the view when we render a preset!
		return preset.data?.viewComponentName ? preset.data?.viewComponentName : preset.data?.name;
	}
	if (fieldType) {
		// By default we use the component name of the field type to render the view
		// The problem is that the user can set the component name on multiple field types.
		// Some example, an email field is using the text component to render the field but it needs
		// a different view then the default view of the text component.
		// Set the viewComponentName on the field type to render an other view then the base text field
		return fieldType.data?.viewComponentName;
	}
};

/**
 * Return the repeater component name
 * The repeater component is used to replace the default repeater field
 */
const getRepeaterComponentName = (
	fieldType?: FieldType,
	preset?: Preset | PresetDetail
): string | undefined => {
	if (preset) {
		return preset.data?.repeaterComponentName;
	}
	if (fieldType) {
		return fieldType.data?.repeaterComponentName;
	}
};

export const parseFields = (
	fields: ContentTypeFieldSchema[] = [],
	options?: ParseFieldsOptions
): FieldSchema[] => {
	const parseOptions: ParseFieldsOptions = {
		noHiddenFields: false,
		noDisabledFields: false,
		valueSyncMap: {},
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
		const hasMultilanguageParent = parseOptions.parentGeneralConfig?.multiLanguage || false;
		const langConfig = {
			...(config.multiLanguage && options?.activeLanguageKey
				? config[options.activeLanguageKey]
				: config),
			fields: config.fields,
		};
		const langDefaultValue =
			defaultValue?.multiLanguage && options?.activeLanguageKey
				? defaultValue[options.activeLanguageKey]
				: defaultValue;
		const formField: FieldSchema = {
			name,
			label,
			uuid,
			module: fieldType?.data?.module,
			type: fieldType?.data?.componentName,
			view: getViewComponentName(fieldType as FieldType, preset),
			dataType: dataType.data.type,
			semanticType: dataType.data.semanticType,
			fields: parseFields(config.fields, {
				...parseOptions,
				parentGeneralConfig: {
					...generalConfig,
					...(parseOptions.parentGeneralConfig || {}),
				},
			}),
			hidden: isHidden,
			config: {
				...langConfig,
				...generalConfig,
				hidden: isHidden,
				disabled: isDisabled,
				description: generalConfig.guideline,
				preset: preset as Preset,
				fieldType,
				dataType,
				synced:
					!hasMultilanguageParent &&
					!config.fields?.length &&
					!generalConfig.multiLanguage &&
					(generalConfig.required || false) &&
					((generalConfig.max || 0) <= 1 ? true : false),
			},
			defaultValue: langDefaultValue,
			valueSync: parseOptions?.valueSyncMap
				? parseOptions?.valueSyncMap[field.name]
				: undefined,
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
				repeaterComponentName: getRepeaterComponentName(fieldType as FieldType, preset),
				dataType: 'array',
				semanticType: dataType.data.semanticType,
				hidden: isHidden,
				defaultValue: langDefaultValue,
				valueSync: parseOptions?.valueSyncMap
					? parseOptions?.valueSyncMap[field.name]
					: undefined,
				config: {
					...langConfig,
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
