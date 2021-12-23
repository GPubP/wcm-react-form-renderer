import { AllowedHeader } from './Form.types';

export const DEFAULT_ALLOWED_HEADERS = Object.freeze([
	{
		element: 'h2',
		class: 'h6',
	},
	{
		element: 'h3',
		class: 'h4',
	},
	{
		element: 'h4',
		class: 'h5',
	},
	{
		element: 'h5',
		class: 'h6',
	},
] as AllowedHeader[]);
