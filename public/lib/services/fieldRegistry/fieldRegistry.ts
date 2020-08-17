import { DefaultFields } from '../../components/Fields';

import { FieldConfig, FieldsRegistryConfig } from './fieldRegistry.types';

export class FieldRegistry {
	private fields: FieldsRegistryConfig = {};

	constructor(fields?: FieldConfig[]) {
		if (Array.isArray(fields)) {
			this.registerFields(fields);
		}
	}

	private registerFields(fields: FieldConfig[]): void {
		fields.forEach(field => this.add(field));
	}

	public get(moduleName: string, name: string): FieldConfig | undefined {
		if (!moduleName || !name) {
			return;
		}

		if (!this.fields[moduleName]) {
			return;
		}

		return this.fields[moduleName][name];
	}

	public add(field: FieldConfig | FieldConfig[]): void {
		if (Array.isArray(field)) {
			return this.registerFields(field);
		}

		if (this.fields[field.module] && this.fields[field.module][field.name]) {
			throw new Error(
				`Register Field failed, Field with name ${field.name} and module ${field.module} already exist`
			);
		}

		if (!field.name) {
			throw new Error('Register Field failed, Field name is required');
		}

		if (!field.module) {
			throw new Error('Register Field failed, Field module is required');
		}

		if (!this.fields[field.module]) {
			this.fields[field.module] = {};
		}

		this.fields[field.module][field.name] = field;
	}
}

export const fieldRegistry = new FieldRegistry(DefaultFields);
