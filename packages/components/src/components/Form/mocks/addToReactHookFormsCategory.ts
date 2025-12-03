import { addToStorybookCategory } from '@iress-oss/ids-storybook-config';
import { type IressFormProps } from '../Form.types';
import { type FieldValues } from 'react-hook-form';

export const addToReactHookFormsCategory = () =>
  addToStorybookCategory<IressFormProps<FieldValues>>('React Hook Forms', [
    'context',
    'criteriaMode',
    'defaultValues',
    'delayError',
    'mode',
    'progressive',
    'resetOptions',
    'resolver',
    'reValidateMode',
    'shouldFocusError',
    'shouldUseNativeValidation',
    'shouldUnregister',
    'values',
  ]);
