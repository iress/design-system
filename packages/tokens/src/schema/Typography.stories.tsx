import { type Meta, type StoryObj } from '@storybook/react-vite';
import typography from './typography';
import {
  IressCol,
  IressInline,
  IressRow,
  IressStack,
  IressText,
  IressTooltip,
  type IressTextProps,
} from '@iress-oss/ids-components';
import { TokenTag } from '../../docs/components/TokenTag';
import { type CSSProperties, useState } from 'react';
import { get } from 'radash';
import cssVars from '~/generated/css-vars';
import { Markdown } from '@storybook/addon-docs/blocks';

type Story = StoryObj<IressTextProps>;

const headings = [
  {
    name: 'Heading 1',
    tokenName: 'typography.heading.1',
    token: typography.heading[1],
  },
  {
    name: 'Heading 2',
    tokenName: 'typography.heading.2',
    token: typography.heading[2],
  },
  {
    name: 'Heading 3',
    tokenName: 'typography.heading.3',
    token: typography.heading[3],
  },
  {
    name: 'Heading 4',
    tokenName: 'typography.heading.4',
    token: typography.heading[4],
  },
  {
    name: 'Heading 5',
    tokenName: 'typography.heading.5',
    token: typography.heading[5],
  },
];

const body = [
  {
    name: 'Small',
    tokenName: 'typography.body.sm',
    token: typography.body.sm,
  },
  {
    name: 'Medium',
    tokenName: 'typography.body.md',
    token: typography.body.md,
  },
  {
    name: 'Large',
    tokenName: 'typography.body.lg',
    token: typography.body.lg,
  },
];

const bodyVariants = ['Regular', 'Strong', 'Emphasis'];

export default {
  title: 'Typography',
  component: IressText,
} as Meta<typeof IressText>;

interface CssSparkProps {
  additionalStyles?: CSSProperties;
  cssVar: string;
  property: keyof CSSStyleDeclaration;
  trimmed?: boolean;
}

const CssSpark = ({
  additionalStyles,
  cssVar,
  property,
  trimmed,
}: CssSparkProps) => {
  const [prop, setProp] = useState<string | null>(null);

  return (
    <>
      {trimmed && (
        <IressTooltip tooltipText={prop ?? ''} align="bottom">
          <button>{prop?.split(',')[0]}</button>
        </IressTooltip>
      )}
      {!trimmed && prop}
      <div
        ref={(el) => {
          if (el) {
            const styles = window.getComputedStyle(el);
            if (styles[property] && styles[property] != prop) {
              // eslint-disable-next-line @typescript-eslint/no-base-to-string
              setProp(String(styles[property]));
            }
          }
        }}
        style={{ ...additionalStyles, [property]: cssVar }}
      />
    </>
  );
};

export const Base: Story = {
  args: {
    children: (
      <IressRow gutter="md">
        <IressCol>
          <IressText
            style={{ fontSize: cssVars.typography.heading._1.fontSize }}
          >
            <CssSpark
              property="fontSize"
              cssVar={get(cssVars, 'typography.base.size')}
            />
          </IressText>
          <IressText element="strong">Base font size</IressText>
          <IressText element="p" my="sm">
            {typography.base.size.$description}
          </IressText>
          <TokenTag>typography.base.size</TokenTag>
        </IressCol>
        <IressCol>
          <IressStack>
            <IressText
              textStyle="typography.heading.1"
              style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                lineHeight: cssVars.typography.body.md._regular.lineHeight,
              }}
            >
              <CssSpark
                cssVar={get(cssVars, 'typography.base.headingFont')}
                property="fontFamily"
                trimmed
              />
            </IressText>

            <IressText element="strong">Heading font family</IressText>
          </IressStack>
          <IressText element="p" my="sm">
            {typography.base.headingFont.$description}
          </IressText>
          <TokenTag>typography.base.headingFont</TokenTag>
        </IressCol>
        <IressCol>
          <IressStack>
            <IressText
              style={{ fontSize: cssVars.typography.heading._1.fontSize }}
            >
              <CssSpark
                cssVar={get(cssVars, 'typography.base.bodyFont')}
                property="fontFamily"
                trimmed
              />
            </IressText>
            <IressText element="strong">Body font family</IressText>
          </IressStack>
          <IressText element="p" my="sm">
            {typography.base.bodyFont.$description}
          </IressText>
          <TokenTag>typography.base.bodyFont</TokenTag>
        </IressCol>
      </IressRow>
    ),
  },
};

