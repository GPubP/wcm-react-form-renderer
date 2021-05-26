export const dateToISODate = (date: string): string =>
	date
		.split('/')
		.reverse()
		.join('-');

export const ISODateToDate = (date: string): string =>
	date
		.split('-')
		.reverse()
		.join('/');

export const updateDate = (prevDate: Date, inputValue: string): string => {
	const nextDate = new Date(dateToISODate(inputValue));

	const year = nextDate.getFullYear();
	const month = nextDate.getMonth();
	const day = nextDate.getDate();

	prevDate.setFullYear(year, month, day);

	console.log('SET value', prevDate.toISOString());
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

export const getDate = (inputValue: string): string => {
	if (!inputValue || inputValue === '') {
		return '';
	}

	const date = new Date(inputValue);

	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);

	return `${day}/${month}/${year}`;
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
