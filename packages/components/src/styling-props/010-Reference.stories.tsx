import { IressLink } from '@/components/Link';
import { IressPill, IressIcon, IressInline, IressTable } from '@/main';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { stylingPropsReference } from './stylingPropsReference';

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
          tokenMapping: (typeof stylingPropsReference)[number]['tokenMapping'] = '',
          row,
        ) => {
          const tokens = Array.isArray(tokenMapping) ? (
            <IressInline gap="xs">
              {tokenMapping.map((token) => (
                <IressPill>{token}</IressPill>
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
        format: (responsive) =>
          responsive ? (
            <IressIcon name="check" color="colour.system.success.text" />
          ) : null,
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
    idsConfig: {
      autodocsTemplate: 'default',
    },
  },
} as Meta<typeof StylingPropsReferenceTable>;

type Story = StoryObj<typeof IressTable>;

export const Reference: Story = {};
