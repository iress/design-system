import { type IressCSSProps, type ResponsiveSizing } from '@/interfaces';
import { type PaddingSizes } from '@/types';

const size = {
  none: 'spacing.0',
  xs: 'spacing.1',
  sm: 'spacing.2',
  md: 'spacing.4',
  lg: 'spacing.7',
  xl: 'spacing.10',
} as const;

export const mapGutterToGap = (
  gutter?: ResponsiveSizing<PaddingSizes> | PaddingSizes,
): IressCSSProps['p'] => {
  if (typeof gutter === 'string') {
    return size[gutter as keyof typeof size];
  } else if (typeof gutter === 'object') {
    const gapMapping: Record<string, string> = {};
    for (const key in gutter) {
      const value = gutter[key as keyof typeof gutter];
      if (typeof value === 'string' && value in size) {
        gapMapping[key] = size[value as keyof typeof size] as string;
      }
    }
    return gapMapping;
  }
  return 'spacing.0';
};
