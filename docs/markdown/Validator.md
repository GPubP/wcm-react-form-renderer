# Interface: Validator

## Table of contents

### Properties

- [data](../wiki/Validator#data)
- [meta](../wiki/Validator#meta)
- [uuid](../wiki/Validator#uuid)

## Properties

### data

• **data**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dataTypes` | `string`[] |
| `defaultValue` | `Record`<`string`, `any`\> |
| `description` | `string` |
| `formSchema` | { `fields`: [`ContentTypeFieldSchema`](../wiki/ContentTypeFieldSchema)[]  } |
| `formSchema.fields` | [`ContentTypeFieldSchema`](../wiki/ContentTypeFieldSchema)[] |
| `label` | `string` |
| `name` | `string` |

#### Defined in

lib/core.types.ts:151

___

### meta

• **meta**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `created` | `string` |
| `deleted` | `string` |
| `lastEditor` | `string` |
| `lastModified` | `string` |

#### Defined in

lib/core.types.ts:161

___

### uuid

• **uuid**: `string`

#### Defined in

lib/core.types.ts:150
