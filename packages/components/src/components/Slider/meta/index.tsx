import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the slider',
    testId: 'slider',
  },
  {
    part: 'slider',
    description: 'The range input element',
    query: <code>getByRole('slider')</code>,
    testId: 'slider__slider',
  },
  {
    part: 'datalist',
    description: 'The tick marks datalist',
    testId: 'slider__datalist',
  },
  {
    part: 'option',
    description: 'An individual tick mark option',
    testId: 'slider__datalist__option',
  },
];

export default {
  heading: 'Slider',
  description: 'Allows users to select a value from a range by dragging a handle.',
  tags: ['form', 'data-entry', 'range'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressSlider } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Slider',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/slider.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Slider/Slider.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=slider&title=[Slider]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=slider,enhancement&title=[Slider]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-slider--docs',
} satisfies ComponentMeta;
