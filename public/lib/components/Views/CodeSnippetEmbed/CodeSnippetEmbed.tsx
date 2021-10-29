import React, { FC } from 'react';

import { ViewFieldProps } from '../../../services/viewRegistry/viewRegistry.types';

const CodeSnippetEmbedView: FC<ViewFieldProps> = ({ value }) => {
	if (!value || typeof value?.url !== 'string') {
		return null;
	}

	return (
		<iframe
			style={{
				width: value.width || '100%',
				height: value.height || 300,
			}}
			src={value.url}
			frameBorder="0"
		/>
	);
};

export default CodeSnippetEmbedView;
