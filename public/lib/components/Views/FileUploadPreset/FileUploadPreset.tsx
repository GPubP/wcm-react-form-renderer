import Core from '@redactie/redactie-core';
import classNames from 'classnames/bind';
import React, { FC } from 'react';

import { ViewFieldProps } from '../../../services/viewRegistry/viewRegistry.types';

import styles from './FileUploadPreset.module.scss';

const cx = classNames.bind(styles);

const FileUploadPresetView: FC<ViewFieldProps> = ({ value }) => {
	if (!value) {
		return null;
	}

	const { title, file = {}, description } = value;
	const coreConfig = Core.config.getValue('core') ?? {};

	return (
		<div className={cx('file-upload-view')}>
			<div className={cx('file-upload-view__thumbnail')}>
				<span className="fa fa-file"></span>
			</div>
			<div className={cx('file-upload-view__body')}>
				<div className="u-margin-bottom-xs">
					{title && <h6 className={cx('file-upload-view__body__title')}>{title}</h6>}
					{file.name && <small>{file.name}</small>}
				</div>
				{description && <p>{description}</p>}
			</div>
			<div className={cx('file-upload-view__action')}>
				<a
					href={`/v1/proxy/admin/assets/v1/assets/${file.uuid}/file?x-tenant-id=${coreConfig.tenantId}`}
					target="_blank"
					rel="noopener noreferrer"
					className="m-upload__delete a-button a-button--small has-icon-left"
				>
					<span className="fa fa-eye" aria-label="download" />
					Bekijk
				</a>
			</div>
		</div>
	);
};

export default FileUploadPresetView;
