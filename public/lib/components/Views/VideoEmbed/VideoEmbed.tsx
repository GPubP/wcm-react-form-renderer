import React, { FC, useMemo } from 'react';

import { ViewFieldProps } from '../../../services/viewRegistry/viewRegistry.types';
import { getProviderUrl } from '../../Fields/VideoEmbed/VideoEmbed.helpers';
import { VideoIFrame } from '../../VideoIFrame';

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

	return <VideoIFrame src={iframeUrl} />;
};

export default VideoEmbedView;
