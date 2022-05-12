import {
	FileUpload as EditorialFileUpload,
	FileUploadDescription,
	FileUploadMessage,
} from '@acpaas-ui/react-editorial-components';
import Core from '@redactie/redactie-core';
import { useSiteContext } from '@redactie/utils';
import classNames from 'classnames';
import { FieldHelperProps } from 'formik';
import React, { useEffect, useState } from 'react';

import { parseAllowedFileTypes } from '../../../helpers';
import { InputFieldProps } from '../../../services/fieldRegistry';
import { ErrorMessage } from '../../ErrorMessage';
import { FormRendererFieldTitle } from '../../FormRendererFieldTitle';

import { File, FileUploadData, FileUploadResponse } from './FileUpload.types';

const FileUpload: React.FC<InputFieldProps> = ({ fieldProps, fieldSchema, fieldHelperProps }) => {
	const { name, label, config = {} } = fieldSchema;
	const { field } = fieldProps;
	const coreConfig = Core.config.getValue('core') ?? {};
	const { siteId } = useSiteContext();

	const allowedFileTypes = parseAllowedFileTypes(config.allowedFileTypes);
	const uploadFieldOptions = {
		allowedMimeTypes: config.allowedMimeTypes ?? [],
		allowedFileTypes: allowedFileTypes ?? [],
		maxFileSize: config.maxFileSize ?? 0,
		url:
			config.url ?? siteId
				? `/v1/proxy/admin/assets/v1/sites/${siteId}/files`
				: `/v1/proxy/admin/assets/v1/files`,
		requestHeader: {
			key: 'x-tenant-id',
			value: coreConfig.tenantId,
		},
		fileLimit: 1,
		messages: config.messages ?? {
			INVALID_FILE_SIZE: 'Ongeldige bestandsgrootte',
			INVALID_FILE_TYPE: `Ongeldig bestandstype, volgende types zijn toegestaan: ${config.allowedFileTypes}`,
			INVALID_MIME_TYPE: 'Ongeldig mime type',
		},
	};

	const fieldClass = classNames('a-input', {
		'is-required': config.required,
	});

	const handleUploadedFiles = (file: FileUploadResponse): void => {
		(fieldHelperProps as FieldHelperProps<FileUploadData>).setValue({
			uuid: file?.uuid,
			name: file?.data?.file?.name,
			mime: file?.data?.file?.type?.mime,
		});
	};

	const formatFiles = (file: FileUploadData): File[] => {
		if (!file) {
			return [];
		}

		return [
			{
				name: file.name,
				id: file.uuid,
			},
		];
	};

	/**
	 * Hooks
	 */
	const [files, setFiles] = useState<File[]>([]);

	useEffect(() => {
		if (field.value) {
			setFiles(formatFiles((field.value as unknown) as FileUploadData));
			return;
		}

		setFiles([]);
	}, [field.value]);

	/**
	 * Render
	 */
	return (
		<div className={fieldClass}>
			{label && (
				<FormRendererFieldTitle
					isRequired={config.required}
					isSynced={config.synced}
					className="u-margin-bottom-xs"
				>
					{label}
				</FormRendererFieldTitle>
			)}
			<EditorialFileUpload
				disabled={config.disabled}
				id={name}
				options={uploadFieldOptions}
				files={files}
				selectUploadedFiles={handleUploadedFiles}
				removeFile={() => fieldHelperProps.setValue(null)}
			>
				<FileUploadMessage>Selecteer of sleep een bestand</FileUploadMessage>
				{config.description && (
					<FileUploadDescription>{config.description}</FileUploadDescription>
				)}
			</EditorialFileUpload>
			<ErrorMessage name={field.name} />
		</div>
	);
};

export default FileUpload;
