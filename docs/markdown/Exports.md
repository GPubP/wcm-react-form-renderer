# @redactie/form-renderer-module

## Table of contents

### Enumerations

- [MAP\_MODES](../wiki/MAP_MODES)

### Classes

- [CustomValidator](../wiki/CustomValidator)

### Interfaces

- [BasePreset](../wiki/BasePreset)
- [ContentTypeFieldSchema](../wiki/ContentTypeFieldSchema)
- [DataType](../wiki/DataType)
- [FieldCompartment](../wiki/FieldCompartment)
- [FieldConfig](../wiki/FieldConfig)
- [FieldOption](../wiki/FieldOption)
- [FieldRenderContextValue](../wiki/FieldRenderContextValue)
- [FieldRendererRenderContext](../wiki/FieldRendererRenderContext)
- [FieldSchema](../wiki/FieldSchema)
- [FieldType](../wiki/FieldType)
- [FieldValueSync](../wiki/FieldValueSync)
- [FieldsRegistryConfig](../wiki/FieldsRegistryConfig)
- [FormContextValue](../wiki/FormContextValue)
- [FormSchema](../wiki/FormSchema)
- [FormsAPI](../wiki/FormsAPI)
- [GeneralConfig](../wiki/GeneralConfig)
- [InputFieldProps](../wiki/InputFieldProps)
- [Operator](../wiki/Operator)
- [ParseFieldsOptions](../wiki/ParseFieldsOptions)
- [ValicationCheckWithAllowedFields](../wiki/ValicationCheckWithAllowedFields)
- [ValicationCheckWithFields](../wiki/ValicationCheckWithFields)
- [Validation](../wiki/Validation)
- [ValidationCheck](../wiki/ValidationCheck)
- [ValidationCheckAllowedField](../wiki/ValidationCheckAllowedField)
- [ValidationCheckField](../wiki/ValidationCheckField)
- [ValidationSchema](../wiki/ValidationSchema)
- [Validator](../wiki/Validator)
- [ViewConfig](../wiki/ViewConfig)
- [ViewFieldProps](../wiki/ViewFieldProps)
- [ViewRegistryConfig](../wiki/ViewRegistryConfig)

### Type aliases

- [FieldDataType](../wiki/Exports#fielddatatype)
- [FormValues](../wiki/Exports#formvalues)
- [Preset](../wiki/Exports#preset)
- [PresetDetail](../wiki/Exports#presetdetail)
- [ValueSyncMap](../wiki/Exports#valuesyncmap)

### Variables

- [CompareView](../wiki/Exports#compareview)
- [FieldRendererStyles](../wiki/Exports#fieldrendererstyles)
- [Form](../wiki/Exports#form)
- [FormikOnChangeHandler](../wiki/Exports#formikonchangehandler)
- [View](../wiki/Exports#view)

## Type aliases

### FieldDataType

Ƭ **FieldDataType**: `any`[][`number`]

#### Defined in

lib/core.types.ts:21

___

### FormValues

Ƭ **FormValues**: `FormikValues`

#### Defined in

lib/core.types.ts:36

___

### Preset

Ƭ **Preset**: [`BasePreset`](../wiki/BasePreset)<`string`, `string`\>

#### Defined in

lib/core.types.ts:201

___

### PresetDetail

Ƭ **PresetDetail**: [`BasePreset`](../wiki/BasePreset)<[`Validator`](../wiki/Validator), [`FieldType`](../wiki/FieldType)\>

#### Defined in

lib/core.types.ts:202

___

### ValueSyncMap

Ƭ **ValueSyncMap**: `Record`<`string`, [`FieldValueSync`](../wiki/FieldValueSync)[]\>

#### Defined in

lib/helpers/getValueSyncMap/getValueSyncMap.types.ts:3

## Variables

### CompareView

• `Const` **CompareView**: `FC`<`CompareViewProps`\>

#### Defined in

lib/components/CompareView/CompareView.tsx:17

___

### FieldRendererStyles

• `Const` **FieldRendererStyles**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

global.d.ts:6

___

### Form

• `Const` **Form**: `React.FC`<`FormProps`<[`FormValues`](../wiki/Exports#formvalues)\>\>

#### Defined in

lib/components/Form/Form.tsx:17

___

### FormikOnChangeHandler

• `Const` **FormikOnChangeHandler**: `FC`<`FormikOnChangeHandlerProps`\>

#### Defined in

lib/components/FormikOnChangeHandler/FormikOnChangeHandler.tsx:7

___

### View

• `Const` **View**: `FC`<`ViewProps`\>

#### Defined in

lib/components/View/View.tsx:10
