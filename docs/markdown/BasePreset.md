# Interface: BasePreset<T, F\>

## Type parameters

| Name |
| :------ |
| `T` |
| `F` |

## Table of contents

### Properties

- [\_id](../wiki/BasePreset#_id)
- [data](../wiki/BasePreset#data)
- [uuid](../wiki/BasePreset#uuid)

## Properties

### \_id

• **\_id**: `string`

#### Defined in

lib/core.types.ts:170

___

### data

• **data**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `defaultConfig` | `Record`<`string`, `any`\> |
| `fieldType` | `F` |
| `fields` | { `field`: `any` ; `formSchema`: { `fields`: [`ContentTypeFieldSchema`](../wiki/ContentTypeFieldSchema)[]  } ; `validators`: `T`[]  }[] |
| `generalConfig` | { `isMultiple`: `boolean` ; `isQueryable`: `boolean` ; `isTranslate`: `boolean` ; `mapValueToContentItemPath`: [`FieldValueSync`](../wiki/FieldValueSync)[]  } |
| `generalConfig.isMultiple` | `boolean` |
| `generalConfig.isQueryable` | `boolean` |
| `generalConfig.isTranslate` | `boolean` |
| `generalConfig.mapValueToContentItemPath` | [`FieldValueSync`](../wiki/FieldValueSync)[] |
| `label` | `string` |
| `meta` | { `created`: `string` ; `deleted`: `boolean` ; `lastModified`: `string`  } |
| `meta.created` | `string` |
| `meta.deleted` | `boolean` |
| `meta.lastModified` | `string` |
| `name` | `string` |
| `repeaterComponentName?` | `string` |
| `validators` | `T`[] |
| `viewComponentName?` | `string` |

#### Defined in

lib/core.types.ts:172

___

### uuid

• **uuid**: `string`

#### Defined in

lib/core.types.ts:171
