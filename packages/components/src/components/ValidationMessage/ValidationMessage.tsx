import {
  type IressValidationMessageProps,
  type ValidationMessageWithEnums,
} from './ValidationMessage.types';
import { SystemValidationStatus } from '@/enums';
import { ValidationBase } from './ValidationBase/ValidationBase';

export const IressValidationMessage: ValidationMessageWithEnums = (
  props: IressValidationMessageProps,
) => <ValidationBase {...props} as="div" />;

/** @deprecated IressValidationMessage.Status enum is now deprecated and will be removed in a future version. Please use the SystemValidationStatuses type instead. **/
IressValidationMessage.Status = SystemValidationStatus;
