import { type ResponsiveSizing, type VariablePaddingSize } from '@/interfaces';

export const getResponsivePaddingClasses = <T = string>(
  padding: ResponsiveSizing<T> | T,
) => {
  const modifier = 'iress-p';

  if (!padding) {
    return [];
  }

  // if padding is applied to all breakpoints
  if (typeof padding === 'string') {
    return [`${modifier}--${padding}`];
  }

  const isVariablePadding = Object.keys(padding).some(
    (key) => key === 'x' || key === 'y' || key === 'b' || key === 'l',
  );

  // if different padding is applied per axis
  if (isVariablePadding) {
    return Object.entries(padding).map(([axis, axisPadding]) => {
      return `${modifier}${axis}--${axisPadding}`;
    });
  }

  // if different padding is applied per breakpoint
  return Object.entries(padding).flatMap(([breakpoint, breakpointPadding]) => {
    // if padding is the same for all axes (flat object)
    if (typeof breakpointPadding === 'string') {
      return `${modifier}-${breakpoint}--${breakpointPadding}`;
    }

    // if padding uses different padding for each axis (nested object)
    return Object.entries(breakpointPadding as VariablePaddingSize).map(
      ([axis, axisPadding]) => {
        return `${modifier}${axis}-${breakpoint}--${axisPadding}`;
      },
    );
  });
};
