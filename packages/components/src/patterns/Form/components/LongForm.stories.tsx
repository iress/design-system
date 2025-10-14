import { Meta, StoryObj } from '@storybook/react-vite';
import { FC } from 'react';
import {
  formArgs,
  formArgTypes,
  formParameters,
} from '../mocks/storybookFormHelpers';
import { LongForm } from './LongForm';
import { IressText } from '@/main';

// This is a pattern for IressForm, hence we change the name
(LongForm as FC).displayName = 'IressForm';

type Story = StoryObj<typeof LongForm>;

export default {
  title: 'Patterns/Form/Patterns/Long',
  component: LongForm,
  tags: ['beta: '],
  args: {
    ...formArgs,
  },
  argTypes: {
    ...formArgTypes,
  },
  parameters: {
    ...formParameters,
  },
} as Meta<typeof LongForm>;

export const Long: Story = {
  args: {
    actions: formArgTypes.actions.mapping.save,
    footer: (
      <IressText color="colour.neutral.70">
        Additional content in the footer
      </IressText>
    ),
    heading: (
      <IressText>
        <h2>Long Form</h2>
        <p>
          The long form pattern uses <code>onBlur</code> validation before the
          user has submitted the first time, and then afterwards uses{' '}
          <code>onChange</code> validation.
        </p>
      </IressText>
    ),
    pattern: 'long',
  },
};
