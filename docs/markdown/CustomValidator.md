# Class: CustomValidator

## Table of contents

### Constructors

- [constructor](../wiki/CustomValidator#constructor)

### Properties

- [ajv](../wiki/CustomValidator#ajv)

### Accessors

- [errorMessages](../wiki/CustomValidator#errormessages)
- [schema](../wiki/CustomValidator#schema)
- [validator](../wiki/CustomValidator#validator)

### Methods

- [setErrorMessages](../wiki/CustomValidator#seterrormessages)
- [setSchema](../wiki/CustomValidator#setschema)
- [validate](../wiki/CustomValidator#validate)

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
