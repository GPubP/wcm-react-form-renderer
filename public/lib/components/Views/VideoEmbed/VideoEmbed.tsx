import React, { FC, useMemo } from 'react';

import { ViewFieldProps } from '../../../services/viewRegistry/viewRegistry.types';
import { getProviderUrl } from '../../Fields/VideoEmbed/VideoEmbed.helpers';
import { MediaIFrame } from '../../MediaIFrame';

const VideoEmbedView: FC<ViewFieldProps> = ({ value }) => {
	const iframeUrl = useMemo(() => {
		if (!value || typeof value !== 'string') {
			return null;
		}
		return getProviderUrl(value);
	}, [value]);

	if (!iframeUrl) {
		return null;
	}

	return <MediaIFrame src={iframeUrl} />;
};

export default VideoEmbedView;
