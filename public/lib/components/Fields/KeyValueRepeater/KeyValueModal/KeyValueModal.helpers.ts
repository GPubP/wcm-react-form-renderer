import { SelectOption } from '@redactie/utils';

export const csvToArray = (
	csv: string,
	delimiter = ','
): { keyValuePairs: SelectOption[]; warning: string } => {
	const rowData = csv.split('\n');
	return rowData.reduce(
		(acc: { keyValuePairs: SelectOption[]; warning: string }, row: string) => {
			const values = row.split(delimiter);

			if (values.length !== 2 || !values[0] || !values[1]) {
				return {
					...acc,
					warning: 'Ongeldige CSV',
				};
			}

			acc.keyValuePairs.push({
				label: values[0],
				value: values[1],
			});

			return acc;
		},
		{ keyValuePairs: [], warning: '' }
	);
};
