# Module: Module API

## Table of contents

### References

- [CompareView](../wiki/Module%20API#compareview)
- [CustomValidator](../wiki/Module%20API#customvalidator)
- [Form](../wiki/Module%20API#form)
- [View](../wiki/Module%20API#view)

### Classes

- [CustomValidatorWorker](../wiki/Module%20API.CustomValidatorWorker)

### Variables

- [DEFAULT\_ALLOWED\_HEADERS](../wiki/Module%20API#default_allowed_headers)
- [DEFAULT\_FIELD\_CONFIG\_PROPS](../wiki/Module%20API#default_field_config_props)
- [ErrorMessage](../wiki/Module%20API#errormessage)
- [FieldRendererContext](../wiki/Module%20API#fieldrenderercontext)
- [FormContext](../wiki/Module%20API#formcontext)
- [FormRendererFieldInfo](../wiki/Module%20API#formrendererfieldinfo)
- [FormRendererFieldTitle](../wiki/Module%20API#formrendererfieldtitle)
- [fieldRegistry](../wiki/Module%20API#fieldregistry)
- [viewRegistry](../wiki/Module%20API#viewregistry)

### Functions

- [filterAllowedOptions](../wiki/Module%20API#filterallowedoptions)
- [getValueSyncMap](../wiki/Module%20API#getvaluesyncmap)
- [parseFields](../wiki/Module%20API#parsefields)
- [useFieldRendererContext](../wiki/Module%20API#usefieldrenderercontext)
- [useFormContext](../wiki/Module%20API#useformcontext)
- [useSelectFirstOptionWhenHidden](../wiki/Module%20API#useselectfirstoptionwhenhidden)

## References

### CompareView

Re-exports [CompareView](../wiki/index#compareview)

___

### CustomValidator

Re-exports [CustomValidator](../wiki/index.CustomValidator)

___

### Form

Re-exports [Form](../wiki/index#form)

___

### View

Re-exports [View](../wiki/index#view)

## Variables

### DEFAULT\_ALLOWED\_HEADERS

• `Const` **DEFAULT\_ALLOWED\_HEADERS**: readonly `AllowedHeader`[]

#### Defined in

lib/components/Form/Form.const.ts:3

___

### DEFAULT\_FIELD\_CONFIG\_PROPS

• `Const` **DEFAULT\_FIELD\_CONFIG\_PROPS**: `string`[]

#### Defined in

lib/components/Fields/Fields.const.ts:1

___

### ErrorMessage

• `Const` **ErrorMessage**: `FC`<`ErrorMessageProps`\>

#### Defined in

lib/components/ErrorMessage/ErrorMessage.tsx:6

___

### FieldRendererContext

• `Const` **FieldRendererContext**: `Context`<[`FieldRenderContextValue`](../wiki/index.FieldRenderContextValue)\>

#### Defined in

lib/context/FieldRendererContext/FieldRendererContext.ts:5

___

### FormContext

• `Const` **FormContext**: `Context`<[`FormContextValue`](../wiki/index.FormContextValue)\>

#### Defined in

lib/context/FormContext/FormContext.ts:5

___

### FormRendererFieldInfo

• `Const` **FormRendererFieldInfo**: `FC`<`FormRendererFieldInfoProps`\>

#### Defined in

lib/components/FormRendererFieldInfo/FormRendererFieldInfo.tsx:5

___

### FormRendererFieldTitle

• `Const` **FormRendererFieldTitle**: `FC`<`FormRendererFieldTitleProps`\>

#### Defined in

lib/components/FormRendererFieldTitle/FormRendererFieldTitle.tsx:13

___

### fieldRegistry

• `Const` **fieldRegistry**: `FieldRegistry`

#### Defined in

lib/services/fieldRegistry/fieldRegistry.ts:57

___

### viewRegistry

• `Const` **viewRegistry**: `ViewRegistry`

#### Defined in

lib/services/viewRegistry/viewRegistry.ts:65

## Functions

### filterAllowedOptions

▸ **filterAllowedOptions**(`options`, `allowedOptions`, `keyPrefix?`): { `key?`: `string` ; `label?`: `string` ; `value`: `string`  }[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `undefined` \| [`FieldOption`](../wiki/index.FieldOption)[] |
| `allowedOptions` | `undefined` \| `string`[] |
| `keyPrefix?` | `string` |

#### Returns

{ `key?`: `string` ; `label?`: `string` ; `value`: `string`  }[]

#### Defined in

lib/utils.ts:93

___

### getValueSyncMap

▸ **getValueSyncMap**(`fields`): `Record`<`string`, [`FieldValueSync`](../wiki/index.FieldValueSync)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fields` | [`ContentTypeFieldSchema`](../wiki/index.ContentTypeFieldSchema)[] |

#### Returns

`Record`<`string`, [`FieldValueSync`](../wiki/index.FieldValueSync)[]\>

#### Defined in

lib/helpers/getValueSyncMap/getValueSyncMap.ts:3

___

### parseFields

▸ **parseFields**(`fields?`, `options?`): [`FieldSchema`](../wiki/index.FieldSchema)[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `fields` | [`ContentTypeFieldSchema`](../wiki/index.ContentTypeFieldSchema)[] | `[]` |
| `options?` | [`ParseFieldsOptions`](../wiki/index.ParseFieldsOptions) | `undefined` |

#### Returns

[`FieldSchema`](../wiki/index.FieldSchema)[]

#### Defined in

lib/helpers/parseFields/parseFields.ts:55

___

### useFieldRendererContext

▸ **useFieldRendererContext**(): [`FieldRenderContextValue`](../wiki/index.FieldRenderContextValue)

#### Returns

[`FieldRenderContextValue`](../wiki/index.FieldRenderContextValue)

#### Defined in

lib/hooks/useFieldRendererContext/useFieldRendererContext.ts:5

___

### useFormContext

▸ **useFormContext**(): [`FormContextValue`](../wiki/index.FormContextValue)

#### Returns

[`FormContextValue`](../wiki/index.FormContextValue)

#### Defined in

lib/hooks/useFormContext/useFormContext.ts:5

___

### useSelectFirstOptionWhenHidden

▸ **useSelectFirstOptionWhenHidden**(`config`, `value`, `fieldHelperProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Record`<`string`, `any`\> |
| `value` | `string` |
| `fieldHelperProps` | `FieldHelperProps`<`any`\> |

#### Returns

`boolean`

#### Defined in

lib/hooks/useSelectFirstOptionWhenHidden/useSelectFirstOptionWhenHidden.ts:4
