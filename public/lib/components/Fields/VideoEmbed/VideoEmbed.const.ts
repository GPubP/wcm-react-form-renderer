export const VIDEO_EMBED_PROVIDERS = [
	{
		name: 'youtube',
		pattern: [
			/^(?:m\.)?youtube\.com\/watch\?v=([\w-]+)/,
			/^(?:m\.)?youtube\.com\/v\/([\w-]+)/,
			/^youtube\.com\/embed\/([\w-]+)/,
			/^youtu\.be\/([\w-]+)/,
		],
		url: (id: string) => `https://www.youtube.com/embed/${id}`,
	},
	{
		name: 'vimeo',
		pattern: [
			/^vimeo\.com\/(\d+)/,
			/^vimeo\.com\/[^/]+\/[^/]+\/video\/(\d+)/,
			/^vimeo\.com\/album\/[^/]+\/video\/(\d+)/,
			/^vimeo\.com\/channels\/[^/]+\/(\d+)/,
			/^vimeo\.com\/groups\/[^/]+\/videos\/(\d+)/,
			/^vimeo\.com\/ondemand\/[^/]+\/(\d+)/,
			/^player\.vimeo\.com\/video\/(\d+)/,
		],
		url: (id: string) => `https://player.vimeo.com/video/${id}`,
	},
];
