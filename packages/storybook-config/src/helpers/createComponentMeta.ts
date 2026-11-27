import { stylingProps } from './stylingProps';
import type { ComponentMeta } from '../components/ComponentMeta';

interface ComponentStoryMetaOptions {
  /** Additional argTypes (merged before stylingProps). */
  argTypes?: Record<string, unknown>;
  /** Additional idsConfig entries (e.g. tabDescriptions). */
  idsConfig?: Record<string, unknown>;
  /** Additional parameters (merged alongside docs/idsConfig). */
  parameters?: Record<string, unknown>;
}

/**
 * Generates the standard `argTypes` and `parameters` for a component story meta.
 * Spread the result into your default export object.
 *
 * @example
 * ```tsx
 * import { componentStoryMeta, reactNodeArgType } from '@iress-oss/ids-storybook-config';
 * import componentMeta from './meta';
 *
 * export default {
 *   title: 'Components/Button',
 *   component: IressButton,
 *   ...componentStoryMeta(componentMeta, {
 *     argTypes: { children: reactNodeArgType },
 *   }),
 * } as Meta<typeof IressButton>;
 *
 * // With extra idsConfig (e.g. tabDescriptions):
 * export default {
 *   title: 'Components/Card',
 *   component: IressCard,
 *   ...componentStoryMeta(componentMeta, {
 *     idsConfig: { tabDescriptions: { slots: '...' } },
 *   }),
 * } as Meta<typeof IressCard>;
 * ```
 */
export function componentStoryMeta(
  meta: ComponentMeta,
  options?: ComponentStoryMetaOptions,
) {
  return {
    argTypes: {
      ...options?.argTypes,
      ...stylingProps,
    },
    parameters: {
      ...options?.parameters,
      idsConfig: {
        testMeta: meta.testMeta,
        ...options?.idsConfig,
      },
      docs: {
        description: {
          component: meta.description,
        },
      },
    },
  };
}
