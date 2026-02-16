import { cva } from '@/styled-system/css';

export const progress = cva({
  base: {
    // Performance: CSS containment limits style recalculation scope
    contain: 'layout style paint',
    appearance: 'none',
    bg: 'colour.neutral.40',
    color: 'colour.primary.fill',
    display: 'block',
    height: 'progress.height',
    width: '[100%]',
    borderRadius: 'var(--iress-border-radius)',
    '--iress-border-radius': '{radii.radius.system.form}',
    overflow: 'hidden',

    _progressBar: {
      bg: 'transparent',
      height: 'progress.height',
      margin: 'spacing.0',
    },

    _progressValue: {
      appearance: 'none',
      bg: '[currentColor]',
      backgroundImage: 'var(--iress-background-image)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: 'var(--iress-border-radius)',
      margin: 'spacing.0',
      transition: 'all',
    },

    _mozProgressValue: {
      appearance: 'none',
      bg: '[currentColor]',
      backgroundImage: 'var(--iress-background-image)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: 'var(--iress-border-radius)',
      margin: 'spacing.0',
      transition: 'all',
    },
  },
});
