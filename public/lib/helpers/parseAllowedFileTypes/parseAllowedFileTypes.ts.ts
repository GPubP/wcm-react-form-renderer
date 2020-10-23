const parseAllowedFileTypes = (allowedFileTypes: string | string[] | undefined): string[] => {
	if (!allowedFileTypes) {
		return [];
	}

	return typeof allowedFileTypes === 'string'
		? allowedFileTypes.replace('.', '').split(', ')
		: allowedFileTypes;
};

export default parseAllowedFileTypes;
