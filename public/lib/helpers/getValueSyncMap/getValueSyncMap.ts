import { ContentTypeFieldSchema, FieldValueSync, MAP_MODES } from '../../core.types';

export const getValueSyncMap = (
	fields: ContentTypeFieldSchema[]
): Record<string, FieldValueSync[]> => {
	const valueSyncMap: Record<string, FieldValueSync[]> = {};

	for (const field of fields) {
		const { preset } = field;

		for (const path of preset?.data?.generalConfig?.mapValueToContentItemPath || []) {
			if (path.type === MAP_MODES.FE_REVERSED_DYNAMIC) {
				valueSyncMap[path.sourcePath[0]] = [
					...(valueSyncMap[path.sourcePath[0]] ? valueSyncMap[path.sourcePath[0]] : []),
					{
						type: MAP_MODES.FE_DYNAMIC,
						sourcePath: path.sourcePath,
						destPath: [field.name, ...path.destPath],
					},
				];

				continue;
			}

			if (path.type === MAP_MODES.FE_DYNAMIC) {
				valueSyncMap[path.sourcePath[0]] = [
					...(valueSyncMap[path.sourcePath[0]] ? valueSyncMap[path.sourcePath[0]] : []),
					path,
				];

				continue;
			}
		}
	}

	return valueSyncMap;
};
