import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Markdown } from '@storybook/addon-docs/blocks';
import {
  type ColorToken,
  IressBadge,
  IressCol,
  IressInline,
  IressPanel,
  type IressPanelProps,
  IressRow,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';
import colour from './colour';
import Color from 'colorjs.io';
import { type IressDesignToken } from '../interfaces';
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TokenTag } from '../../docs/components/TokenTag';
import cssVars from '~/generated/css-vars';
import { get } from 'radash';

type Story = StoryObj<typeof IressStack>;

interface AllowedForegroundProps {
  backgroundColor: Color;
  foreground: ColorToken;
}

interface ColourSwatchProps extends IressPanelProps {
  bg: ColorToken;
  title: string;
  token: IressDesignToken;
}

const ContrastRating = ({ ratio }: { ratio: number }) => {
  if (ratio < 3) {
    return <IressBadge mode="danger">Fail</IressBadge>;
  }

  if (ratio < 4.5) {
    return <IressBadge mode="warning">AA Large</IressBadge>;
  }

  if (ratio < 7) {
    return <IressBadge mode="success">AA</IressBadge>;
  }

  return <IressBadge mode="success">AAA</IressBadge>;
};

const AllowedForeground = ({
  backgroundColor,
  foreground,
}: AllowedForegroundProps) => {
  const container = useRef<HTMLSpanElement | null>(null);
  const [contrastRatio, setContrastRatio] = useState<string | undefined>();

  const computeContrast = useCallback(() => {
    if (!container.current) return;

    const computedStyle = getComputedStyle(container.current);
    const computedForegroundColor = new Color(computedStyle.color || 'white');
    setContrastRatio(
      backgroundColor.contrastWCAG21(computedForegroundColor).toFixed(1),
    );
    container.current.textContent = `${foreground} (${computedForegroundColor.toString({ format: 'hex' }).toUpperCase()})`;
  }, [backgroundColor, foreground]);

  useEffect(computeContrast, [computeContrast]);

  return (
    <IressInline horizontalAlign="between">
      <IressText style={{ color: get(cssVars, foreground as string) }}>
        <span
          ref={(element) => {
            container.current = element;
            computeContrast();
          }}
        >
          {foreground}
        </span>
      </IressText>
      {contrastRatio && (
        <IressText style={{ color: get(cssVars, foreground as string) }}>
          {contrastRatio} <ContrastRating ratio={Number(contrastRatio)} />
        </IressText>
      )}
    </IressInline>
  );
};

const ColourSwatch = ({
  bg,
  color: colorProp,
  title,
  token,
  ...panelProps
}: ColourSwatchProps) => {
  const [container, setContainer] = useState<Element | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<Color | undefined>();
  const allowedForegrounds = (token.$extensions?.['iress.contrast.AA'] ??
    []) as ColorToken[];
  const color: IressPanelProps['color'] =
    colorProp ?? allowedForegrounds[0] ?? 'color.neutral.80';

  useEffect(() => {
    if (!container) return;
    const computedStyle = getComputedStyle(container);
    setBackgroundColor(new Color(computedStyle.backgroundColor));
  }, [container, bg]);

  const colourStyle: CSSProperties = {
    color: get(cssVars, color as string),
  };

  return (
    <div
      ref={(element) => {
        if (!element) return;
        setContainer(element.firstElementChild);
      }}
    >
      <IressPanel
        {...panelProps}
        bg={bg}
        color={color}
        style={{
          ...colourStyle,
          background: get(cssVars, bg),
        }}
        layerStyle="elevation.raised"
      >
        <IressRow gutter="spacing.7">
          <IressCol span={6}>
            <IressText noGutter color={color} style={colourStyle}>
              <IressText
                color={color}
                style={colourStyle}
                element="h3"
                mb="none"
              >
                {title}
              </IressText>
              <IressText
                color={color}
                style={colourStyle}
                element="p"
                mb="spacing.1"
              >
                <TokenTag>{bg}</TokenTag>{' '}
                {backgroundColor?.toString({ format: 'hex' }).toUpperCase()}
              </IressText>
              <p>{token.$description}</p>
            </IressText>
          </IressCol>
          {!!allowedForegrounds.length && backgroundColor && (
            <IressCol>
              <IressText
                color={color}
                style={{ color: get(cssVars, color as string) }}
              >
                <h4>Allowed foregrounds</h4>
                <IressStack gap="spacing.1" noGutter>
                  <ul>
                    {allowedForegrounds.map((allowedForeground: ColorToken) => (
                      <li key={allowedForeground}>
                        <AllowedForeground
                          backgroundColor={backgroundColor}
                          foreground={allowedForeground}
                        />
                      </li>
                    ))}
                  </ul>
                </IressStack>
              </IressText>
            </IressCol>
          )}
        </IressRow>
      </IressPanel>
    </div>
  );
};

