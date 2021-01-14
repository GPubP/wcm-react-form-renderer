import classNames from 'classnames/bind';
import { createElement, FC } from 'react';

import { useFieldRenderer } from '../../hooks';
import { useForm } from '../../hooks/useForm';

import styles from './FormRendererFieldTitle.module.scss';
import { FormRendererFieldTitleProps } from './FormRendererFieldTitle.types';

const cx = classNames.bind(styles);

export const FormRendererFieldTitle: FC<FormRendererFieldTitleProps> = ({
	children,
	isRequired,
	className: inputClassName,
	...props
}) => {
	const { level } = useFieldRenderer();
	const { allowedHeaders } = useForm();

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
