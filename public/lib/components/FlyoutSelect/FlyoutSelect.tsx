import { Button, Flyout } from '@acpaas-ui/react-components';
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
			<ul className="m-selectable-list">
				{items.map((item: FieldSchema, index: number) => (
					<li
						key={index}
						onClick={() => onSelect(item)}
						className="m-selectable-list__item"
					>
						{item.label}
					</li>
				))}
			</ul>
		</Flyout>
	);
};

export default FlyoutSelect;
