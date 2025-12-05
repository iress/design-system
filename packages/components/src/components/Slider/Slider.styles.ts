import { sva } from '@/styled-system/css';

export const slider = sva({
  slots: [
    'root',
    'thumbValue',
    'control',
    'tickMarkList',
    'tickMark',
    'tickMarkLabel',
  ],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    control: {
      appearance: 'none',
      background: 'transparent',
      cursor: 'pointer',
      borderRadius: 'radius.100',
      height: 'slider.thumb',
      margin: 'spacing.0',
      width: '[100%]',
      _focus: {
        outline: '[none]',
      },
      _focusVisibleWebkitSliderThumb: {
        layerStyle: 'elevation.focus',
      },
      _focusVisibleMozRangeThumb: {
        layerStyle: 'elevation.focus',
      },
      _webkitSliderThumb: {
        appearance: 'none',
        marginBlockStart:
          '[calc(({sizes.slider.track} / 2) - ({sizes.slider.thumb} / 2))]',
        sliderThumb: true,
      },
      _mozRangeThumb: {
        appearance: 'none',
        border: '[none]',
        borderRadius: 'radius.000',
        sliderThumb: true,
      },
      _webkitSliderRunnableTrack: {
        background: 'colour.neutral.50',
        height: 'slider.track',
        borderRadius: '[{sizes.slider.track}]',
      },
      _mozRangeTrack: {
        background: 'colour.neutral.50',
        height: 'slider.track',
        borderRadius: '[{sizes.slider.track}]',
      },
    },
    tickMarkList: {
      display: 'flex',
      flexWrap: 'nowrap',
      paddingInline: '[calc({sizes.slider.thumb} / 2)]',
      lineHeight: 1,
      '& option': {
        minHeight: '[0]',
        padding: 'spacing.0',
      },
    },
    tickMark: {
      textStyle: 'typography.body.sm',
      flex: '[0 0 0]',
      marginInlineStart: 'var(--iress-tick-label-width)',
      width: '[0]',
      padding: 'spacing.0',
      _selected: {
        _before: {
          backgroundColor: 'colour.primary.fill',
        },
      },
    },
    tickMarkLabel: {
      display: 'inline-block',
      position: 'relative',
      transform: 'translate(-50%, 0)',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      _before: {
        height: 'slider.tick',
        width: 'slider.tick',
        backgroundColor: 'colour.neutral.10',
        borderRadius: 'radius.075',
        content: '""',
        position: 'absolute',
        top: '[calc(-1 * (({sizes.slider.thumb} - {sizes.slider.track}) / 2) - {sizes.slider.tick} - {spacing.slider.tick})]',
        left: '[50%]',
        transform: 'translate(-50%, 0)',
      },
    },
    thumbValue: {
      textStyle: 'typography.body.sm',
      display: 'inline-block',
      marginInlineStart: 'var(--iress-thumb-value-offset, 0)',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      minWidth: 'slider.thumb',
      transform: 'translate(-50%, 0)',
    },
  },
  variants: {},
  defaultVariants: {},
});
