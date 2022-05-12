import { Icon } from '@acpaas-ui/react-components';
import { Tooltip, TooltipTypeMap } from '@acpaas-ui/react-editorial-components';
import classNames from 'classnames/bind';
import React, { createElement, FC, useRef, useState } from 'react';

import { useFieldRendererContext, useFormContext } from '../../hooks';

import styles from './FormRendererFieldTitle.module.scss';
import { FormRendererFieldTitleProps } from './FormRendererFieldTitle.types';

const cx = classNames.bind(styles);

export const FormRendererFieldTitle: FC<FormRendererFieldTitleProps> = ({
	children,
	isRequired,
	isSynced,
	className: inputClassName,
	...props
}) => {
	const { level, fieldSchema } = useFieldRendererContext();
	const { allowedHeaders } = useFormContext();
	const buttonRef = useRef(null);
	const [isVisible, setVisibility] = useState(false);

	const header =
		level === 0 ||
		['fieldgroup', 'repeater', 'dynamicRepeater'].includes(fieldSchema?.type || '')
			? allowedHeaders.find(h => h.element === 'h2') ??
			  allowedHeaders[allowedHeaders.length - 1]
			: { element: 'label', class: 'a-input__label' };

	const className = cx(
		'a-field-renderer-field__title',
		isRequired ? 'a-field-renderer-field__title--required' : '',
		header.class,
		inputClassName
	);

	return (
		<div className={cx('a-field-renderer-field__title-wrapper')}>
			{createElement(header.element, { ...props, className }, children)}
			{isSynced && (
				<button
					type="button"
					className={cx(
						'a-button',
						'a-button-transparent',
						'a-button--small',
						'has-icon',
						'a-field-renderer-field__title-synced'
					)}
					ref={buttonRef}
					onMouseEnter={() => setVisibility(true)}
					onMouseLeave={() => setVisibility(false)}
				>
					<>
						<Icon name="recycle" />
						{
							// TODO: find out why tooltip throws error in demo
							<Tooltip
								isVisible={isVisible}
								targetRef={buttonRef}
								type={TooltipTypeMap.PRIMARY}
								placement="bottom-end"
							>
								Deze component wordt gesynchroniseerd tussen alle talen. Je kan dus
								geen vertaling ingeven.
							</Tooltip>
						}
					</>
				</button>
			)}
		</div>
	);
};
