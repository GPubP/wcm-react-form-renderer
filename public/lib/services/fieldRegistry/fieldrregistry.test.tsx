import React from 'react';

import FieldRegistry from './fieldRegistry';
import { FieldConfig, InputFieldProps } from './fieldRegistry.types';

const DummyFieldComponent: React.FC<InputFieldProps> = () => <div>component</div>;

describe('fieldRegistry', () => {
	const DefaultFieldConfig: FieldConfig = {
		name: 'text',
		module: 'core',
		component: DummyFieldComponent,
	};

	describe('add', () => {
		it('should add a new field config to the registry', () => {
			const fieldRegistry = new FieldRegistry();
			const fieldConfig: FieldConfig = {
				...DefaultFieldConfig,
			};

			fieldRegistry.add(fieldConfig);

			expect(fieldRegistry.get(fieldConfig.module, fieldConfig.name)).toEqual(fieldConfig);
		});

		it('should throw an error when the field already exist in the given module', () => {
			const fieldRegistry = new FieldRegistry();
			const fieldConfig: FieldConfig = {
				...DefaultFieldConfig,
			};

			fieldRegistry.add(fieldConfig);

			const error = (): void => {
				fieldRegistry.add(fieldConfig);
			};

			expect(error).toThrow();
		});

		it('should throw an error when the name is undefined or null', () => {
			const fieldRegistry = new FieldRegistry();
			const fieldConfig: FieldConfig = {
				...DefaultFieldConfig,
				name: (undefined as unknown) as string,
			};

			const error = (): void => {
				fieldRegistry.add(fieldConfig);
			};

			expect(error).toThrow();
		});

		it('should throw an error when the module is undefined or null', () => {
			const fieldRegistry = new FieldRegistry();
			const fieldConfig: FieldConfig = {
				...DefaultFieldConfig,
				module: (undefined as unknown) as string,
			};

			const error = (): void => {
				fieldRegistry.add(fieldConfig);
			};

			expect(error).toThrow();
		});
	});

	describe('get', () => {
		const fieldRegistry = new FieldRegistry();
		const fieldConfig: FieldConfig = {
			...DefaultFieldConfig,
		};

		fieldRegistry.add(fieldConfig);

		it('should return the field config', () => {
			expect(fieldRegistry.get(fieldConfig.module, fieldConfig.name)).toEqual(fieldConfig);
		});

		it('should return undefined when the module does not exist', () => {
			expect(fieldRegistry.get('nonExistingModule', fieldConfig.name)).toBeUndefined();
		});

		it('should return undefined when the registry can not find a field with the given name', () => {
			expect(fieldRegistry.get(fieldConfig.module, 'nonExtingField')).toBeUndefined();
		});

		it('should return undefined when name or module is undefined or null', () => {
			expect(
				fieldRegistry.get((undefined as unknown) as string, fieldConfig.name)
			).toBeUndefined();
		});
	});
});
