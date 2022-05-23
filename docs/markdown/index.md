# Module: index

## Table of contents

### Enumerations

- [MAP\_MODES](../wiki/index.MAP_MODES)

### Classes

- [CustomValidator](../wiki/index.CustomValidator)

### Interfaces

- [BasePreset](../wiki/index.BasePreset)
- [ContentTypeFieldSchema](../wiki/index.ContentTypeFieldSchema)
- [DataType](../wiki/index.DataType)
- [FieldCompartment](../wiki/index.FieldCompartment)
- [FieldConfig](../wiki/index.FieldConfig)
- [FieldOption](../wiki/index.FieldOption)
- [FieldRenderContextValue](../wiki/index.FieldRenderContextValue)
- [FieldRendererRenderContext](../wiki/index.FieldRendererRenderContext)
- [FieldSchema](../wiki/index.FieldSchema)
- [FieldType](../wiki/index.FieldType)
- [FieldValueSync](../wiki/index.FieldValueSync)
- [FieldsRegistryConfig](../wiki/index.FieldsRegistryConfig)
- [FormContextValue](../wiki/index.FormContextValue)
- [FormSchema](../wiki/index.FormSchema)
- [FormsAPI](../wiki/index.FormsAPI)
- [GeneralConfig](../wiki/index.GeneralConfig)
- [InputFieldProps](../wiki/index.InputFieldProps)
- [Operator](../wiki/index.Operator)
- [ParseFieldsOptions](../wiki/index.ParseFieldsOptions)
- [ValicationCheckWithAllowedFields](../wiki/index.ValicationCheckWithAllowedFields)
- [ValicationCheckWithFields](../wiki/index.ValicationCheckWithFields)
- [Validation](../wiki/index.Validation)
- [ValidationCheck](../wiki/index.ValidationCheck)
- [ValidationCheckAllowedField](../wiki/index.ValidationCheckAllowedField)
- [ValidationCheckField](../wiki/index.ValidationCheckField)
- [ValidationSchema](../wiki/index.ValidationSchema)
- [Validator](../wiki/index.Validator)
- [ViewConfig](../wiki/index.ViewConfig)
- [ViewFieldProps](../wiki/index.ViewFieldProps)
- [ViewRegistryConfig](../wiki/index.ViewRegistryConfig)

### Type aliases

- [FieldDataType](../wiki/index#fielddatatype)
- [FormValues](../wiki/index#formvalues)
- [Preset](../wiki/index#preset)
- [PresetDetail](../wiki/index#presetdetail)
- [ValueSyncMap](../wiki/index#valuesyncmap)

### Variables

- [CompareView](../wiki/index#compareview)
- [FieldRendererStyles](../wiki/index#fieldrendererstyles)
- [Form](../wiki/index#form)
- [FormikOnChangeHandler](../wiki/index#formikonchangehandler)
- [View](../wiki/index#view)

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

Ƭ **Preset**: [`BasePreset`](../wiki/index.BasePreset)<`string`, `string`\>

#### Defined in

lib/core.types.ts:201

___

### PresetDetail

Ƭ **PresetDetail**: [`BasePreset`](../wiki/index.BasePreset)<[`Validator`](../wiki/index.Validator), [`FieldType`](../wiki/index.FieldType)\>

#### Defined in

lib/core.types.ts:202

___

### ValueSyncMap

Ƭ **ValueSyncMap**: `Record`<`string`, [`FieldValueSync`](../wiki/index.FieldValueSync)[]\>

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

• `Const` **Form**: `React.FC`<`FormProps`<[`FormValues`](../wiki/index#formvalues)\>\>

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
