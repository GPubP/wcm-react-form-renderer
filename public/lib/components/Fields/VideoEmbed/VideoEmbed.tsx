import { TextField } from '@acpaas-ui/react-components';
import classnames from 'classnames/bind';
import { pick } from 'ramda';
import React, { ChangeEvent, FC, useMemo, useState } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';
import { VideoIFrame } from '../../VideoIFrame';
import { DEFAULT_FIELD_CONFIG_PROPS } from '../Fields.const';

import { VIDEO_EMBED_PROVIDERS } from './VideoEmbed.const';
import styles from './VideoEmbed.module.scss';

const cx = classnames.bind(styles);

const VideoEmbed: FC<InputFieldProps> = ({ fieldSchema, fieldProps, fieldHelperProps }) => {
	const { config = {}, name, label } = fieldSchema;
	const { field, meta } = fieldProps;
	const { setValue } = fieldHelperProps;

	const state = !!meta.error && !!meta.touched ? 'error' : '';

	/**
	 * Hooks
	 */

	const [iframeSrc, setIframeSrc] = useState<string>('');
	// Pick only the known properties from the config object
	const fieldConfigProps = useMemo(() => pick(DEFAULT_FIELD_CONFIG_PROPS, config), [config]);

	/**
	 * Methods
	 */

	const getUrlMatches = (url: string, pattern: RegExp): string[] | null => {
		// 1. Try to match without stripping the protocol and "www" subdomain.
		let match = url.match(pattern);

		if (match) {
			return match;
		}

		// 2. Try to match after stripping the protocol.
		let rawUrl = url.replace(/^https?:\/\//, '');
		match = rawUrl.match(pattern);

		if (match) {
			return match;
		}

		// 3. Try to match after stripping the "www" subdomain.
		rawUrl = rawUrl.replace(/^www\./, '');
		match = rawUrl.match(pattern);

		if (match) {
			return match;
		}

		return null;
	};

	const getProviderUrl = (url: string): string | undefined => {
		const trimmedUrl = url.trim();

		for (const provider of VIDEO_EMBED_PROVIDERS) {
			for (const regex of provider.pattern) {
				const match = getUrlMatches(trimmedUrl, regex);

				if (match) {
					return provider.url(match[1]);
				}
			}
		}
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
		if (!e.target.value) {
			// Clear iframe src when the input gets manually cleared
			if (iframeSrc) {
				setIframeSrc('');
			}
			setValue('');
			return;
		}

		const providerUrl = getProviderUrl(e.target.value);

		if (providerUrl) {
			setIframeSrc(providerUrl);
		} else {
			setIframeSrc('');
		}

		setValue(e.target.value);
	};

	/**
	 * Render
	 */

	return (
		<div className={cx('m-video-embed')}>
			<div className="a-input">
				<TextField
					addonleft="https://"
					id={name}
					state={state}
					label={label}
					{...field}
					{...fieldConfigProps}
					onChange={onChange}
				/>
				<ErrorMessage name={field.name} />
			</div>
			{/* Only show iframe when the field value is valid */}
			{iframeSrc && <VideoIFrame className="u-margin-top" src={iframeSrc} />}
		</div>
	);
};

export default VideoEmbed;
