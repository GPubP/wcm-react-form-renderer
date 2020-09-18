import { FileUploadPresetView } from '../../components/Views/FileUploadPreset';

import { ViewConfig, ViewRegistryConfig } from './viewRegistry.types';

export class ViewRegistry {
	private views: ViewRegistryConfig = {};

	constructor(views?: ViewConfig[]) {
		if (Array.isArray(views)) {
			this.registerViews(views);
		}
	}

	private registerViews(views: ViewConfig[]): void {
		views.forEach(view => this.add(view));
	}

	public get(moduleName: string, name?: string): ViewConfig | undefined {
		if (!moduleName || !name) {
			// return default vie
			return;
		}

		if (!this.views[moduleName]) {
			return;
		}

		return this.views[moduleName][name];
	}

	public add(view: ViewConfig | ViewConfig[]): void {
		if (Array.isArray(view)) {
			return this.registerViews(view);
		}

		if (this.views[view.module] && this.views[view.module][view.name]) {
			throw new Error(
				`Register view failed, view with name ${view.name} and module ${view.module} already exist`
			);
		}

		if (!view.name) {
			throw new Error('Register view failed, view name is required');
		}

		if (!view.module) {
			throw new Error('Register view failed, view module is required');
		}

		if (!view.component) {
			throw new Error(`Register view failed, view component is required`);
		}

		if (!this.views[view.module]) {
			this.views[view.module] = {};
		}

		this.views[view.module][view.name] = view;
	}
}

export const viewRegistry = new ViewRegistry([
	{
		name: 'fileUploadPreset',
		module: 'core',
		component: FileUploadPresetView,
	},
]);
