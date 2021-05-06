import { FieldHelperProps } from 'formik';
import { useEffect } from 'react';

const useSelectFirstOptionWhenHidden = (
	config: Record<string, any>,
	value: string,
	fieldHelperProps: FieldHelperProps<any>
): boolean => {
	const isVisible =
		typeof config.visible === 'undefined' ||
		(typeof config.visible === 'boolean' && config.visible === true) ||
		(Array.isArray(config.visible) && config.visible.includes(true));
	const noHideWhenOnlyOneOption = !(
		config.hideWhenOnlyOneAllowedOption &&
		Array.isArray(config.allowedOptions) &&
		config.allowedOptions.length <= 1
	);
	const showField = isVisible && noHideWhenOnlyOneOption;

	useEffect(() => {
		// Automatically select the first allowed option when the select field is hidden from the user
		if (
			!showField &&
			Array.isArray(config.allowedOptions) &&
			value !== config.allowedOptions[0]
		) {
			fieldHelperProps.setValue(config.allowedOptions[0]);
		}
	}, [config, config.allowedOptions, value, fieldHelperProps, showField]);

	return showField;
};

export default useSelectFirstOptionWhenHidden;
