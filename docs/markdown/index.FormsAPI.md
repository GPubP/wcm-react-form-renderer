# Interface: FormsAPI

[index](../wiki/index).FormsAPI

## Table of contents

### Properties

- [CompareView](../wiki/index.FormsAPI#compareview)
- [CustomValidator](../wiki/index.FormsAPI#customvalidator)
- [CustomValidatorWorker](../wiki/index.FormsAPI#customvalidatorworker)
- [DEFAULT\_ALLOWED\_HEADERS](../wiki/index.FormsAPI#default_allowed_headers)
- [DEFAULT\_FIELD\_CONFIG\_PROPS](../wiki/index.FormsAPI#default_field_config_props)
- [ErrorMessage](../wiki/index.FormsAPI#errormessage)
- [FieldRendererContext](../wiki/index.FormsAPI#fieldrenderercontext)
- [Form](../wiki/index.FormsAPI#form)
- [FormContext](../wiki/index.FormsAPI#formcontext)
- [FormRendererFieldTitle](../wiki/index.FormsAPI#formrendererfieldtitle)
- [View](../wiki/index.FormsAPI#view)
- [fieldRegistry](../wiki/index.FormsAPI#fieldregistry)
- [filterAllowedOptions](../wiki/index.FormsAPI#filterallowedoptions)
- [getValueSyncMap](../wiki/index.FormsAPI#getvaluesyncmap)
- [parseFields](../wiki/index.FormsAPI#parsefields)
- [useFieldRendererContext](../wiki/index.FormsAPI#usefieldrenderercontext)
- [useFormContext](../wiki/index.FormsAPI#useformcontext)
- [useSelectFirstOptionWhenHidden](../wiki/index.FormsAPI#useselectfirstoptionwhenhidden)
- [viewRegistry](../wiki/index.FormsAPI#viewregistry)

## Properties

### CompareView

• **CompareView**: `FC`<`CompareViewProps`\>

#### Defined in

lib/core.types.ts:130

___

### CustomValidator

• **CustomValidator**: [`CustomValidator`](../wiki/index.CustomValidator)

#### Defined in

lib/core.types.ts:132

___

### CustomValidatorWorker

• **CustomValidatorWorker**: [`CustomValidatorWorker`](../wiki/Module%20API.CustomValidatorWorker)

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

• **FieldRendererContext**: `Context`<[`FieldRenderContextValue`](../wiki/index.FieldRenderContextValue)\>

#### Defined in

lib/core.types.ts:140

___

### Form

• **Form**: `FC`<`FormProps`<`FormikValues`\>\>

#### Defined in

lib/core.types.ts:128

___

### FormContext

• **FormContext**: `Context`<[`FormContextValue`](../wiki/index.FormContextValue)\>

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

• **filterAllowedOptions**: (`options`: `undefined` \| [`FieldOption`](../wiki/index.FieldOption)[], `allowedOptions`: `undefined` \| `string`[], `keyPrefix?`: `string`) => { `key?`: `string` ; `label?`: `string` ; `value`: `string`  }[]

#### Type declaration

▸ (`options`, `allowedOptions`, `keyPrefix?`): { `key?`: `string` ; `label?`: `string` ; `value`: `string`  }[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `undefined` \| [`FieldOption`](../wiki/index.FieldOption)[] |
| `allowedOptions` | `undefined` \| `string`[] |
| `keyPrefix?` | `string` |

##### Returns

{ `key?`: `string` ; `label?`: `string` ; `value`: `string`  }[]

#### Defined in

lib/core.types.ts:146

___

### getValueSyncMap

• **getValueSyncMap**: (`fields`: [`ContentTypeFieldSchema`](../wiki/index.ContentTypeFieldSchema)[]) => `Record`<`string`, [`FieldValueSync`](../wiki/index.FieldValueSync)[]\>

#### Type declaration

▸ (`fields`): `Record`<`string`, [`FieldValueSync`](../wiki/index.FieldValueSync)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `fields` | [`ContentTypeFieldSchema`](../wiki/index.ContentTypeFieldSchema)[] |

##### Returns

`Record`<`string`, [`FieldValueSync`](../wiki/index.FieldValueSync)[]\>

#### Defined in

lib/core.types.ts:137

___

### parseFields

• **parseFields**: (`fields`: [`ContentTypeFieldSchema`](../wiki/index.ContentTypeFieldSchema)[], `options?`: [`ParseFieldsOptions`](../wiki/index.ParseFieldsOptions)) => [`FieldSchema`](../wiki/index.FieldSchema)[]

#### Type declaration

▸ (`fields?`, `options?`): [`FieldSchema`](../wiki/index.FieldSchema)[]

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `fields` | [`ContentTypeFieldSchema`](../wiki/index.ContentTypeFieldSchema)[] | `[]` |
| `options?` | [`ParseFieldsOptions`](../wiki/index.ParseFieldsOptions) | `undefined` |

##### Returns

[`FieldSchema`](../wiki/index.FieldSchema)[]

#### Defined in

lib/core.types.ts:136

___

### useFieldRendererContext

• **useFieldRendererContext**: () => [`FieldRenderContextValue`](../wiki/index.FieldRenderContextValue)

#### Type declaration

▸ (): [`FieldRenderContextValue`](../wiki/index.FieldRenderContextValue)

##### Returns

[`FieldRenderContextValue`](../wiki/index.FieldRenderContextValue)

#### Defined in

lib/core.types.ts:138

___

### useFormContext

• **useFormContext**: () => [`FormContextValue`](../wiki/index.FormContextValue)

#### Type declaration

▸ (): [`FormContextValue`](../wiki/index.FormContextValue)

##### Returns

[`FormContextValue`](../wiki/index.FormContextValue)

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
