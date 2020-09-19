export interface FileUploadData {
	uuid: string;
	mime: string;
	name: string;
	thumbnail?: any;
}

export interface FileUploadResponse {
	uuid: string;
	data: {
		name: string;
		description: string;
		copyright: string;
		category: string;
		file: {
			type: {
				mime: string;
				extension: string;
			};
			size: number;
			reference: string;
			name: string;
		};
		thumbnail: string;
		metaData: Record<string, any>;
	};
	meta: {
		created: string;
		lastUpdated: string;
		lastEditor: string;
		tenant: string;
	};
}

export interface File {
	id: string;
	name: string;
}
