import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  IressInline,
  iressStyled,
  IressTable,
  type IressTableProps,
  IressText,
} from '@iress-oss/ids-components';
import spacing from './spacing';
import { type ReactNode, useState } from 'react';
import { TokenTag } from '../../docs/components/TokenTag';
import { type IressDesignToken } from '../interfaces';
import { get } from 'radash';
import cssVars from '~/generated/css-vars';

const StyledDiv = iressStyled('div');

const VisualSpark = ({ cssVar }: { cssVar: string }) => {
  const [size, setSize] = useState<number | null>(null);

  return (
    <IressInline gap="xs">
      <StyledDiv
        bg="colour.primary.fill"
        style={{ height: '20px', width: cssVar }}
        ref={(el) => {
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.width !== size) {
              setSize(rect.width);
            }
          }
        }}
      />
      {size !== null && <IressText element="span">{size}px</IressText>}
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
  title: 'Spacing',
  component: IressTable,
} as Meta<typeof IressTable>;

export const Spacing: Story = {
  args: {
    caption: 'Spacing tokens',
    columns: [
      {
        key: 'name',
        label: 'Token Name',
        format: (value: string) => <TokenTag>{value}</TokenTag>,
        width: '120px',
        sort: true,
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
    rows: Object.entries(spacing)
      .filter(([key]) => !key.startsWith('$'))
      .map(([key, value]) => {
        const token = value as IressDesignToken;
        const cssVar = get<string>(cssVars, `spacing.${key}`);

        return {
          name: `spacing.${key}`,
          description: token.$description,
          value: token.$value,
          visual: <VisualSpark cssVar={cssVar} />,
          alias: token.$extensions?.['iress.aliases'],
        };
      }),
  },
};
