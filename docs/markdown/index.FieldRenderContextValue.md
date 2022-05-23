# Interface: FieldRenderContextValue

[index](../wiki/index).FieldRenderContextValue

## Table of contents

### Properties

- [fieldConfig](../wiki/index.FieldRenderContextValue#fieldconfig)
- [fieldProps](../wiki/index.FieldRenderContextValue#fieldprops)
- [fieldSchema](../wiki/index.FieldRenderContextValue#fieldschema)
- [level](../wiki/index.FieldRenderContextValue#level)
- [parentContext](../wiki/index.FieldRenderContextValue#parentcontext)
- [renderContext](../wiki/index.FieldRenderContextValue#rendercontext)

### Methods

- [setWrapperClass](../wiki/index.FieldRenderContextValue#setwrapperclass)

## Properties

### fieldConfig

• `Optional` **fieldConfig**: [`FieldConfig`](../wiki/index.FieldConfig)

#### Defined in

lib/context/FieldRendererContext/FieldRendererContext.types.ts:17

___

### fieldProps

• `Optional` **fieldProps**: `FieldProps`<`any`, {}\>

#### Defined in

lib/context/FieldRendererContext/FieldRendererContext.types.ts:23

___

### fieldSchema

• `Optional` **fieldSchema**: [`FieldSchema`](../wiki/index.FieldSchema)

Schema of one field
declaration of how the field would look like

#### Defined in

lib/context/FieldRendererContext/FieldRendererContext.types.ts:22

___

### level

• **level**: `number`

#### Defined in

lib/context/FieldRendererContext/FieldRendererContext.types.ts:14

___

### parentContext

• `Optional` **parentContext**: [`FieldRenderContextValue`](../wiki/index.FieldRenderContextValue)

#### Defined in

lib/context/FieldRendererContext/FieldRendererContext.types.ts:24

___

### renderContext

• **renderContext**: [`FieldRendererRenderContext`](../wiki/index.FieldRendererRenderContext)

#### Defined in

lib/context/FieldRendererContext/FieldRendererContext.types.ts:15

## Methods

### setWrapperClass

▸ **setWrapperClass**(`className`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `className` | `string` |

#### Returns

`void`

#### Defined in

lib/context/FieldRendererContext/FieldRendererContext.types.ts:16
