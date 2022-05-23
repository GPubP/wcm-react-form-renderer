# Class: CustomValidatorWorker

[Module API](../wiki/Module%20API).CustomValidatorWorker

## Table of contents

### Constructors

- [constructor](../wiki/Module%20API.CustomValidatorWorker#constructor)

### Properties

- [errorMessages](../wiki/Module%20API.CustomValidatorWorker#errormessages)
- [schema](../wiki/Module%20API.CustomValidatorWorker#schema)
- [validator](../wiki/Module%20API.CustomValidatorWorker#validator)

### Methods

- [setErrorMessages](../wiki/Module%20API.CustomValidatorWorker#seterrormessages)
- [setSchema](../wiki/Module%20API.CustomValidatorWorker#setschema)
- [terminate](../wiki/Module%20API.CustomValidatorWorker#terminate)
- [validate](../wiki/Module%20API.CustomValidatorWorker#validate)

## Constructors

### constructor

• **new CustomValidatorWorker**(`tenantId`, `schema`, `errorMessages`, `options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tenantId` | `string` |
| `schema` | `boolean` \| `Record`<`string`, `any`\> |
| `errorMessages` | `Object` |
| `options` | `CustomValidatorOptions` |

#### Defined in

lib/classes/CustomValidatorWorker/CustomValidatorWorker.ts:21

## Properties

### errorMessages

• `Readonly` **errorMessages**: `Object`

#### Index signature

▪ [key: `string`]: { `[key: string]`: `string`;  } \| `string`

#### Defined in

lib/classes/CustomValidatorWorker/CustomValidatorWorker.ts:16

___

### schema

• `Readonly` **schema**: `boolean` \| `object`

#### Defined in

lib/classes/CustomValidatorWorker/CustomValidatorWorker.ts:17

___

### validator

• `Readonly` **validator**: ``null`` \| `ValidateFunction` = `null`

#### Defined in

lib/classes/CustomValidatorWorker/CustomValidatorWorker.ts:15

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

lib/classes/CustomValidatorWorker/CustomValidatorWorker.ts:57

___

### setSchema

▸ **setSchema**(`schema`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `boolean` \| `Record`<`string`, `any`\> |

#### Returns

`void`

#### Defined in

lib/classes/CustomValidatorWorker/CustomValidatorWorker.ts:46

___

### terminate

▸ **terminate**(): `void`

#### Returns

`void`

#### Defined in

lib/classes/CustomValidatorWorker/CustomValidatorWorker.ts:75

___

### validate

▸ **validate**<`Values`\>(`values`): `Promise`<`FormikErrors`<`Values`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Values` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `FormikValues` |

#### Returns

`Promise`<`FormikErrors`<`Values`\>\>

#### Defined in

lib/classes/CustomValidatorWorker/CustomValidatorWorker.ts:68
