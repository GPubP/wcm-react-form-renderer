import { GeneralConfig } from '../../core.types';

export interface ParseFieldsOptions {
	noHiddenFields?: boolean;
	noDisabledFields?: boolean;
	parentGeneralConfig?: GeneralConfig;
}
