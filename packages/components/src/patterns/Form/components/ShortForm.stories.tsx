import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type FC } from 'react';
import { formArgs, formArgTypes } from '../mocks/storybookFormHelpers';
import { ShortForm } from './ShortForm';
import { IressButton, IressText } from '@/main';

// This is a pattern for IressForm, hence we change the name
(ShortForm as FC).displayName = 'IressForm';

type Story = StoryObj<typeof ShortForm>;

export default {
  title: 'Patterns/Form/Patterns/Short',
  component: ShortForm,
  tags: ['beta: '],
  args: {
    ...formArgs,
    children: formArgTypes.children.mapping.simple,
  },
  argTypes: {
    ...formArgTypes,
  },
} as Meta<typeof ShortForm>;

export const Short: Story = {
  args: {
    actions: (
      <IressButton type="submit" mode="primary">
        Submit
      </IressButton>
    ),
    heading: (
      <IressText>
        <h2>Short Form</h2>
        <p>
          The short form pattern uses <code>onSubmit</code> validation before
          the user has submitted the first time, and then afterwards uses{' '}
          <code>onChange</code> validation.
        </p>
      </IressText>
    ),
    pattern: 'short',
  },
};
