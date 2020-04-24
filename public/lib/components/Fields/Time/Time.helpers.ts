export const mapToObject = (items: Array<string>): any => {
	return items.map((item: string) => {
		return {
			key: item,
			value: item,
			label: item,
		};
	});
};

export const getFormattedTime = (dateString: string): { hours: string; minutes: string } | null => {
	if (!dateString || dateString.length === 0) {
		return null;
	}

	const date = new Date(dateString);
	return {
		hours: date.getHours().toString(),
		minutes: date.getMinutes().toString(),
	};
};
