export const updateDate = (prevDate: Date, inputValue: string): string => {
	const nextDate = new Date(inputValue);

	const year = nextDate.getFullYear();
	const month = nextDate.getMonth();
	const day = nextDate.getDate();

	prevDate.setFullYear(year, month, day);

	return prevDate.toISOString();
};

export const updateTime = (prevDate: Date, inputValue: string): string => {
	const timeArray = inputValue.split(':');

	prevDate.setHours(
		Number(timeArray[0]) || 0,
		Number(timeArray[1]) || 0,
		Number(timeArray[2]) || 0,
		Number(timeArray[3]) || 0
	);

	return prevDate.toISOString();
};

export const getTime = (inputValue: string): string => {
	if (!inputValue || inputValue === '') {
		return '';
	}

	const date = new Date(inputValue);

	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	const milliseconds = date.getMilliseconds();

	const timeString = `${hours}:${minutes}:${seconds}:${milliseconds}`;

	return timeString;
};
