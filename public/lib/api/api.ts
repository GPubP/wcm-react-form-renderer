/**
 * @module Module API
 */
import { CustomValidator, CustomValidatorWorker } from '../classes';
import { CompareView } from '../components/CompareView';
import { ErrorMessage } from '../components/ErrorMessage';
import { DEFAULT_FIELD_CONFIG_PROPS } from '../components/Fields/Fields.const';
import { Form } from '../components/Form';
import { DEFAULT_ALLOWED_HEADERS } from '../components/Form/Form.const';
import { FormRendererFieldInfo } from '../components/FormRendererFieldInfo';
import { FormRendererFieldTitle } from '../components/FormRendererFieldTitle';
import { View } from '../components/View';
import { FieldRendererContext, FormContext } from '../context';
import { getValueSyncMap, parseFields } from '../helpers';
import { useFieldRendererContext, useFormContext, useSelectFirstOptionWhenHidden } from '../hooks';
import { fieldRegistry } from '../services/fieldRegistry';
import { viewRegistry } from '../services/viewRegistry';
import { filterAllowedOptions } from '../utils';

export {
	Form,
	View,
	CompareView,
	ErrorMessage,
	CustomValidator,
	CustomValidatorWorker,
	fieldRegistry,
	viewRegistry,
	parseFields,
	getValueSyncMap,
	useFieldRendererContext,
	useFormContext,
	FieldRendererContext,
	FormContext,
	FormRendererFieldTitle,
	FormRendererFieldInfo,
	DEFAULT_ALLOWED_HEADERS,
	DEFAULT_FIELD_CONFIG_PROPS,
	useSelectFirstOptionWhenHidden,
	filterAllowedOptions,
};
