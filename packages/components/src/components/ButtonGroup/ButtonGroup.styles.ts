import { sva } from '@/styled-system/css';

export const buttonGroup = sva({
  slots: ['root', 'label', 'values'],
  base: {
    root: {
      display: 'contents',
    },
    label: {
      mb: 'xs',
      textStyle: 'typography.body.md.strong',
    },
    values: {
      bg: 'colour.neutral.20',
      border: 'divider',
      borderRadius: 'radius.system.button',
      display: 'inline-flex',
      flexWrap: 'wrap',
      p: 'xs',
      gap: 'xs',
    },
  },
  variants: {
    compact: {
      true: {
        label: {
          textStyle: 'typography.body.sm.strong',
        },

        // Segmented control: a grey track holding flush segments. Selection is
        // shown via a white "pill" with a subtle border, not a solid fill, so
        // the segment text stays dark blue in both resting and selected states.
        // Matches Figma "Small Segmented Control" (node 221-8316).
        values: {
          bg: 'colour.neutral.30',
          borderWidth: '[0px]',
          borderRadius: 'radius.system.button',
          p: 'none',
          gap: 'none',

          // Target the child IDS buttons that make up the segments.
          '& .ids-button': {
            minWidth: '[unset]',
            minHeight: 'input.height.xs',
            paddingInline: 'spacing.2',
            paddingBlock: 'spacing.0',
            borderWidth: '[1px]',
            borderStyle: 'solid',
            borderColor: 'transparent',
            borderRadius: 'radius.system.button',
            textStyle: 'typography.body.sm.medium',
            color: 'colour.primary.text',
            bg: 'transparent',
            focusable: 'inset',

            // Resting hover (unselected segment).
            _hover: {
              bg: 'colour.primary.surface',
              borderColor: 'colour.neutral.80',
              color: 'colour.neutral.80',
            },

            // Selected segment: white pill with a subtle border, dark-blue text.
            '&[aria-pressed="true"]': {
              bg: 'colour.neutral.10',
              borderColor: 'colour.neutral.40',
              color: 'colour.primary.text',

              _hover: {
                bg: 'colour.neutral.10',
                borderColor: 'colour.neutral.40',
                color: 'colour.primary.text',
              },
            },

            // Disabled and loading segments (the button recipe applies the
            // disabled class to both). Declared last so it wins over the
            // resting, hover and selected rules above.
            '&.button__root--disabled_true': {
              bg: 'colour.neutral.20',
              borderColor: 'transparent',
              color: 'colour.neutral.70',

              _hover: {
                bg: 'colour.neutral.20',
                borderColor: 'transparent',
                color: 'colour.neutral.70',
              },

              '&[aria-pressed="true"]': {
                borderColor: 'colour.neutral.40',

                _hover: {
                  borderColor: 'colour.neutral.40',
                },
              },
            },
          },
        },
      },
    },
    hiddenLabel: {
      true: {
        label: {
          srOnly: true,
        },
      },
    },
  },
});
