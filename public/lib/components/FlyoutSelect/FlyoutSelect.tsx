import { Button, ButtonGroup, Flyout } from '@acpaas-ui/react-components';
import React from 'react';

import { FieldSchema } from '../../core.types';

import { FlyoutSelectProps } from './FlyoutSelect.types';

const FlyoutSelect: React.FC<FlyoutSelectProps> = ({ onSelect, items }) => {
	return (
		<Flyout
			trigger={
				<Button htmlType="button" size="small" iconRight="angle-down">
					Voeg een item toe
				</Button>
			}
		>
			<ButtonGroup direction="vertical">
				{items.map((item: FieldSchema, index: number) => (
					<Button htmlType="button" key={index} onClick={() => onSelect(item)} outline>
						{item.name}
					</Button>
				))}
			</ButtonGroup>
		</Flyout>
	);
};

export default FlyoutSelect;
