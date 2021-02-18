import { FieldHelperProps } from 'formik';
import { useEffect } from 'react';

const useSelectFirstOptionWhenHidden = (
	config: Record<string, any>,
	value: string,
	fieldHelperProps: FieldHelperProps<any>
): boolean => {
	const showField = !(
		config.hideWhenOnlyOneAllowedOption &&
		Array.isArray(config.allowedOptions) &&
		config.allowedOptions.length <= 1
	);

	useEffect(() => {
		// Automatically select the first allowed option when the select field is hidden from the user
		if (!showField && value !== config.allowedOptions[0]) {
			fieldHelperProps.setValue(config.allowedOptions[0]);
		}
	}, [config, config.allowedOptions, value, fieldHelperProps, showField]);

	return showField;
};

export default useSelectFirstOptionWhenHidden;
