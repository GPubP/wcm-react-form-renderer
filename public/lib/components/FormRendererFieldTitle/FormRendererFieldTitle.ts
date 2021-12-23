import classNames from 'classnames/bind';
import { createElement, FC } from 'react';

import { useFieldRendererContext, useFormContext } from '../../hooks';

import styles from './FormRendererFieldTitle.module.scss';
import { FormRendererFieldTitleProps } from './FormRendererFieldTitle.types';

const cx = classNames.bind(styles);

export const FormRendererFieldTitle: FC<FormRendererFieldTitleProps> = ({
	children,
	isRequired,
	className: inputClassName,
	...props
}) => {
	const { level, fieldSchema } = useFieldRendererContext();
	const { allowedHeaders } = useFormContext();

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

	return createElement(header.element, { ...props, className }, children);
};
