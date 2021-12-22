export const AUDIO_EMBED_PROVIDERS = [
	{
		name: 'soundcloud',
		pattern: [/^soundcloud\.com\/(.*)\/(.*)/],
		url: (id: string) => `https://w.soundcloud.com/player/?url=${id}?visual=true`,
	},
];
