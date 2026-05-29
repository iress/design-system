import {
  Title,
  Subtitle,
  Description,
  useOf,
  Stories,
} from '@storybook/addon-docs/blocks';
import type { ParametersConfig } from '../types';
import { ComponentAutoDocs } from './autodocs-templates/ComponentAutoDocs';
import { LandingAutoDocs } from './autodocs-templates/LandingAutoDocs';

export interface AutoDocsProps {
  /**
   * Template to use for autodocs generation. 'default' uses the standard Storybook template, while 'component' uses a custom template designed for component documentation with enhanced prop tables and sections for guidelines and testing information.
   * Can be overridden on a per-story basis using the `idsConfig` parameter.
   * Used by the components package to provide a richer documentation experience.
   */
  template?: 'default' | 'component' | 'landing';
}

export const AutoDocs = ({
  template: defaultTemplate = 'default',
}: AutoDocsProps) => {
  const resolvedMeta = useOf<'meta'>('meta');

  const config = resolvedMeta.preparedMeta.parameters
    ?.idsConfig as ParametersConfig['idsConfig'];
  const template = config?.autodocsTemplate ?? defaultTemplate;

  if (template === 'component') {
    return <ComponentAutoDocs />;
  }

  if (template === 'landing') {
    return <LandingAutoDocs />;
  }

  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      <Stories title="" />
    </>
  );
};
