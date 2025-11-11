import { type SourceProps } from '@storybook/addon-docs/blocks';
import type reactElementToJSXString from 'react-element-to-jsx-string';

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
