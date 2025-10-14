import { cva } from '@/styled-system/css';

export const progress = cva({
  base: {
    appearance: 'none',
    bg: 'colour.neutral.40',
    color: 'colour.neutral.50',
    display: 'block',
    height: 'progress.height',
    width: '[100%]',
    borderRadius: 'var(--iress-border-radius)',
    '--iress-border-radius': '{radii.radius.system.form}',
    overflow: 'hidden',

    _progressBar: {
      bg: 'transparent',
      height: 'progress.height',
      margin: 'spacing.000',
    },

    _progressValue: {
      appearance: 'none',
      bg: '[currentColor]',
      borderRadius: 'var(--iress-border-radius)',
      margin: 'spacing.000',
      transition: 'all',
    },

    _mozProgressValue: {
      appearance: 'none',
      bg: '[currentColor]',
      borderRadius: 'var(--iress-border-radius)',
      margin: 'spacing.000',
      transition: 'all',
    },
  },
});
