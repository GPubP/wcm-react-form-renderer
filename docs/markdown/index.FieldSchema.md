# Interface: FieldSchema

[index](../wiki/index).FieldSchema

## Table of contents

### Properties

- [config](../wiki/index.FieldSchema#config)
- [dataType](../wiki/index.FieldSchema#datatype)
- [defaultValue](../wiki/index.FieldSchema#defaultvalue)
- [fields](../wiki/index.FieldSchema#fields)
- [hidden](../wiki/index.FieldSchema#hidden)
- [label](../wiki/index.FieldSchema#label)
- [module](../wiki/index.FieldSchema#module)
- [name](../wiki/index.FieldSchema#name)
- [repeaterComponentName](../wiki/index.FieldSchema#repeatercomponentname)
- [semanticType](../wiki/index.FieldSchema#semantictype)
- [type](../wiki/index.FieldSchema#type)
- [uuid](../wiki/index.FieldSchema#uuid)
- [valueSync](../wiki/index.FieldSchema#valuesync)
- [view](../wiki/index.FieldSchema#view)

## Properties

### config

• `Optional` **config**: `Object`

Field options
You can give any config you want

#### Index signature

▪ [key: `string`]: `any`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |
| `inputDescription?` | `string` |
| `options?` | [`FieldOption`](../wiki/index.FieldOption)[] |
| `preset?` | [`Preset`](../wiki/index#preset) |
| `required?` | `boolean` |
| `synced?` | `boolean` |
| `wrapperClassName?` | `string` |

#### Defined in

lib/core.types.ts:94

___

### dataType

• **dataType**: `string`

Field Data type

#### Defined in

lib/core.types.ts:81

___

### defaultValue

• `Optional` **defaultValue**: `any`

Default value

#### Defined in

lib/core.types.ts:111

___

### fields

• `Optional` **fields**: [`FieldSchema`](../wiki/index.FieldSchema)[]

nested form fields

#### Defined in

lib/core.types.ts:107

___

### hidden

• `Optional` **hidden**: `boolean`

Field hidden toggle

#### Defined in

lib/core.types.ts:68

___

### label

• `Optional` **label**: `string`

Field label

#### Defined in

lib/core.types.ts:89

___

### module

• **module**: `string`

Module name

#### Defined in

lib/core.types.ts:60

___

### name

• **name**: `string`

Field name

#### Defined in

lib/core.types.ts:56

___

### repeaterComponentName

• `Optional` **repeaterComponentName**: `string`

Custom repeater component name

#### Defined in

lib/core.types.ts:72

___

### semanticType

• **semanticType**: `string`

Field Semantic type

#### Defined in

lib/core.types.ts:85

___

### type

• **type**: `string`

Field type

#### Defined in

lib/core.types.ts:64

___

### uuid

• `Optional` **uuid**: `string`

#### Defined in

lib/core.types.ts:112

___

### valueSync

• `Optional` **valueSync**: [`FieldValueSync`](../wiki/index.FieldValueSync)[]

Value sync
Sync value with other field in content item

#### Defined in

lib/core.types.ts:117

___

### view

• `Optional` **view**: `string`

Field view
This field will be uses by the viewer component

#### Defined in

lib/core.types.ts:77
