import { getInterfaceProps, STYLING_PROPS } from '@/lib/extract-props';
import { defineStory } from '@/lib/story';
import type { TypeNode } from '@fumadocs/story/type-tree';
import { IressAlert } from './alert.client';

/**
 * Dynamically extract prop names from source TypeScript interfaces.
 * Keeps the allowlist in sync with the actual code — no manual
 * maintenance when props are added or removed.
 */
const ALERT_PROPS = getInterfaceProps(
  'components/Alert/Alert.tsx',
  'IressAlertProps',
);

/** Alert-specific props + shared styling props; everything else (div attrs) is hidden. */
const ALLOWED_PROPS = new Set([...ALERT_PROPS, ...STYLING_PROPS]);

export const story = defineStory(import.meta.url, {
  Component: IressAlert,
  args: {
    initial: {
      children: 'This is an alert message.',
      status: 'info',
      heading: 'Alert Heading',
    },
    controls: {
      transform: (node: TypeNode): TypeNode => {
        // If dynamic extraction failed, show all props rather than none
        if (ALLOWED_PROPS.size === 0) return node;

        if (node.type === 'object' && node.properties) {
          return {
            ...node,
            properties: node.properties.filter((prop) =>
              ALLOWED_PROPS.has(prop.name),
            ),
          };
        }
        return node;
      },
    },
  },
});