export const Headings: Story = {
  args: {
    children: (
      <IressStack gap="xl">
        {headings.map(({ name, token, tokenName }) => {
          const headingCssVars = get<Record<string, string>>(
            cssVars,
            tokenName.replace(/\.(?=[^.]*$)/, '._'),
          );

          return (
            <IressRow gutter="xl" key={tokenName}>
              <IressCol span={{ lg: 8 }}>
                <IressText textStyle={tokenName as never} mb="sm">
                  {name}
                </IressText>
                <IressText element="strong">{name}</IressText>
                <Markdown>{token.$description}</Markdown>
              </IressCol>
              <IressCol pt="sm">
                <IressStack gap="sm">
                  <IressInline gap="sm">
                    <strong>Font</strong>
                    <CssSpark
                      cssVar={headingCssVars.fontFamily}
                      property="fontFamily"
                      trimmed
                    />
                  </IressInline>
                  <IressInline gap="sm">
                    <strong>Weight</strong>
                    <CssSpark
                      cssVar={headingCssVars.fontWeight}
                      property="fontWeight"
                    />
                  </IressInline>
                  <IressInline gap="sm">
                    <strong>Size</strong>
                    <CssSpark
                      cssVar={headingCssVars.fontSize}
                      property="fontSize"
                    />
                  </IressInline>
                  <IressInline gap="sm">
                    <strong>Line height</strong>
                    <CssSpark
                      additionalStyles={{
                        fontSize: headingCssVars.fontSize,
                      }}
                      cssVar={headingCssVars.lineHeight}
                      property="lineHeight"
                    />
                  </IressInline>
                  <TokenTag>{tokenName}</TokenTag>
                </IressStack>
              </IressCol>
            </IressRow>
          );
        })}
      </IressStack>
    ),
  },
};

export const Body: Story = {
  args: {
    children: (
      <IressStack gap="xl">
        {body.map(({ name, token, tokenName }) => (
          <IressRow gutter="xl" key={tokenName}>
            <IressCol span={{ lg: 4 }}>
              <IressText textStyle={tokenName as never} mb="sm">
                The <strong>quick</strong> brown fox jumps over the{' '}
                <em>lazy</em> dog.
              </IressText>
              <IressText element="strong">{name}</IressText>
              <Markdown>{token.$description}</Markdown>
            </IressCol>
            {bodyVariants.map((variant) => {
              const variantName =
                variant === 'Emphasis' ? 'em' : variant.toLowerCase();
              const variantCssVars = get<Record<string, string>>(
                cssVars,
                `${tokenName}._${variantName}`,
              );

              return (
                <IressCol pt="sm" key={variant}>
                  <IressStack gap="sm">
                    <IressInline gap="sm">
                      <strong>Font</strong>
                      <CssSpark
                        cssVar={variantCssVars.fontFamily}
                        property="fontFamily"
                        trimmed
                      />
                    </IressInline>
                    <IressInline gap="sm">
                      <strong>Weight</strong>
                      <CssSpark
                        cssVar={variantCssVars.fontWeight}
                        property="fontWeight"
                      />
                    </IressInline>
                    <IressInline gap="sm">
                      <strong>Size</strong>
                      <CssSpark
                        cssVar={variantCssVars.fontSize}
                        property="fontSize"
                      />
                    </IressInline>
                    <IressInline gap="sm">
                      <strong>Line height</strong>
                      <CssSpark
                        additionalStyles={{
                          fontSize: variantCssVars.fontSize,
                        }}
                        cssVar={variantCssVars.lineHeight}
                        property="lineHeight"
                      />
                    </IressInline>
                    <TokenTag>{`${tokenName}.${variantName}`}</TokenTag>
                  </IressStack>
                </IressCol>
              );
            })}
          </IressRow>
        ))}
      </IressStack>
    ),
  },
};

export const Code: Story = {
  args: {
    children: (
      <IressRow gutter="xl">
        <IressCol span={{ lg: 4 }}>
          <IressText textStyle="typography.code" mb="sm">
            Code goes here
          </IressText>
          <IressText element="strong">Code</IressText>
          <Markdown>{typography.code.$description}</Markdown>
        </IressCol>
        <IressCol pt="sm">
          <IressStack gap="sm">
            <IressInline gap="sm">
              <strong>Font</strong>
              <CssSpark
                cssVar={cssVars.typography._code.fontFamily}
                property="fontFamily"
                trimmed
              />
            </IressInline>
            <IressInline gap="sm">
              <strong>Weight</strong>
              <CssSpark
                cssVar={cssVars.typography._code.fontWeight}
                property="fontWeight"
              />
            </IressInline>
            <IressInline gap="sm">
              <strong>Size</strong>
              <CssSpark
                cssVar={cssVars.typography._code.fontSize}
                property="fontSize"
              />
            </IressInline>
            <IressInline gap="sm">
              <strong>Line height</strong>
              <CssSpark
                additionalStyles={{
                  fontSize: cssVars.typography._code.fontSize,
                }}
                cssVar={cssVars.typography._code.lineHeight}
                property="lineHeight"
              />
            </IressInline>
            <TokenTag>typography.code</TokenTag>
          </IressStack>
        </IressCol>
      </IressRow>
    ),
  },
};
