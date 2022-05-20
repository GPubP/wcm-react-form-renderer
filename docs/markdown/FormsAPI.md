# Interface: FormsAPI

## Table of contents

### Properties

- [CompareView](../wiki/FormsAPI#compareview)
- [CustomValidator](../wiki/FormsAPI#customvalidator)
- [CustomValidatorWorker](../wiki/FormsAPI#customvalidatorworker)
- [DEFAULT\_ALLOWED\_HEADERS](../wiki/FormsAPI#default_allowed_headers)
- [DEFAULT\_FIELD\_CONFIG\_PROPS](../wiki/FormsAPI#default_field_config_props)
- [ErrorMessage](../wiki/FormsAPI#errormessage)
- [FieldRendererContext](../wiki/FormsAPI#fieldrenderercontext)
- [Form](../wiki/FormsAPI#form)
- [FormContext](../wiki/FormsAPI#formcontext)
- [FormRendererFieldTitle](../wiki/FormsAPI#formrendererfieldtitle)
- [View](../wiki/FormsAPI#view)
- [fieldRegistry](../wiki/FormsAPI#fieldregistry)
- [filterAllowedOptions](../wiki/FormsAPI#filterallowedoptions)
- [getValueSyncMap](../wiki/FormsAPI#getvaluesyncmap)
- [parseFields](../wiki/FormsAPI#parsefields)
- [useFieldRendererContext](../wiki/FormsAPI#usefieldrenderercontext)
- [useFormContext](../wiki/FormsAPI#useformcontext)
- [useSelectFirstOptionWhenHidden](../wiki/FormsAPI#useselectfirstoptionwhenhidden)
- [viewRegistry](../wiki/FormsAPI#viewregistry)

## Properties

### CompareView

• **CompareView**: `FC`<`CompareViewProps`\>

#### Defined in

lib/core.types.ts:130

___

### CustomValidator

• **CustomValidator**: [`CustomValidator`](../wiki/CustomValidator)

#### Defined in

lib/core.types.ts:132

___

### CustomValidatorWorker

• **CustomValidatorWorker**: `CustomValidatorWorker`

#### Defined in

lib/core.types.ts:133

___

### DEFAULT\_ALLOWED\_HEADERS

• **DEFAULT\_ALLOWED\_HEADERS**: readonly `AllowedHeader`[]

#### Defined in

lib/core.types.ts:143

___

### DEFAULT\_FIELD\_CONFIG\_PROPS

• **DEFAULT\_FIELD\_CONFIG\_PROPS**: `string`[]

#### Defined in

lib/core.types.ts:144

___

### ErrorMessage

• **ErrorMessage**: `FC`<`ErrorMessageProps`\>

#### Defined in

lib/core.types.ts:131

___

### FieldRendererContext

• **FieldRendererContext**: `Context`<[`FieldRenderContextValue`](../wiki/FieldRenderContextValue)\>

#### Defined in

lib/core.types.ts:140

___

### Form

• **Form**: `FC`<`FormProps`<`FormikValues`\>\>

#### Defined in

lib/core.types.ts:128

___

### FormContext

• **FormContext**: `Context`<[`FormContextValue`](../wiki/FormContextValue)\>

#### Defined in

lib/core.types.ts:141

___

### FormRendererFieldTitle

• **FormRendererFieldTitle**: `FC`<`FormRendererFieldTitleProps`\>

#### Defined in

lib/core.types.ts:142

___

### View

• **View**: `FC`<`ViewProps`\>

#### Defined in

lib/core.types.ts:129

___

### fieldRegistry

• **fieldRegistry**: `FieldRegistry`

#### Defined in

lib/core.types.ts:134

___

### filterAllowedOptions

• **filterAllowedOptions**: (`options`: `undefined` \| [`FieldOption`](../wiki/FieldOption)[], `allowedOptions`: `undefined` \| `string`[], `keyPrefix?`: `string`) => { `key?`: `string` ; `label?`: `string` ; `value`: `string`  }[]

#### Type declaration

▸ (`options`, `allowedOptions`, `keyPrefix?`): { `key?`: `string` ; `label?`: `string` ; `value`: `string`  }[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `undefined` \| [`FieldOption`](../wiki/FieldOption)[] |
| `allowedOptions` | `undefined` \| `string`[] |
| `keyPrefix?` | `string` |

##### Returns

{ `key?`: `string` ; `label?`: `string` ; `value`: `string`  }[]

#### Defined in

lib/core.types.ts:146

___

### getValueSyncMap

• **getValueSyncMap**: (`fields`: [`ContentTypeFieldSchema`](../wiki/ContentTypeFieldSchema)[]) => `Record`<`string`, [`FieldValueSync`](../wiki/FieldValueSync)[]\>

#### Type declaration

▸ (`fields`): `Record`<`string`, [`FieldValueSync`](../wiki/FieldValueSync)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `fields` | [`ContentTypeFieldSchema`](../wiki/ContentTypeFieldSchema)[] |

##### Returns

`Record`<`string`, [`FieldValueSync`](../wiki/FieldValueSync)[]\>

#### Defined in

lib/core.types.ts:137

___

### parseFields

• **parseFields**: (`fields`: [`ContentTypeFieldSchema`](../wiki/ContentTypeFieldSchema)[], `options?`: [`ParseFieldsOptions`](../wiki/ParseFieldsOptions)) => [`FieldSchema`](../wiki/FieldSchema)[]

#### Type declaration

▸ (`fields?`, `options?`): [`FieldSchema`](../wiki/FieldSchema)[]

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `fields` | [`ContentTypeFieldSchema`](../wiki/ContentTypeFieldSchema)[] | `[]` |
| `options?` | [`ParseFieldsOptions`](../wiki/ParseFieldsOptions) | `undefined` |

##### Returns

[`FieldSchema`](../wiki/FieldSchema)[]

#### Defined in

lib/core.types.ts:136

___

### useFieldRendererContext

• **useFieldRendererContext**: () => [`FieldRenderContextValue`](../wiki/FieldRenderContextValue)

#### Type declaration

▸ (): [`FieldRenderContextValue`](../wiki/FieldRenderContextValue)

##### Returns

[`FieldRenderContextValue`](../wiki/FieldRenderContextValue)

#### Defined in

lib/core.types.ts:138

___

### useFormContext

• **useFormContext**: () => [`FormContextValue`](../wiki/FormContextValue)

#### Type declaration

▸ (): [`FormContextValue`](../wiki/FormContextValue)

##### Returns

[`FormContextValue`](../wiki/FormContextValue)

#### Defined in

lib/core.types.ts:139

___

### useSelectFirstOptionWhenHidden

• **useSelectFirstOptionWhenHidden**: (`config`: `Record`<`string`, `any`\>, `value`: `string`, `fieldHelperProps`: `FieldHelperProps`<`any`\>) => `boolean`

#### Type declaration

▸ (`config`, `value`, `fieldHelperProps`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Record`<`string`, `any`\> |
| `value` | `string` |
| `fieldHelperProps` | `FieldHelperProps`<`any`\> |

##### Returns

`boolean`

#### Defined in

lib/core.types.ts:145

___

### viewRegistry

• **viewRegistry**: `ViewRegistry`

#### Defined in

lib/core.types.ts:135
