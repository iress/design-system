import { type SourceProps } from '@storybook/addon-docs/blocks';
import { type Meta, type StoryObj } from '@storybook/react';
import type reactElementToJSXString from 'react-element-to-jsx-string';

export interface StoryModule {
  __namedExportsOrder: string[];
  default: Meta;
  [story: string]: StoryObj | string[];
}

export interface ParametersConfig {
  docs?: {
    source?: {
      code?: string;
      transform?: SourceProps['transform'];
    };
  };
}

export type ReactElementToJSXStringOptions = Exclude<
  Parameters<typeof reactElementToJSXString>[1],
  undefined
>;
