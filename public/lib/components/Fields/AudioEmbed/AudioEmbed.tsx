import { TextField } from '@acpaas-ui/react-components';
import classnames from 'classnames/bind';
import { pick } from 'ramda';
import React, { FC, useMemo } from 'react';

import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';
import { MediaIFrame } from '../../MediaIFrame';
import { DEFAULT_FIELD_CONFIG_PROPS } from '../Fields.const';

import { getProviderUrl } from './AudioEmbed.helpers';
import styles from './AudioEmbed.module.scss';

const cx = classnames.bind(styles);

const AudioEmbed: FC<InputFieldProps> = ({ fieldSchema, fieldProps }) => {
	const { config = {}, name, label } = fieldSchema;
	const { field, meta } = fieldProps;

	const state = !!meta.error && !!meta.touched ? 'error' : '';

	/**
	 * Hooks
	 */

	const iframeSrc = useMemo(() => {
		if (!field.value || typeof field.value !== 'string') {
			return null;
		}

		return getProviderUrl(field.value);
	}, [field.value]);
	// Pick only the known properties from the config object
	const fieldConfigProps = useMemo(() => pick(DEFAULT_FIELD_CONFIG_PROPS, config), [config]);

	/**
	 * Render
	 */

	return (
		<div className={cx('m-audio-embed')}>
			<div className="a-input">
				<TextField id={name} state={state} label={label} {...field} {...fieldConfigProps} />
				<ErrorMessage name={field.name} />
			</div>
			{/* Only show iframe when the field value is valid */}
			{iframeSrc && <MediaIFrame className="u-margin-top" src={iframeSrc} />}
		</div>
	);
};

export default AudioEmbed;
