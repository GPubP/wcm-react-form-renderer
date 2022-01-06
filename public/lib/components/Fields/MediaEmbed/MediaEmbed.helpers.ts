import { MediaProvider } from './MediaEmbed.types';

export const getUrlMatches = (url: string, pattern: RegExp): string[] | null => {
	// 1. Try to match without stripping the protocol and "www" subdomain.
	let match = url.match(pattern);

	if (match) {
		return match;
	}

	// 2. Try to match after stripping the protocol.
	let rawUrl = url.replace(/^https?:\/\//, '');
	match = rawUrl.match(pattern);

	if (match) {
		return match;
	}

	// 3. Try to match after stripping the "www" subdomain.
	rawUrl = rawUrl.replace(/^www\./, '');
	match = rawUrl.match(pattern);

	if (match) {
		return match;
	}

	return null;
};

export const getProviderUrl = (url: string, providers: MediaProvider[]): string | undefined => {
	const trimmedUrl = url.trim();

	for (const provider of providers) {
		for (const regex of provider.pattern) {
			const match = getUrlMatches(trimmedUrl, new RegExp(regex));

			if (match) {
				return provider.url.replace('${id}', match[1]);
			}
		}
	}
};
