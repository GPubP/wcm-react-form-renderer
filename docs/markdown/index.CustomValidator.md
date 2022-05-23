# Class: CustomValidator

[index](../wiki/index).CustomValidator

## Table of contents

### Constructors

- [constructor](../wiki/index.CustomValidator#constructor)

### Properties

- [ajv](../wiki/index.CustomValidator#ajv)

### Accessors

- [errorMessages](../wiki/index.CustomValidator#errormessages)
- [schema](../wiki/index.CustomValidator#schema)
- [validator](../wiki/index.CustomValidator#validator)

### Methods

- [setErrorMessages](../wiki/index.CustomValidator#seterrormessages)
- [setSchema](../wiki/index.CustomValidator#setschema)
- [validate](../wiki/index.CustomValidator#validate)

## Constructors

### constructor

• **new CustomValidator**(`schema`, `errorMessages`, `_options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `boolean` \| `Record`<`string`, `any`\> |
| `errorMessages` | `Object` |
| `_options` | `CustomValidatorOptions` |

#### Defined in

lib/classes/CustomValidator/CustomValidator.ts:29

## Properties

### ajv

• `Readonly` **ajv**: `Ajv`

#### Defined in

lib/classes/CustomValidator/CustomValidator.ts:12

## Accessors

### errorMessages

• `get` **errorMessages**(): `Object`

#### Returns

`Object`

#### Defined in

lib/classes/CustomValidator/CustomValidator.ts:25

___

### schema

• `get` **schema**(): `boolean` \| `object`

#### Returns

`boolean` \| `object`

#### Defined in

lib/classes/CustomValidator/CustomValidator.ts:21

___

### validator

• `get` **validator**(): ``null`` \| `ValidateFunction`

#### Returns

``null`` \| `ValidateFunction`

#### Defined in

lib/classes/CustomValidator/CustomValidator.ts:17

## Methods

### setErrorMessages

▸ **setErrorMessages**(`errorMessages`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `errorMessages` | `Object` |

#### Returns

`void`

#### Defined in

lib/classes/CustomValidator/CustomValidator.ts:44

___

### setSchema

▸ **setSchema**(`schema`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `boolean` \| `object` |

#### Returns

`void`

#### Defined in

lib/classes/CustomValidator/CustomValidator.ts:48

___

### validate

▸ **validate**(`values`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `FormikValues` |

#### Returns

`any`

#### Defined in

lib/classes/CustomValidator/CustomValidator.ts:52
