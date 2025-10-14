import { addToStorybookCategory } from '@iress-storybook/helpers';
import { IressFormProps } from '../Form.types';
import { FieldValues } from 'react-hook-form';

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
