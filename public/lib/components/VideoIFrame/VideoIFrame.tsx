import classnames from 'classnames/bind';
import React from 'react';

import styles from './VideoIFrame.module.scss';
import { VideoIFrameProps } from './VideoIFrame.types';

const cx = classnames.bind(styles);

const VideoIFrame: React.FC<VideoIFrameProps> = ({ className, src }) => {
	return (
		<div className={cx(className, 'a-video-iframe')}>
			{src && <iframe className={cx('a-video-iframe__element')} src={src} frameBorder="0" />}
		</div>
	);
};

export default VideoIFrame;
