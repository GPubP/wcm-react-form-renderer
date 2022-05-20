# Interface: FieldRenderContextValue

## Table of contents

### Properties

- [fieldConfig](../wiki/FieldRenderContextValue#fieldconfig)
- [fieldProps](../wiki/FieldRenderContextValue#fieldprops)
- [fieldSchema](../wiki/FieldRenderContextValue#fieldschema)
- [level](../wiki/FieldRenderContextValue#level)
- [parentContext](../wiki/FieldRenderContextValue#parentcontext)
- [renderContext](../wiki/FieldRenderContextValue#rendercontext)

### Methods

- [setWrapperClass](../wiki/FieldRenderContextValue#setwrapperclass)

## Properties

### fieldConfig

• `Optional` **fieldConfig**: [`FieldConfig`](../wiki/FieldConfig)

#### Defined in

lib/context/FieldRendererContext/FieldRendererContext.types.ts:17

___

### fieldProps

• `Optional` **fieldProps**: `FieldProps`<`any`, {}\>

#### Defined in

lib/context/FieldRendererContext/FieldRendererContext.types.ts:23

___

### fieldSchema

• `Optional` **fieldSchema**: [`FieldSchema`](../wiki/FieldSchema)

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

• `Optional` **parentContext**: [`FieldRenderContextValue`](../wiki/FieldRenderContextValue)

#### Defined in

lib/context/FieldRendererContext/FieldRendererContext.types.ts:24

___

### renderContext

• **renderContext**: [`FieldRendererRenderContext`](../wiki/FieldRendererRenderContext)

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
