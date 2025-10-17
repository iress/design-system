import type { Addon_DecoratorFunction } from 'storybook/internal/types';
import { withOKTA } from './decorators/withOKTA';
import { addons } from 'storybook/internal/preview-api';
import { ADDON_ID, ADDON_OPTIONS } from './constants';

const channel = addons.getChannel();
channel.emit(ADDON_OPTIONS, process.env[ADDON_ID]);

export const decorators: Addon_DecoratorFunction<JSX.Element>[] = [withOKTA];
