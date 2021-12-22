import React, { FC, useMemo } from 'react';

import { ViewFieldProps } from '../../../services/viewRegistry/viewRegistry.types';
import { getProviderUrl } from '../../Fields/AudioEmbed/AudioEmbed.helpers';
import { MediaIFrame } from '../../MediaIFrame';

const AudioEmbedView: FC<ViewFieldProps> = ({ value }) => {
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

export default AudioEmbedView;
