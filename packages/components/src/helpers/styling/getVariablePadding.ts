/**
 * Returns the nearest variable padding value based on "mobile-first" breakpoint.

 * Example usage:
 * padding = {
 *   xs: { b: 'sm', t: 'lg', r: 'sm', l: 'lg' },
 *   xl: { b: 'none', t: 'sm', r: 'lg', l: 'sm' },
 * };

 * console.log(getVariablePaddingValue(padding, 'md', 't')); // it returns "t" value under "xs" breakpoint: "lg"
 * console.log(getVariablePaddingValue(padding, 'xl', 't')); // it returns "t" value under "xl" breakpoint: "sm"
 */

import { type MixedPaddingSize, type PaddingSizes } from '@/types';
import { type VariablePaddingSize, type ResponsiveSizing } from '@/interfaces';
import { type SpacingToken } from '@/styled-system/tokens';
import { type PaddingSize } from '@/enums';

export type PanelPadding =
  | PaddingSize
  | PaddingSizes
  | VariablePaddingSize
  | ResponsiveSizing<MixedPaddingSize>
  | SpacingToken;

const BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

export const getVariablePaddingValue = (
  padding: PanelPadding,
  breakpoint: string,
  key?: keyof VariablePaddingSize,
): SpacingToken | undefined => {
  if (typeof padding === 'string') {
    return padding;
  }

  if (!isNotNullObject(padding)) {
    return undefined;
  }

  const currentBreakpointIndex = getCurrentBreakpointIndex(breakpoint);
  if (currentBreakpointIndex === -1) {
    return undefined;
  }

  if (!isResponsiveObject(padding)) {
    return handleNonResponsiveObject(padding, key);
  }

  const closestValue = findClosestValue(padding, currentBreakpointIndex);
  if (closestValue === undefined) {
    return undefined;
  }

  return handleClosestValue(closestValue, key);
};

const getCurrentBreakpointIndex = (breakpoint: string): number => {
  return BREAKPOINTS.indexOf(breakpoint as (typeof BREAKPOINTS)[number]);
};

const isResponsiveObject = (padding: PanelPadding): boolean => {
  return BREAKPOINTS.some((bp) => isNotNullObject(padding) && bp in padding);
};

const isNotNullObject = (padding: PanelPadding): padding is object => {
  return typeof padding === 'object' && padding != null;
};

const handleNonResponsiveObject = (
  padding: PanelPadding,
  key?: keyof VariablePaddingSize,
): SpacingToken | undefined => {
  if (key && isNotNullObject(padding) && key in padding) {
    const typedPadding = padding as VariablePaddingSize;

    const value = typedPadding[key] ?? undefined;

    return value as SpacingToken | undefined;
  }
  return padding as SpacingToken | undefined;
};

const findClosestValue = (
  padding: PanelPadding,
  currentBreakpointIndex: number,
): MixedPaddingSize | undefined => {
  let closestValue: MixedPaddingSize | undefined = undefined;
  for (let i = 0; i <= currentBreakpointIndex; i++) {
    const bp = BREAKPOINTS[i];
    if (isNotNullObject(padding) && bp in padding) {
      const value = (padding as ResponsiveSizing<MixedPaddingSize>)[bp];
      if (value !== null) {
        closestValue = value;
      }
    }
  }
  return closestValue;
};

const handleClosestValue = (
  closestValue: MixedPaddingSize,
  key?: keyof VariablePaddingSize,
): SpacingToken | undefined => {
  if (typeof closestValue === 'string') {
    return closestValue as SpacingToken;
  }

  if (isNotNullObject(closestValue)) {
    if (key === undefined) {
      return undefined;
    }
    if (key in closestValue) {
      const value = closestValue[key];
      return typeof value === 'string' ? (value as SpacingToken) : undefined;
    }
  }

  return undefined;
};
