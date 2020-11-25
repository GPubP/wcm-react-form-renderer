const parseAllowedFileTypes = (allowedFileTypes: string | string[] | undefined): string[] => {
	if (!allowedFileTypes) {
		return [];
	}

	return typeof allowedFileTypes === 'string'
		? allowedFileTypes.replace(/\s*\./gm, '').split(/,|;/g)
		: allowedFileTypes;
};

export default parseAllowedFileTypes;
