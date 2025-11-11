import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  IressBadge,
  IressButton,
  IressCol,
  IressDivider,
  IressInput,
  IressPanel,
  IressRow,
  IressStack,
  iressStyled,
  IressTable,
  type IressTableProps,
  IressText,
  IressInline,
} from '@iress-oss/ids-components';
import radius from './radius';
import { TokenTag } from '../../docs/components/TokenTag';
import { type IressDesignToken } from '../interfaces';
import { type ReactNode, useState } from 'react';

const StyledDiv = iressStyled('div');

const VisualSpark = ({ value }: { value: string }) => {
  const [size, setSize] = useState<string | null>(null);

  return (
    <IressInline gap="xs">
      <StyledDiv
        bg="colour.primary.fill"
        style={{ width: '20px', height: '20px', borderTopRightRadius: value }}
        ref={(el) => {
          if (el) {
            const borderTopRightRadius =
              window.getComputedStyle(el)?.borderTopRightRadius;
            if (borderTopRightRadius !== size) {
              setSize(borderTopRightRadius);
            }
          }
        }}
      />
      {size !== null && <IressText element="span">{size}</IressText>}
    </IressInline>
  );
};

interface TokenRow {
  name: string;
  description: string;
  visual: ReactNode;
  alias?: string[];
}

type Story = StoryObj<IressTableProps<TokenRow>>;

export default {
  title: 'Radius',
  component: IressTable,
} as Meta<typeof IressTable>;

export const Radius: Story = {
  args: {
    caption: 'Radius tokens',
    columns: [
      {
        key: 'name',
        label: 'Token Name',
        format: (value: string) => <TokenTag>{value}</TokenTag>,
        width: '120px',
        sort: 'asc',
      },
      {
        key: 'alias',
        label: 'Alias',
        format: (value?: string[]) =>
          value ? <TokenTag>{value}</TokenTag> : '',
        width: '100px',
      },
      { key: 'description', label: 'Description' },
      { key: 'visual', label: 'Visual', width: '20%' },
    ],
    rows: Object.entries(radius)
      .filter(([key]) => !key.startsWith('$') && key !== 'system')
      .map(([key, value]) => {
        const token = value as IressDesignToken;
        return {
          name: `radius.${key}`,
          description: token.$description,
          value: token.$value,
          visual: <VisualSpark value={token.$value} />,
          alias: token.$extensions?.['iress.aliases'],
        };
      }),
  },
};

export const System: Story = {
  render: () => (
    <IressStack gap="xl">
      <IressText>{radius.system.$description}</IressText>
      <IressRow gutter="md" verticalAlign="bottom">
        <IressCol span={{ md: 8 }}>
          <IressBadge
            bg="colour.primary.surface"
            width="input.6"
            aria-hidden="true"
            mb="sm"
          />
          <IressText>
            <h3>Badge</h3>
            <p>{radius.system.badge.$description}</p>
            <p>
              <TokenTag>radius.system.badge</TokenTag>
            </p>
          </IressText>
        </IressCol>
      </IressRow>
      <IressDivider />
      <IressRow gutter="md" verticalAlign="bottom">
        <IressCol span={{ md: 8 }}>
          <IressButton width="input.8" aria-hidden="true" mb="sm" />
          <IressText>
            <h3>Button</h3>
            <p>{radius.system.button.$description}</p>
            <p>
              <TokenTag>radius.system.button</TokenTag>
            </p>
          </IressText>
        </IressCol>
      </IressRow>
      <IressDivider />
      <IressRow gutter="md" verticalAlign="bottom">
        <IressCol span={{ md: 8 }}>
          <IressInput width="12" aria-hidden="true" mb="sm" />
          <IressText>
            <h3>Form</h3>
            <p>{radius.system.form.$description}</p>
            <p>
              <TokenTag>radius.system.form</TokenTag>
            </p>
          </IressText>
        </IressCol>
      </IressRow>
      <IressDivider />
      <IressRow gutter="md" verticalAlign="bottom">
        <IressCol span={{ md: 8 }}>
          <IressPanel
            width="input.16"
            style={{ height: '100px' }}
            mb="sm"
            aria-hidden="true"
            bg="colour.primary.surface"
          />
          <IressText>
            <h3>Layout</h3>
            <p>{radius.system.layout.$description}</p>
            <p>
              <TokenTag>radius.system.layout</TokenTag>
            </p>
          </IressText>
        </IressCol>
      </IressRow>
    </IressStack>
  ),
};
