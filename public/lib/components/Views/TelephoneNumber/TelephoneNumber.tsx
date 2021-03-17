import { Icon, Link } from '@acpaas-ui/react-components';
import React, { FC } from 'react';

import { ViewFieldProps } from '../../../services/viewRegistry/viewRegistry.types';

const TelephoneNumberView: FC<ViewFieldProps> = ({ value, fieldSchema }) => {
	if (!value || typeof value?.number !== 'string') {
		return null;
	}

	const number = `${value.areaCode || ''}${value.number}`;

	return (
		<>
			<Icon className="a-icon-sm u-margin-right-xs" name="phone" />
			<Link
				id={`${fieldSchema?.name}-${value.number}`}
				title={`${fieldSchema?.name}: ${number}`}
				href={`tel:${number}`}
				target="_blank"
			>
				{number}
			</Link>
		</>
	);
};

export default TelephoneNumberView;
