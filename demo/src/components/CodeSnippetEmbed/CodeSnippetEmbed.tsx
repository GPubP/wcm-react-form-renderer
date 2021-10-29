import React, { FC } from 'react';

import { ViewFieldProps } from '@redactie/form-renderer-module';

const CodeSnippetEmbedView: FC<ViewFieldProps> = ({ value }) => {
	if (!value || !value.url || typeof value.url !== 'string') {
		return null;
	}

	return (
		<iframe
			title="Titel van iframe"
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
