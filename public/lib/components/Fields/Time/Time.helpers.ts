export const mapToObject = (items: Array<string>): any => {
	return items.map((item: string) => {
		return {
			key: item,
			value: item,
			label: item,
		};
	});
};

export const getHours = (dateString: string): string => {
	if (!dateString) {
		return '';
	}

	const date = new Date(dateString);
	return date.getHours().toString();
};

export const getMinutes = (dateString: string): string => {
	if (!dateString) {
		return '';
	}

	const date = new Date(dateString);
	return date.getMinutes().toString();
};
