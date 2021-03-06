import { ContentTypeFieldSchema, FieldSchema } from '../../core.types';

import { parseFields } from './parseFields';
import {
	disabledPresetSingle,
	fieldTypeMultiple,
	fieldTypeSingle,
	hiddenPresetSingle,
	presetMultiple,
	presetSingle,
} from './parseFields.mock';

describe('parseFields', () => {
	describe('FieldType', () => {
		describe('Single', () => {
			it('should parse a content type single field to a FieldSchema', () => {
				const fields = parseFields([fieldTypeSingle] as ContentTypeFieldSchema[]);

				expect(fields[0]).toEqual({
					name: fieldTypeSingle.name,
					label: fieldTypeSingle.label,
					module: fieldTypeSingle.fieldType.data.module,
					type: fieldTypeSingle.fieldType.data.componentName,
					view: undefined,
					dataType: fieldTypeSingle.dataType.data.type,
					hidden: fieldTypeSingle.generalConfig.hidden,
					uuid: fieldTypeSingle.uuid,
					fields: [],
					defaultValue: fieldTypeSingle.defaultValue,
					semanticType: undefined,
					valueSync: undefined,
					config: {
						...fieldTypeSingle.config,
						...fieldTypeSingle.generalConfig,
						fieldType: fieldTypeSingle.fieldType,
						dataType: fieldTypeSingle.dataType,
						description: fieldTypeSingle.generalConfig.guideline,
						disabled: false,
						preset: undefined,
						synced: false,
					},
				});
			});
		});

		describe('should parse a content type multiple field to a FieldSchema', () => {
			const fields = parseFields([fieldTypeMultiple] as ContentTypeFieldSchema[]);

			expect(fields[0]).toEqual({
				name: fieldTypeMultiple.name,
				module: 'core',
				label: fieldTypeMultiple.label,
				hidden: false,
				type: 'repeater',
				dataType: 'array',
				uuid: fieldTypeMultiple.uuid,
				defaultValue: fieldTypeMultiple.defaultValue,
				config: {
					dataType: fieldTypeMultiple.dataType,
					fieldType: fieldTypeMultiple.fieldType,
					max: 2,
					guideline: fieldTypeMultiple.generalConfig.guideline,
					hidden: fieldTypeMultiple.generalConfig.hidden,
					description: fieldTypeMultiple.generalConfig.guideline,
					disabled: false,
					preset: undefined,
					synced: false,
				},
				fields: [
					{
						name: 'value',
						label: fieldTypeMultiple.fieldType.data.generalConfig.defaultLabel,
						module: fieldTypeMultiple.fieldType.data.module,
						type: fieldTypeMultiple.fieldType.data.componentName,
						hidden: fieldTypeMultiple.generalConfig.hidden,
						uuid: fieldTypeMultiple.uuid,
						view: undefined,
						dataType: fieldTypeMultiple.dataType.data.type,
						fields: [],
						semanticType: undefined,
						valueSync: undefined,
						config: {
							max: 2,
							guideline: fieldTypeMultiple.generalConfig.guideline,
							hidden: false,
							description:
								fieldTypeMultiple.fieldType.data.generalConfig.defaultGuideline,
							preset: undefined,
							fieldType: fieldTypeMultiple.fieldType,
							dataType: fieldTypeMultiple.dataType,
							disabled: false,
							synced: false,
						},
					},
				],
			});
		});
	});

	describe('Preset', () => {
		describe('Single', () => {
			it('should parse a content type single preset to a FieldSchema', () => {
				const fields = parseFields(([presetSingle] as unknown) as ContentTypeFieldSchema[]);

				expect(fields[0]).toEqual({
					name: presetSingle.name,
					label: presetSingle.label,
					module: presetSingle.fieldType.data.module,
					type: presetSingle.fieldType.data.componentName,
					view: presetSingle.preset.data.name,
					hidden: presetSingle.generalConfig.hidden,
					uuid: presetSingle.uuid,
					dataType: presetSingle.dataType.data.type,
					defaultValue: presetSingle.defaultValue,
					fields: [
						{
							name: fieldTypeSingle.name,
							label: fieldTypeSingle.label,
							module: fieldTypeSingle.fieldType.data.module,
							type: fieldTypeSingle.fieldType.data.componentName,
							view: undefined,
							dataType: fieldTypeSingle.dataType.data.type,
							hidden: fieldTypeSingle.generalConfig.hidden,
							uuid: fieldTypeSingle.uuid,
							defaultValue: fieldTypeSingle.defaultValue,
							fields: [],
							config: {
								max: fieldTypeSingle.generalConfig.max,
								guideline: fieldTypeSingle.generalConfig.guideline,
								hidden: fieldTypeSingle.generalConfig.hidden,
								description: fieldTypeSingle.generalConfig.guideline,
								preset: undefined,
								fieldType: fieldTypeSingle.fieldType,
								dataType: fieldTypeSingle.dataType,
								disabled: false,
								synced: false,
							},
						},
					],
					config: {
						fields: presetSingle.config.fields,
						max: presetSingle.generalConfig.max,
						guideline: presetSingle.generalConfig.guideline,
						hidden: presetSingle.generalConfig.hidden,
						description: presetSingle.generalConfig.guideline,
						preset: presetSingle.preset,
						fieldType: presetSingle.fieldType,
						dataType: presetSingle.dataType,
						disabled: false,
						synced: false,
					},
				});
			});
		});

		describe('Multiple', () => {
			it('should parse a content type multiple preset to a FieldSchema', () => {
				const fields = parseFields(([
					presetMultiple,
				] as unknown) as ContentTypeFieldSchema[]);

				expect(fields[0]).toEqual({
					name: presetMultiple.name,
					module: presetMultiple.fieldType.data.module,
					label: presetMultiple.label,
					hidden: false,
					type: 'repeater',
					dataType: 'array',
					uuid: presetMultiple.uuid,
					defaultValue: presetMultiple.defaultValue,
					config: {
						dataType: presetMultiple.dataType,
						fieldType: presetMultiple.fieldType,
						preset: presetMultiple.preset,
						fields: presetMultiple.config.fields,
						max: presetMultiple.generalConfig.max,
						guideline: presetMultiple.generalConfig.guideline,
						hidden: presetMultiple.generalConfig.hidden,
						description: presetMultiple.generalConfig.guideline,
						disabled: false,
						synced: false,
					},
					fields: [
						{
							name: 'value',
							label: null,
							module: presetMultiple.fieldType.data.module,
							type: presetMultiple.fieldType.data.componentName,
							view: presetMultiple.preset.data.name,
							dataType: presetMultiple.dataType.data.type,
							hidden: presetMultiple.generalConfig.hidden,
							uuid: presetMultiple.uuid,
							fields: [
								{
									name: fieldTypeSingle.name,
									label: fieldTypeSingle.label,
									module: fieldTypeSingle.fieldType.data.module,
									type: fieldTypeSingle.fieldType.data.componentName,
									view: undefined,
									dataType: fieldTypeSingle.dataType.data.type,
									hidden: fieldTypeSingle.generalConfig.hidden,
									uuid: fieldTypeSingle.uuid,
									defaultValue: fieldTypeSingle.defaultValue,
									fields: [],
									semanticType: undefined,
									valueSync: undefined,
									config: {
										max: fieldTypeSingle.generalConfig.max,
										guideline: fieldTypeSingle.generalConfig.guideline,
										hidden: fieldTypeSingle.generalConfig.hidden,
										description: fieldTypeSingle.generalConfig.guideline,
										preset: undefined,
										fieldType: fieldTypeSingle.fieldType,
										dataType: fieldTypeSingle.dataType,
										disabled: false,
										synced: false,
									},
								},
							],
							config: {
								fields: presetMultiple.config.fields,
								max: presetMultiple.generalConfig.max,
								guideline: presetMultiple.generalConfig.guideline,
								hidden: presetMultiple.generalConfig.hidden,
								preset: presetMultiple.preset,
								fieldType: presetMultiple.fieldType,
								dataType: presetMultiple.dataType,
								disabled: false,
								synced: false,
							},
						},
					],
				});
			});
		});

		describe('Parse options', () => {
			describe('noHiddenFields', () => {
				it('should set the `hidden` prop on all fields to false when set to true', () => {
					const fields = parseFields(
						([hiddenPresetSingle] as unknown) as ContentTypeFieldSchema[],
						{
							noHiddenFields: true,
						}
					);

					expect(fields[0]?.hidden).toBe(false);
					expect(fields[0]?.config?.hidden).toBe(false);
					expect((fields[0]?.fields as FieldSchema[])[0].hidden).toBe(false);
					expect((fields[0]?.fields as FieldSchema[])[0].config?.hidden).toBe(false);
				});
			});

			describe('noDisabledFields', () => {
				it('should set the `disabled` prop on all fields to false when set to true', () => {
					const fields = parseFields(
						([disabledPresetSingle] as unknown) as ContentTypeFieldSchema[],
						{
							noDisabledFields: true,
						}
					);

					expect(fields[0]?.config?.disabled).toBe(false);
					expect((fields[0]?.fields as FieldSchema[])[0].config?.disabled).toBe(false);
				});
			});
		});
	});
});
