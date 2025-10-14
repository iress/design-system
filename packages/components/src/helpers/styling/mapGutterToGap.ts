import { IressCSSProps, ResponsiveSizing } from '@/interfaces';
import { PaddingSizes } from '@/types';

const size = {
  none: 'spacing.000',
  xs: 'spacing.100',
  sm: 'spacing.200',
  md: 'spacing.400',
  lg: 'spacing.700',
  xl: 'spacing.1200',
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
  return 'spacing.000';
};
