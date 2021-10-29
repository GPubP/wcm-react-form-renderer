import React, { FC } from 'react';

import { ViewFieldProps } from '../../../services/viewRegistry/viewRegistry.types';

const CodeSnippetEmbedView: FC<ViewFieldProps> = ({ value }) => {
	if (!value || !value.url?.url || typeof value.url.url !== 'string') {
		return null;
	}

	return (
		<iframe
			style={{
				width: value.width?.text || '100%',
				height: value.height?.text || '300px',
			}}
			src={value.url.url}
			title={value.url.text}
			frameBorder="0"
		/>
	);
};

export default CodeSnippetEmbedView;
