import { Button, Flyout } from '@acpaas-ui/react-components';
import React, { useRef } from 'react';

import { FieldSchema } from '../../core.types';

import { FlyoutSelectProps } from './FlyoutSelect.types';

const FlyoutSelect: React.FC<FlyoutSelectProps> = ({ label, onSelect, items }) => {
	const flyoutRef = useRef<any>();

	const handleSelect = (item: FieldSchema): void => {
		if (flyoutRef.current.closeFlyout) {
			flyoutRef.current.closeFlyout();
		}

		onSelect(item);
	};

	return (
		<Flyout
			ref={flyoutRef}
			trigger={
				<Button htmlType="button" size="small" iconRight="angle-down">
					Voeg {label} toe
				</Button>
			}
		>
			<ul className="m-selectable-list">
				{items.map((item: FieldSchema, index: number) => (
					<li
						key={`${index}-${item.name}`}
						onClick={() => handleSelect(item)}
						className="m-selectable-list__item u-clickable"
					>
						{item.label}
					</li>
				))}
			</ul>
		</Flyout>
	);
};

export default FlyoutSelect;
