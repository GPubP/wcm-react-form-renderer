# Interface: FieldSchema

## Table of contents

### Properties

- [config](../wiki/FieldSchema#config)
- [dataType](../wiki/FieldSchema#datatype)
- [defaultValue](../wiki/FieldSchema#defaultvalue)
- [fields](../wiki/FieldSchema#fields)
- [hidden](../wiki/FieldSchema#hidden)
- [label](../wiki/FieldSchema#label)
- [module](../wiki/FieldSchema#module)
- [name](../wiki/FieldSchema#name)
- [repeaterComponentName](../wiki/FieldSchema#repeatercomponentname)
- [semanticType](../wiki/FieldSchema#semantictype)
- [type](../wiki/FieldSchema#type)
- [uuid](../wiki/FieldSchema#uuid)
- [valueSync](../wiki/FieldSchema#valuesync)
- [view](../wiki/FieldSchema#view)

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
| `options?` | [`FieldOption`](../wiki/FieldOption)[] |
| `preset?` | [`Preset`](../wiki/Exports#preset) |
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

• `Optional` **fields**: [`FieldSchema`](../wiki/FieldSchema)[]

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

• `Optional` **valueSync**: [`FieldValueSync`](../wiki/FieldValueSync)[]

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
