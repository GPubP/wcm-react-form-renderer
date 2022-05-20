# Interface: ViewConfig

## Table of contents

### Properties

- [component](../wiki/ViewConfig#component)
- [module](../wiki/ViewConfig#module)
- [name](../wiki/ViewConfig#name)

## Properties

### component

• **component**: `FC`<[`ViewFieldProps`](../wiki/ViewFieldProps)\>

The component that will be rendered inside the view

#### Defined in

lib/services/viewRegistry/viewRegistry.types.ts:35

___

### module

• **module**: `string`

module
This prop defines which readaction module
has registered this view.
It is possible to have multiple image views
across modules
On the other hand, it is not possible to have multiple image
views in the same module.

#### Defined in

lib/services/viewRegistry/viewRegistry.types.ts:31

___

### name

• **name**: `string`

Name of the view
This is a unique identifier

#### Defined in

lib/services/viewRegistry/viewRegistry.types.ts:21
