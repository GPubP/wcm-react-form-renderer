import { pathOr } from 'ramda';
import React, { FC, useMemo } from 'react';

import { ViewFieldProps } from '../../../services/viewRegistry/viewRegistry.types';
import { getProviderUrl } from '../../Fields/MediaEmbed/MediaEmbed.helpers';
import { MediaIFrame } from '../../MediaIFrame';

const MediaEmbedView: FC<ViewFieldProps> = ({ fieldSchema, value }) => {
	const providers = useMemo(() => {
		return pathOr([], ['config', 'fieldType', 'data', 'config', 'providers'], fieldSchema);
	}, [fieldSchema]);

	const iframeUrl = useMemo(() => {
		if (!value || typeof value !== 'string') {
			return null;
		}
		return getProviderUrl(value, providers);
	}, [providers, value]);

	if (!iframeUrl) {
		return null;
	}

	return <MediaIFrame src={iframeUrl} />;
};

export default MediaEmbedView;
