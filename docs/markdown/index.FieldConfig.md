# Interface: FieldConfig

[index](../wiki/index).FieldConfig

## Table of contents

### Properties

- [component](../wiki/index.FieldConfig#component)
- [module](../wiki/index.FieldConfig#module)
- [name](../wiki/index.FieldConfig#name)
- [repeaterComponent](../wiki/index.FieldConfig#repeatercomponent)
- [viewComponent](../wiki/index.FieldConfig#viewcomponent)

## Properties

### component

• **component**: `FC`<[`InputFieldProps`](../wiki/index.InputFieldProps)\>

The component that will be rendered inside the form

#### Defined in

lib/services/fieldRegistry/fieldRegistry.types.ts:45

___

### module

• **module**: `string`

module
This prop defines which readaction module
has registered this field.
It is possible to have multiple text fields
across modules
On the other hand, it is not possible to have multiple text
fields in the same module.

#### Defined in

lib/services/fieldRegistry/fieldRegistry.types.ts:41

___

### name

• **name**: `string`

Name of the field
This is a unique identifier

#### Defined in

lib/services/fieldRegistry/fieldRegistry.types.ts:31

___

### repeaterComponent

• `Optional` **repeaterComponent**: `FC`<`RepeaterProps`\>

The component that will be used as repeater

#### Defined in

lib/services/fieldRegistry/fieldRegistry.types.ts:53

___

### viewComponent

• `Optional` **viewComponent**: `FC`<[`ViewFieldProps`](../wiki/index.ViewFieldProps)\>

The component that will be rendered inside the viewer

#### Defined in

lib/services/fieldRegistry/fieldRegistry.types.ts:49
