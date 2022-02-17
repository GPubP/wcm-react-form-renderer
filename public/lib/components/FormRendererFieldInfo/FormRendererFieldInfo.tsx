import React, { FC, useState } from 'react';

import { FormRendererFieldInfoProps } from './FormRendererFieldInfo.types';

export const FormRendererFieldInfo: FC<FormRendererFieldInfoProps> = ({ content }) => {
	const [visible, setVisibility] = useState(true);

	return visible ? (
		<div role="alertdialog" aria-labelledby="alert" className="m-alert u-margin-top-xs">
			<button
				className="a-button-transparent has-icon m-alert__close"
				aria-label="Close"
				onClick={() => setVisibility(false)}
			>
				<span className="fa fa-close" aria-hidden="true" />
			</button>
			<div dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	) : null;
};
