import { GeneralConfig } from '../../core.types';
import { ValueSyncMap } from '../getValueSyncMap/getValueSyncMap.types';

export interface ParseFieldsOptions {
	noHiddenFields?: boolean;
	noDisabledFields?: boolean;
	parentGeneralConfig?: GeneralConfig;
	valueSyncMap?: ValueSyncMap;
	activeLanguageKey?: string;
}
