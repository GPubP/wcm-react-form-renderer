import React, { FC } from 'react';

import { ViewFieldProps } from '../../../services/viewRegistry/viewRegistry.types';
import { VideoIFrame } from '../../VideoIFrame';

const VideoEmbedView: FC<ViewFieldProps> = ({ value }) => {
	if (!value || typeof value !== 'string') {
		return null;
	}

	return <VideoIFrame src={value} />;
};

export default VideoEmbedView;
