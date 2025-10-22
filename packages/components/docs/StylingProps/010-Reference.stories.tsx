import { IressLink } from '@/components/Link';
import { type IressCSSProps } from '@/interfaces';
import { IressBadge, IressInline, IressTable } from '@/main';
import { DiffViewer } from '@docs/components/DiffViewer';
import { Meta, StoryObj } from '@storybook/react-vite';

interface StylingPropsReference {
  jsxProp: keyof IressCSSProps;
  jsxPropLink?: string;
  cssProperty: string;
  tokenMapping: string[] | string;
  tokenMappingLink?: string;
  responsive: boolean;
}

const stylingPropsReference: StylingPropsReference[] = [
  {
    jsxProp: 'bg',
    jsxPropLink: '/?path=/docs/styling-props-colour--docs#bg',
    cssProperty: 'background',
    tokenMapping: 'Colour',
    tokenMappingLink: '/?path=/docs/foundations-tokens-colour--docs',
    responsive: true,
  },
  {
    jsxProp: 'borderRadius',
    jsxPropLink: '/?path=/docs/styling-props-radius--docs#borderradius',
    cssProperty: 'border-radius',
    tokenMapping: 'Radius',
    tokenMappingLink: '/?path=/docs/foundations-tokens-radius--docs',
    responsive: true,
  },
  {
    jsxProp: 'color',
    jsxPropLink: '/?path=/docs/styling-props-colour--docs#color',
    cssProperty: 'color',
    tokenMapping: 'Colour',
    tokenMappingLink: '/?path=/docs/foundations-tokens-colour--docs',
    responsive: true,
  },
  {
    jsxProp: 'focusable',
    jsxPropLink: '/?path=/docs/styling-props-elevation--docs#focusable',
    cssProperty: 'border and box-shadow',
    tokenMapping: 'Elevation',
    tokenMappingLink: '/?path=/docs/foundations-tokens-elevation--docs',
    responsive: false,
  },
  {
    jsxProp: 'layerStyle',
    jsxPropLink: '/?path=/docs/styling-props-elevation--docs#layerstyle',
    cssProperty: 'border and box-shadow',
    tokenMapping: 'Elevation',
    tokenMappingLink: '/?path=/docs/foundations-tokens-elevation--docs',
    responsive: true,
  },
  {
    jsxProp: 'maxWidth',
    jsxPropLink: '/?path=/docs/styling-props-sizing--docs#container-widths',
    cssProperty: 'max-width',
    tokenMapping: 'N/A',
    responsive: true,
  },
  {
    jsxProp: 'm',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#margin',
    cssProperty: 'margin',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/foundations-tokens-spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'mx',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#margin',
    cssProperty: 'margin-inline',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/foundations-tokens-spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'my',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#margin',
    cssProperty: 'margin-block',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/foundations-tokens-spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'mb',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#margin',
    cssProperty: 'margin-bottom',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/foundations-tokens-spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'ml',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#margin',
    cssProperty: 'margin-left',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/foundations-tokens-spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'mr',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#margin',
    cssProperty: 'margin-right',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/foundations-tokens-spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'mt',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#margin',
    cssProperty: 'margin-top',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/foundations-tokens-spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'noGutter',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#nogutter',
    cssProperty: 'margin-block-end',
    tokenMapping: 'N/A',
    responsive: false,
  },
  {
    jsxProp: 'p',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#padding',
    cssProperty: 'padding',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/foundations-tokens-spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'px',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#padding',
    cssProperty: 'padding-inline',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/foundations-tokens-spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'py',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#padding',
    cssProperty: 'padding-block',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/foundations-tokens-spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'pb',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#padding',
    cssProperty: 'padding-bottom',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/foundations-tokens-spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'pl',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#padding',
    cssProperty: 'padding-left',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/foundations-tokens-spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'pr',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#padding',
    cssProperty: 'padding-right',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/foundations-tokens-spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'pt',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#padding',
    cssProperty: 'padding-top',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/foundations-tokens-spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'srOnly',
    jsxPropLink: '/?path=/docs/styling-props-screen-readers--docs#sronly',
    cssProperty: 'Multiple properties',
    tokenMapping: 'N/A',
    responsive: true,
  },
  {
    jsxProp: 'stretch',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#stretch',
    cssProperty: 'align-self: stretch and height: 100%',
    tokenMapping: 'N/A',
    responsive: false,
  },
  {
    jsxProp: 'textAlign',
    jsxPropLink: '/?path=/docs/styling-props-typography--docs#textalign',
    cssProperty: 'text-align',
    tokenMapping: 'N/A',
    responsive: true,
  },
  {
    jsxProp: 'textStyle',
    jsxPropLink: '/?path=/docs/styling-props-typography--docs#textStyle',
    cssProperty: 'font',
    tokenMapping: 'Typography',
    tokenMappingLink: '/?path=/docs/foundations-tokens-typography--docs',
    responsive: true,
  },
  {
    jsxProp: 'width',
    jsxPropLink: '/?path=/docs/styling-props-sizing--docs#inputwidths',
    cssProperty: 'width',
    tokenMapping: 'N/A',
    responsive: true,
  },
];

const StylingPropsReferenceTable = () => (
  <IressTable
    caption="Styling props reference"
    hiddenCaption
    columns={[
      {
        label: 'JSX prop',
        key: 'jsxProp',
        format: (jsxProp, row) => {
          if (!row?.jsxPropLink) return jsxProp;
          return (
            <IressLink
              href={row.jsxPropLink}
              textStyle="typography.body.md.strong"
            >
              {jsxProp}
            </IressLink>
          );
        },
      },
      {
        label: 'CSS property',
        key: 'cssProperty',
      },
      {
        label: 'Token mapping',
        key: 'tokenMapping',
        format: (
          tokenMapping: StylingPropsReference['tokenMapping'] = '',
          row,
        ) => {
          const tokens = Array.isArray(tokenMapping) ? (
            <IressInline gap="xs">
              {tokenMapping.map((token) => (
                <IressBadge mode="info">{token}</IressBadge>
              ))}
            </IressInline>
          ) : (
            tokenMapping
          );
          if (!row?.tokenMappingLink) return tokens;
          return <IressLink href={row.tokenMappingLink}>{tokens}</IressLink>;
        },
      },
      {
        label: 'Responsive',
        key: 'responsive',
        format: (responsive) => (responsive ? 'Yes' : 'No'),
        textAlign: 'right',
      },
    ]}
    rows={stylingPropsReference}
  />
);

export default {
  title: 'Styling props/Reference',
  component: StylingPropsReferenceTable,
  args: {
    gap: 'md',
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
} as Meta<typeof StylingPropsReferenceTable>;

type Story = StoryObj<typeof IressTable>;

export const Reference: Story = {};

export const MigratingFromUtilities = {
  render: () => (
    <DiffViewer
      oldValue={`<IressPanel className="iress-m--sm" />`}
      newValue={`<IressPanel m="sm" />`}
    />
  ),
};

export const MigratingFromInternalTokens = {
  render: () => (
    <DiffViewer
      oldValue={`<IressPanel style={{ '--iress-background-color': 'var(--iress-g-success-color)' }} />`}
      newValue={`<IressPanel bg="colour.system.success.fill" />`}
    />
  ),
};
