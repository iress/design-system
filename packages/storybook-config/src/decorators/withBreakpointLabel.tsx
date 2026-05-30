import type { Decorator } from '@storybook/react-vite';
import {
  CurrentBreakpoint,
  type CurrentBreakpointProps,
} from '../components/CurrentBreakpoint';
import { IressPanel, IressStack } from '@iress-oss/ids-components';

/**
 * Decorator that displays the current breakpoint above the story.
 * Excluded from generated source code by default.
 *
 * @example
 * decorators: [withBreakpointLabel()]
 * decorators: [withBreakpointLabel('and-above')]
 * decorators: [withBreakpointLabel('container')]
 */
export const withBreakpointLabel =
  (renderLabel?: CurrentBreakpointProps['renderLabel']): Decorator =>
  (Story) => (
    <>
      <IressStack gap="sm">
        <IressPanel>
          <CurrentBreakpoint renderLabel={renderLabel} />
        </IressPanel>
        <Story />
      </IressStack>
    </>
  );
