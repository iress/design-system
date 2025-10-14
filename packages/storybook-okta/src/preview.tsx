import type { Addon_DecoratorFunction } from 'storybook/internal/types';
import { withOKTA } from './decorators/withOKTA';

export const decorators: Addon_DecoratorFunction<JSX.Element>[] = [withOKTA];
