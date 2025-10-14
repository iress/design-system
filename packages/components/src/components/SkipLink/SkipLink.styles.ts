import { cva } from '@/styled-system/css';

export const skipLink = cva({
  base: {
    position: 'absolute',
    top: '[0]',
    left: '[50%]',
    zIndex: '100',
    transform: '[translateX(-50%) translateY(-125%)]',
    marginTop: 'spacing.200',

    _focus: {
      transform: '[translateX(-50%) translateY(0)]',
    },
  },
});
