export function isDeprecatedDateFormat(date: string): boolean {
	return new RegExp('^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\\/(0[1-9]|1[0-2])\\/\\d{4}$').test(date);
}