export default {
  title: 'Colour',
  component: IressStack,
  args: {
    gap: 'md',
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
} as Meta<typeof IressStack>;

export const Primary: Story = {
  args: {
    children: [
      <Markdown>{colour.primary.$description}</Markdown>,
      <ColourSwatch
        title="Fill"
        bg="colour.primary.fill"
        token={colour.primary.fill}
      />,
      <ColourSwatch
        title="On Fill"
        bg="colour.primary.onFill"
        token={colour.primary.onFill}
      />,
      <ColourSwatch
        title="Fill Hover"
        bg="colour.primary.fillHover"
        token={colour.primary.fillHover}
      />,
      <ColourSwatch
        title="Surface"
        bg="colour.primary.surface"
        token={colour.primary.surface}
      />,
      <ColourSwatch
        title="Text"
        bg="colour.primary.text"
        token={colour.primary.text}
      />,
      <ColourSwatch
        title="Surface Hover"
        bg="colour.primary.surfaceHover"
        token={colour.primary.surfaceHover}
      />,
    ],
  },
};

export const Neutral: Story = {
  args: {
    children: [
      <Markdown>{colour.neutral.$description}</Markdown>,
      <ColourSwatch
        title="10"
        bg="colour.neutral.10"
        token={colour.neutral[10]}
      />,

      <ColourSwatch
        title="20"
        bg="colour.neutral.20"
        token={colour.neutral[20]}
      />,

      <ColourSwatch
        title="30"
        bg="colour.neutral.30"
        token={colour.neutral[30]}
      />,

      <ColourSwatch
        title="40"
        bg="colour.neutral.40"
        token={colour.neutral[40]}
      />,

      <ColourSwatch
        title="50"
        bg="colour.neutral.50"
        token={colour.neutral[50]}
      />,

      <ColourSwatch
        title="60"
        bg="colour.neutral.60"
        token={colour.neutral[60]}
      />,

      <ColourSwatch
        title="70"
        bg="colour.neutral.70"
        token={colour.neutral[70]}
      />,

      <ColourSwatch
        title="80"
        bg="colour.neutral.80"
        token={colour.neutral[80]}
      />,
    ],
  },
};

export const Accent: Story = {
  args: {
    children: [
      <Markdown>{colour.accent.$description}</Markdown>,
      <IressStack gap="md">
        <ColourSwatch
          title="Brand"
          bg="colour.accent.brand"
          token={colour.accent.brand}
        />
      </IressStack>,
    ],
  },
};

export const Success: Story = {
  args: {
    children: [
      <Markdown>{colour.system.success.$description}</Markdown>,
      <ColourSwatch
        title="Fill"
        bg="colour.system.success.fill"
        token={colour.system.success.fill}
      />,

      <ColourSwatch
        title="On Fill"
        bg="colour.system.success.onFill"
        token={colour.system.success.onFill}
      />,

      <ColourSwatch
        title="Fill Hover"
        bg="colour.system.success.fillHover"
        token={colour.system.success.fillHover}
      />,

      <ColourSwatch
        title="Surface"
        bg="colour.system.success.surface"
        token={colour.system.success.surface}
      />,

      <ColourSwatch
        title="Text"
        bg="colour.system.success.text"
        token={colour.system.success.text}
      />,

      <ColourSwatch
        title="Surface Hover"
        bg="colour.system.success.surfaceHover"
        token={colour.system.success.surfaceHover}
      />,
    ],
  },
};

export const Danger: Story = {
  args: {
    children: [
      <Markdown>{colour.system.danger.$description}</Markdown>,
      <ColourSwatch
        title="Fill"
        bg="colour.system.danger.fill"
        token={colour.system.danger.fill}
      />,

      <ColourSwatch
        title="On Fill"
        bg="colour.system.danger.onFill"
        token={colour.system.danger.onFill}
      />,

      <ColourSwatch
        title="Fill Hover"
        bg="colour.system.danger.fillHover"
        token={colour.system.danger.fillHover}
      />,

      <ColourSwatch
        title="Surface"
        bg="colour.system.danger.surface"
        token={colour.system.danger.surface}
      />,

      <ColourSwatch
        title="Text"
        bg="colour.system.danger.text"
        token={colour.system.danger.text}
      />,

      <ColourSwatch
        title="Surface Hover"
        bg="colour.system.danger.surfaceHover"
        token={colour.system.danger.surfaceHover}
      />,
    ],
  },
};

export const Warning: Story = {
  args: {
    children: [
      <Markdown>{colour.system.warning.$description}</Markdown>,
      <IressStack gap="md">
        <ColourSwatch
          title="Fill"
          bg="colour.system.warning.fill"
          token={colour.system.warning.fill}
        />

        <ColourSwatch
          title="On Fill"
          bg="colour.system.warning.onFill"
          token={colour.system.warning.onFill}
        />

        <ColourSwatch
          title="Surface"
          bg="colour.system.warning.surface"
          token={colour.system.warning.surface}
        />

        <ColourSwatch
          title="Text"
          bg="colour.system.warning.text"
          token={colour.system.warning.text}
        />
      </IressStack>,
    ],
  },
};

export const Info: Story = {
  args: {
    children: [
      <Markdown>{colour.system.info.$description}</Markdown>,
      <IressStack gap="md">
        <ColourSwatch
          title="Fill"
          bg="colour.system.info.fill"
          token={colour.system.info.fill}
        />

        <ColourSwatch
          title="On Fill"
          bg="colour.system.info.onFill"
          token={colour.system.info.onFill}
        />

        <ColourSwatch
          title="Surface"
          bg="colour.system.info.surface"
          token={colour.system.info.surface}
        />

        <ColourSwatch
          title="Text"
          bg="colour.system.info.text"
          token={colour.system.info.text}
        />
      </IressStack>,
    ],
  },
};

export const Backdrop: Story = {
  args: {
    children: [
      <Markdown>{colour.system.backdrop.$description}</Markdown>,
      <IressStack gap="md">
        <ColourSwatch
          title="Fill"
          bg="colour.system.backdrop.fill"
          token={colour.system.backdrop.fill}
        />
      </IressStack>,
    ],
  },
};
