import classnames from 'classnames/bind';
import React from 'react';

import styles from './MediaIFrame.module.scss';
import { MediaIFrameProps } from './MediaIFrame.types';

const cx = classnames.bind(styles);

const MediaIFrame: React.FC<MediaIFrameProps> = ({ className, src }) => {
	return src ? (
		<div className={cx(className, 'a-media-iframe')}>
			<iframe className={cx('a-media-iframe__element')} src={src} frameBorder="0" />
		</div>
	) : null;
};

export default MediaIFrame;
