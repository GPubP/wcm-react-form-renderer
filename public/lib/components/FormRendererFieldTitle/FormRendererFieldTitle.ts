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
	const { level } = useFieldRendererContext();
	const { allowedHeaders } = useFormContext();

	const controlledLevel = level >= allowedHeaders.length ? allowedHeaders.length - 1 : level;

	const className = cx(
		'a-field-renderer-field__title',
		isRequired ? 'a-field-renderer-field__title--required' : '',
		allowedHeaders[controlledLevel].class,
		inputClassName
	);

	return createElement(
		allowedHeaders[controlledLevel].element,
		{ ...props, className },
		children
	);
};
