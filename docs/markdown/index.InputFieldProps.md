# Interface: InputFieldProps

[index](../wiki/index).InputFieldProps

## Table of contents

### Properties

- [fieldHelperProps](../wiki/index.InputFieldProps#fieldhelperprops)
- [fieldProps](../wiki/index.InputFieldProps#fieldprops)
- [fieldSchema](../wiki/index.InputFieldProps#fieldschema)

## Properties

### fieldHelperProps

• **fieldHelperProps**: `FieldHelperProps`<`any`\>

FieldHelperProps
helper functions which you can use to imperatively change the value, error value or touched status for the field in question

#### Defined in

lib/services/fieldRegistry/fieldRegistry.types.ts:24

___

### fieldProps

• **fieldProps**: `FieldProps`<`string`, `FormikValues`\>

Formik field props
for more detail visit, https://jaredpalmer.com/formik/docs/api/field

#### Defined in

lib/services/fieldRegistry/fieldRegistry.types.ts:13

___

### fieldSchema

• **fieldSchema**: [`FieldSchema`](../wiki/index.FieldSchema)

Fieldschema
This is a partial of FormSchema
But it only holds the schema information for a field

#### Defined in

lib/services/fieldRegistry/fieldRegistry.types.ts:19
